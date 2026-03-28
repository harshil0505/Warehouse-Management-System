import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileMenu from "../components/ProfileMenu";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch Data
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    axios
      .get("http://localhost:8080/api/product/ListAllProduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // ✅ Search Filter
  useEffect(() => {
    const filtered = products.filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // ✅ Calculations
  const totalProducts = products.length;
  const lowStock = products.filter(
    (p) => (p.stockQuantity || 0) < 5
  ).length;

  const inventoryValue = products.reduce(
    (sum, p) =>
      sum + (p.price || 0) * (p.stockQuantity || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            Dashboard
          </h1>
         
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card title="Total Products" value={totalProducts} />
          <Card title="Low Stock" value={lowStock} />
          <Card
            title="Inventory Value"
            value={`₹${inventoryValue.toFixed(2)}`}
          />
          <Card title="Orders" value="1" />
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5">
  <h2 className="text-xl font-semibold text-green-700 mb-4">
    Products
  </h2>

  <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">

    <table className="w-full text-sm">
      
      <thead className="bg-green-100 text-green-800 sticky top-0 z-10">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Stock</th>
          <th className="p-3 text-left">Price</th>
        </tr>
      </thead>

      <tbody>
        {filteredProducts.map((p) => (
          <tr
            key={p.productId}
            className={`border-b hover:bg-gray-50 ${
              p.stockQuantity < 5 ? "bg-red-50" : ""
            }`}
          >
            <td className="p-3">{p.productName}</td>

            <td className={`p-3 font-semibold ${
              p.stockQuantity < 5
                ? "text-red-500"
                : "text-green-600"
            }`}>
              {p.stockQuantity}
            </td>

            <td className="p-3">₹{p.price}</td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>
</div>
  
             
        </div>
      </div>
   
  );
};

// ✅ Card Component
const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-green-700">
      {value}
    </p>
  </div>
);

export default Dashboard;