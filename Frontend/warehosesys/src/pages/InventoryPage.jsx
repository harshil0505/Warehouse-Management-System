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

  useEffect(() => {
    fetchInventory();
    fetchProducts();
    fetchBins();
  }, []);

  const fetchInventory = () => {
    axios.get("http://localhost:8080/api/inventory")
      .then(res => setInventory(res.data));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all")
      .then(res => setProducts(res.data));
  };

  const fetchBins = () => {
    axios.get("http://localhost:8080/api/storage-bin")
      .then(res => setBins(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/inventory", form);

    fetchInventory();
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Inventory Management
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow grid grid-cols-3 gap-4">

        <select onChange={e => setForm({...form, productId: e.target.value})} className="input">
          <option>Select Product</option>
          {products.map(p => (
            <option key={p.productId} value={p.productId}>
              {p.productName}
            </option>
          ))}
        </select>

        <select onChange={e => setForm({...form, storageBinId: e.target.value})} className="input">
          <option>Select Bin</option>
          {bins.map(b => (
            <option key={b.storageBinId} value={b.storageBinId}>
              {b.locationcode}
            </option>
          ))}
        </select>

        <input type="number" placeholder="Quantity"
          onChange={e => setForm({...form, quantity: e.target.value})}
          className="input" />

        <button className="col-span-3 bg-green-600 text-white p-2 rounded">
          Add Inventory
        </button>

      </form>

      {/* TABLE */}
      <table className="w-full mt-6 bg-white shadow rounded">

        <thead className="bg-green-100">
          <tr>
            <th>Product</th>
            <th>Bin</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map(i => (
            <tr key={i.id} className="text-center border-b">
              <td>{i.product?.productName}</td>
              <td>{i.storageBin?.locationcode}</td>
              <td>{i.quantity}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default InventoryPage;