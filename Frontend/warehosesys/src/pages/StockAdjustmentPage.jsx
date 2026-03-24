import React, { useEffect, useState } from "react";
import axios from "axios";

const StockAdjustmentPage = () => {

  const [adjustments, setAdjustments] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    oldQuantity: "",
    newQuantity: "",
    reasons: ""
  });

  useEffect(() => {
    fetchAdjustments();
    fetchProducts();
  }, []);

  const fetchAdjustments = () => {
    axios.get("http://localhost:8080/api/adjustments")
      .then(res => setAdjustments(res.data));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all")
      .then(res => setProducts(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/adjustments", form);

    fetchAdjustments();
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Stock Adjustment
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 grid grid-cols-4 gap-4">

        <select onChange={e => setForm({...form, productId: e.target.value})} className="input">
          <option>Select Product</option>
          {products.map(p => (
            <option key={p.productId} value={p.productId}>
              {p.productName}
            </option>
          ))}
        </select>

        <input type="number" placeholder="Old Qty"
          onChange={e => setForm({...form, oldQuantity: e.target.value})}
          className="input" />

        <input type="number" placeholder="New Qty"
          onChange={e => setForm({...form, newQuantity: e.target.value})}
          className="input" />

        <select onChange={e => setForm({...form, reasons: e.target.value})} className="input">
          <option>DAMAGE</option>
          <option>LOSS</option>
          <option>UPDATE</option>
        </select>

        <button className="col-span-4 bg-green-600 text-white p-2 rounded">
          Adjust Stock
        </button>

      </form>

      <table className="w-full mt-6 bg-white">

        <thead className="bg-green-100">
          <tr>
            <th>Product</th>
            <th>Old</th>
            <th>New</th>
            <th>Change</th>
          </tr>
        </thead>

        <tbody>
          {adjustments.map(a => (
            <tr key={a.id} className="text-center border-b">
              <td>{a.product?.productName}</td>
              <td>{a.oldQuantity}</td>
              <td>{a.newQuantity}</td>
              <td>{a.changeInQuanity}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default StockAdjustmentPage;