import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryPage = () => {

  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [bins, setBins] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    storageBinId: "",
    quantity: ""
  });

  const API = "http://localhost:8080/api";

  // 🔄 Load data
  useEffect(() => {
    fetchInventory();
    fetchProducts();
    fetchBins();
  }, []);

  // 📦 Inventory
  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API}/inventory`);
      setInventory(res.data);
    } catch (err) {
      console.error("Inventory error:", err);
    }
  };

  // 📦 Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product/ListAllProduct`);
      setProducts(res.data);
    } catch (err) {
      console.error("Product error:", err);
    }
  };

  // 📦 Bins
  const fetchBins = async () => {
    try {
      const res = await axios.get(`${API}/storage-bin`);
      setBins(res.data);
    } catch (err) {
      console.error("Bin error:", err);
    }
  };

  // ➕ Add Inventory
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId || !form.storageBinId || !form.quantity) {
      alert("All fields required!");
      return;
    }

    try {
      await axios.post(
        `${API}/inventory/add-stock/${form.productId}`,
        {
          storageBinId: form.storageBinId,
          quantity: form.quantity
        }
      );

      setForm({ productId: "", storageBinId: "", quantity: "" });
      fetchInventory();

    } catch (err) {
      console.error("Add inventory error:", err);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        📦 Inventory Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-green-100 grid grid-cols-3 gap-4"
      >

        {/* Product */}
        <select
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.productId} value={p.productId}>
              {p.productName}
            </option>
          ))}
        </select>

        {/* Bin */}
        <select
          value={form.storageBinId}
          onChange={(e) => setForm({ ...form, storageBinId: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Bin</option>
          {bins.map((b) => (
            <option key={b.storageBinId} value={b.storageBinId}>
              {b.locationCode}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 rounded"
        />

        {/* Button */}
        <button className="col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Add Inventory
        </button>

      </form>

      {/* TABLE */}
      <div className="mt-6 bg-white rounded-xl shadow border border-green-100 overflow-x-auto">
        <table className="w-full">

          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length > 0 ? (
              inventory.map((i, index) => {

                // 🔥 find product name
                const product = products.find(p => p.productId === i.productId);

                // 🔥 find bin location
                const bin = bins.find(b => b.storageBinId === i.storageBinId);

                return (
                  <tr
                    key={i.id || index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-green-50"
                    }`}
                  >
                    <td className="p-3">
                      {product ? product.productName : i.productId}
                    </td>

                    <td className="p-3 text-green-700 font-semibold">
                      {bin ? bin.locationCode : i.storageBinId}
                    </td>

                    <td className="p-3">{i.quantity}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No inventory found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default InventoryPage;