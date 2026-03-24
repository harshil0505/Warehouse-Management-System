import React, { useEffect, useState } from "react";
import axios from "axios";

const StorageBinPage = () => {

  const [bins, setBins] = useState([]);

  const [form, setForm] = useState({
    locationcode: "",
    locationcodeType: ""
  });

  // 🔄 Fetch Bins
  const fetchBins = () => {
    axios.get("http://localhost:8080/api/storage-bin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setBins(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBins();
  }, []);

  // 📝 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ Add Bin
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/storage-bin", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Storage Bin Added ✅");
      fetchBins();

      setForm({
        locationcode: "",
        locationcodeType: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error adding bin");
    }
  };

  // ❌ Delete Bin
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/storage-bin/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchBins();
  };

  return (
    <div className="min-h-screen p-6 
      bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Storage Bin Management
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 grid grid-cols-2 gap-4">

        <input
          name="locationcode"
          value={form.locationcode}
          onChange={handleChange}
          placeholder="Location Code (e.g. BIN-A1)"
          className="input"
          required
        />

        <select
          name="locationcodeType"
          value={form.locationcodeType}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Type</option>
          <option value="SMALL">SMALL</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LARGE">LARGE</option>
        </select>

        <button className="col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Add Storage Bin
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg p-5">

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Storage Bins
        </h2>

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-green-100 text-green-800">
              <th>ID</th>
              <th>Location Code</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bins.map(bin => (
              <tr key={bin.storageBinId} className="text-center border-b">

                <td>{bin.storageBinId}</td>
                <td>{bin.locationcode}</td>
                <td className="font-semibold text-green-700">
                  {bin.locationcodeType}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(bin.storageBinId)}
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

export default StorageBinPage;