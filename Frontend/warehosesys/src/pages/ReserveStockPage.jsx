import React, { useEffect, useState } from "react";
import axios from "axios";

const ReserveStockPage = () => {

  const [reserveList, setReserveList] = useState([]);
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    inventoryId: "",
    reserveQuantity: ""
  });

  // 🔄 Load Data
  useEffect(() => {
    fetchReserveStock();
    fetchProducts();
    fetchInventory();
  }, []);

  const fetchReserveStock = () => {
    axios.get("http://localhost:8080/api/reserve-stock")
      .then(res => setReserveList(res.data))
      .catch(err => console.log(err));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all")
      .then(res => setProducts(res.data));
  };

  const fetchInventory = () => {
    axios.get("http://localhost:8080/api/inventory")
      .then(res => setInventory(res.data));
  };

  // 📝 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ Add Reserve Stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/reserve-stock", form);

      alert("Reserved Successfully ✅");
      fetchReserveStock();

      setForm({
        productId: "",
        inventoryId: "",
        reserveQuantity: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error reserving stock");
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/reserve-stock/${id}`);
    fetchReserveStock();
  };

  return (
    <div className="min-h-screen p-6 
      bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Reserve Stock
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 grid grid-cols-3 gap-4">

        {/* Product */}
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.productId} value={p.productId}>
              {p.productName}
            </option>
          ))}
        </select>

        {/* Inventory */}
        <select
          name="inventoryId"
          value={form.inventoryId}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Inventory</option>
          {inventory.map(i => (
            <option key={i.id} value={i.id}>
              {i.product?.productName} - {i.storageBin?.locationcode}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          name="reserveQuantity"
          value={form.reserveQuantity}
          onChange={handleChange}
          placeholder="Reserve Quantity"
          className="input"
          required
        />

        <button className="col-span-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Reserve Stock
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg p-5">

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Reserved Stock List
        </h2>

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-green-100 text-green-800">
              <th>Product</th>
              <th>Bin</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reserveList.map(r => (
              <tr key={r.id} className="text-center border-b">

                <td>{r.product?.productName}</td>

                <td>{r.inventory?.storageBin?.locationcode}</td>

                <td className="text-yellow-600 font-semibold">
                  {r.reserveQuantity}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(r.id)}
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

export default ReserveStockPage;