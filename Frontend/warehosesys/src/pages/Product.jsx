import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const ProductPage = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    brand: "",
    category: "",
    stockQuantity: "",
    price: "",
    manufactureDate: ""
  });

  // 🔄 Fetch Products
  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/ListAllProduct", {
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

  // 🔍 Filter
  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  // 📝 Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      setShowModal(false);

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
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      // 🔥 INSTANT UI UPDATE (IMPORTANT)
      setProducts(prev => prev.filter(p => p.productId !== id));
  
      // 🔄 OPTIONAL: sync with backend
      // fetchProducts();
  
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Products</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold text-green-700">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Low Stock</p>
          <h2 className="text-2xl text-red-500">
            {products.filter(p => p.stockQuantity < 5).length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Value</p>
          <h2 className="text-2xl text-green-700">
            ₹{products.reduce((sum, p) => sum + p.price, 0)}
          </h2>
        </div>

      </div>

      {/* SEARCH + BUTTON */}
      <div className="flex justify-between items-center">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={18} /> Add Product
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Products
        </h2>

        <div className="max-h-[400px] overflow-y-auto">

          <table className="w-full table-fixed text-sm">

            <thead>
              <tr className="bg-green-100 border-b-2">
                <th className="p-3 w-[20%] text-left">Name</th>
                <th className="w-[15%]">Brand</th>
                <th className="w-[15%]">Category</th>
                <th className="w-[10%]">Price</th>
                <th className="w-[10%]">Stock</th>
                <th className="w-[15%]">Date</th>
                <th className="w-[15%]">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.productId} className="border-b hover:bg-green-50">

                  <td className="p-3">{p.productName}</td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>

                  <td className="text-green-700 font-semibold">
                    ₹{p.price}
                  </td>

                  <td>{p.stockQuantity}</td>
                  <td>{p.manufactureDate}</td>

                  <td className="flex gap-3 justify-center">
                    <button>✏️</button>
                    <button
                      onClick={() => handleDelete(p.productId)}
                      className="text-red-500"
                    >
                      🗑️
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Add Product</h2>
              <button onClick={() => setShowModal(false)}>❌</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">

              <input name="productName" placeholder="Name" onChange={handleChange} className="input" />
              <input name="brand" placeholder="Brand" onChange={handleChange} className="input" />
              <input name="category" placeholder="Category" onChange={handleChange} className="input" />
              <input name="price" type="number" placeholder="Price" onChange={handleChange} className="input" />
              <input name="stockQuantity" type="number" placeholder="Stock" onChange={handleChange} className="input" />
              <input name="manufactureDate" type="date" onChange={handleChange} className="input" />

              <input
                name="productDescription"
                placeholder="Description"
                onChange={handleChange}
                className="input col-span-2"
              />

              <div className="col-span-2 flex justify-end gap-2 mt-3">
                <button type="button" onClick={() => setShowModal(false)} className="border px-3 py-2 rounded">
                  Cancel
                </button>

                <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded">
                  Save
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductPage;