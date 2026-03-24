import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    brand: "",
    category: "",
    stockQuantity: "",
    price: "",
    manufactureDate: ""
  });

  // 🔄 Load Products
  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📝 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/product/save", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      fetchProducts();
      alert("Product Added ✅");

      setForm({
        productName: "",
        productDescription: "",
        brand: "",
        category: "",
        stockQuantity: "",
        price: "",
        manufactureDate: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // ❌ Delete Product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchProducts();
  };

  return (
    <div className="min-h-screen p-6 
      bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Product Management
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 grid grid-cols-2 gap-4">

        <input name="productName" value={form.productName} onChange={handleChange}
          placeholder="Product Name" className="input" required />

        <input name="brand" value={form.brand} onChange={handleChange}
          placeholder="Brand" className="input" required />

        <input name="category" value={form.category} onChange={handleChange}
          placeholder="Category" className="input" required />

        <input name="stockQuantity" value={form.stockQuantity} onChange={handleChange}
          type="number" placeholder="Stock" className="input" required />

        <input name="price" value={form.price} onChange={handleChange}
          type="number" placeholder="Price" className="input" required />

        <input name="manufactureDate" value={form.manufactureDate}
          onChange={handleChange} type="date" className="input" required />

        <input name="productDescription" value={form.productDescription}
          onChange={handleChange}
          placeholder="Description"
          className="input col-span-2" />

        <button className="col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Add Product
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg p-5">

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Product List
        </h2>

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-green-100 text-green-800">
              <th>Name</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Price</th>
              <th>QR</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.productId} className="text-center border-b">

                <td>{p.productName}</td>
                <td>{p.brand}</td>

                <td className={p.stockQuantity < 5 ? "text-red-500" : "text-green-600"}>
                  {p.stockQuantity}
                </td>

                <td>₹{p.price}</td>

                <td>
                  {p.qrCode && (
                    <img
                      src={`http://localhost:8080/${p.qrCode}`}
                      alt="QR"
                      className="w-12 h-12 mx-auto"
                    />
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(p.productId)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProductPage;