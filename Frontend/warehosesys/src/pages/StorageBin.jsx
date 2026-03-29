import React, { useState, useEffect } from "react";
import axios from "axios";

const StorageBin = () => {
  const [form, setForm] = useState({
    zone: "",
    row: "",
    rack: "",
    shelf: "",
    bin: ""
  });

  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8080/api/storage-bin";

  // 🔄 Fetch bins
  const fetchBins = async () => {
    try {
      const res = await axios.get(API_URL);
      setBins(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add bin
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.zone || !form.row || !form.rack || !form.shelf || !form.bin) {
      alert("All fields required!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_URL, form);

      // Reset form
      setForm({ zone: "", row: "", rack: "", shelf: "", bin: "" });

      // Refresh list
      fetchBins();
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">📦 Storage Bin Management</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow border border-green-100 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Bin</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4">
          {["zone", "row", "rack", "shelf", "bin"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}

          <button
            type="submit"
            className="col-span-5 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Adding..." : "Add Bin"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow border border-green-100">
        <h2 className="text-xl font-semibold mb-4">All Bins</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Location Code</th>
                <th className="p-3 text-left">Zone</th>
                <th className="p-3 text-left">Row</th>
                <th className="p-3 text-left">Rack</th>
                <th className="p-3 text-left">Shelf</th>
                <th className="p-3 text-left">Bin</th>
              </tr>
            </thead>

            <tbody>
              {bins.length > 0 ? (
                bins.map((b, index) => (
                  <tr
                    key={b.storageBinId}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-green-50"
                    } hover:bg-green-100`}
                  >
                    <td className="p-3">{b.storageBinId}</td>
                    <td className="p-3 font-bold text-green-700">
                      {b.locationCode}
                    </td>
                    <td className="p-3">{b.zone}</td>
                    <td className="p-3">{b.row}</td>
                    <td className="p-3">{b.rack}</td>
                    <td className="p-3">{b.shelf}</td>
                    <td className="p-3">{b.bin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No bins found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default StorageBin;