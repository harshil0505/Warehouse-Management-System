import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/product/ListAllProduct")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stockQuantity < 5).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + (p.price * p.stockQuantity),
    0
  );

  return (
    <div className="flex min-h-screen 
      bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

      {/* ✅ USE COMPONENT */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card title="Total Products" value={totalProducts} />
          <Card title="Low Stock" value={lowStock} />
          <Card title="Inventory Value" value={`₹${inventoryValue.toFixed(2)}`} />
          <Card title="Orders" value="1" />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">

          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Products
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-2">Name</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>

            <tbody>
              {products.map(p => (
                <tr key={p.productId} className="text-center border-b">
                  <td className="p-2">{p.productName}</td>

                  <td className={`p-2 font-semibold ${
                    p.stockQuantity < 5 ? "text-red-500" : "text-green-600"
                  }`}>
                    {p.stockQuantity}
                  </td>

                  <td className="p-2">₹{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg hover:scale-105 transition">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-green-700">{value}</p>
  </div>
);

export default Dashboard;