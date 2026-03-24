import React, { useEffect, useState } from "react";
import axios from "axios";

const SerialTrackingPage = () => {

  const [serials, setSerials] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    serialNo: "",
    productId: "",
    status: ""
  });

  useEffect(() => {
    fetchSerials();
    fetchProducts();
  }, []);

  const fetchSerials = () => {
    axios.get("http://localhost:8080/api/serial")
      .then(res => setSerials(res.data));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all")
      .then(res => setProducts(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/serial", form);

    fetchSerials();
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Serial Tracking
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow grid grid-cols-3 gap-4">

        <input placeholder="Serial No"
          onChange={e => setForm({...form, serialNo: e.target.value})}
          className="input" />

        <select onChange={e => setForm({...form, productId: e.target.value})} className="input">
          <option>Select Product</option>
          {products.map(p => (
            <option key={p.productId} value={p.productId}>
              {p.productName}
            </option>
          ))}
        </select>

        <select onChange={e => setForm({...form, status: e.target.value})} className="input">
          <option>AVAILABLE</option>
          <option>SOLD</option>
          <option>DAMAGED</option>
        </select>

        <button className="col-span-3 bg-green-600 text-white p-2 rounded">
          Add Serial
        </button>

      </form>

      <table className="w-full mt-6 bg-white">

        <thead className="bg-green-100">
          <tr>
            <th>Serial</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {serials.map(s => (
            <tr key={s.id} className="text-center border-b">
              <td>{s.serialNo}</td>
              <td>{s.product?.productName}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default SerialTrackingPage;