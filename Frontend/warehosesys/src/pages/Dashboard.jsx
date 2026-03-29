import React, { useEffect, useState } from "react";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Products
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/product/ListAllProduct", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

  // 🔥 START SCANNER BUTTON
  const startScanner = () => {
    setShowScanner(true);
  };

  // 🔥 QR SUCCESS FUNCTION
  const onScanSuccess = async (decodedText) => {
    console.log("QR:", decodedText);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/qr/scan", 
        { data: decodedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setScanResult(res.data);

      // 🔥 Auto filter product
      if (decodedText.startsWith("PRODUCT_")) {
        const id = decodedText.split("_")[1];

        const found = products.find((p) => p.productId == id);

        if (found) {
          setFilteredProducts([found]);
        }
      }

    } catch (err) {
      console.error("API ERROR:", err);
    }

    setShowScanner(false);
  };

  // 🔥 HANDLE SCANNER LIFECYCLE (FIXES YOUR ERROR)
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5Qrcode("reader");

    const start = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          onScanSuccess,
          (err) => console.log(err)
        );
      } catch (err) {
        console.error("Scanner error:", err);
      }
    };

    start();

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [showScanner]);

  // ✅ Calculations
  const totalProducts = products.length;
  const lowStock = products.filter((p) => (p.stockQuantity || 0) < 5).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stockQuantity || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            Dashboard
          </h1>

          {/* 🔥 Scan Button */}
          <button
            onClick={startScanner}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Scan QR
          </button>
        </div>

        {/* 🔥 Scanner UI */}
        {showScanner && (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div id="reader" style={{ width: "300px" }} />
          </div>
        )}

        {/* 🔥 Scan Result */}
        {scanResult && (
          <div className="bg-green-200 p-3 rounded mb-4">
            {scanResult}
          </div>
        )}

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

        {/* Search */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded-lg"
        />

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">
            <table className="w-full text-sm">

              <thead className="bg-green-100 text-green-800 sticky top-0">
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

                    <td
                      className={`p-3 font-semibold ${
                        p.stockQuantity < 5
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
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
  <div className="bg-white p-5 rounded-xl shadow-lg hover:scale-105 transition">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-green-700">
      {value}
    </p>
  </div>
);

export default Dashboard;