import React, { useEffect, useState } from "react";
import api from "../services/Api";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [bins, setBins] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    storageBinId: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Load all data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
  
      const invRes = await api.get("/inventory").catch(() => null);
      const prodRes = await api.get("/product/ListAllProduct").catch(() => null);
      const binRes = await api.get("/storage-bin").catch(() => null);
  
      console.log("Inventory:", invRes);
      console.log("Products:", prodRes);
      console.log("Bins:", binRes);
  
      setInventory(invRes?.data || []);
      setProducts(prodRes?.data || []);
      setBins(binRes?.data || []);
  
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load data");
    } finally {
      setLoading(false);
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
      await api.post(`/inventory/add-stock/${form.productId}`, {
        storageBinId: form.storageBinId,
        quantity: form.quantity,
      });

      alert("✅ Inventory Added");

      setForm({
        productId: "",
        storageBinId: "",
        quantity: "",
      });

      loadData();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add inventory");
    }
  };

  if (loading) return <h2 className="p-6">Loading...</h2>;
  if (error) return <h2 className="p-6 text-red-500">{error}</h2>;

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        📦 Inventory Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Product */}
        <select
          value={form.productId}
          onChange={(e) =>
            setForm({ ...form, productId: e.target.value })
          }
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
  onChange={(e) =>
    setForm({ ...form, storageBinId: e.target.value })
  }
  className="border p-2 rounded"
>
  <option value="">Select Bin</option>

  {bins.map((b) => (
    <option key={b.storageBinId} value={b.storageBinId}>
      {`${b.zone}-${b.row}-${b.rack}-${b.shelf}-${b.bin}`}
    </option>
  ))}
</select>

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button className="col-span-1 md:col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Add Inventory
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
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
                const product = products.find(
                  (p) => p.productId == i.productId
                );

                const bin = bins.find(
                  (b) => b.storageBinId == i.storageBinId
                );

                return (
                  <tr key={i.id || index} className="border-b hover:bg-gray-50">
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