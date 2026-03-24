import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <div className="border-t border-gray-700 p-4">

      {/* USER INFO */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded"
      >
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <p className="font-semibold">{user?.name || "User"}</p>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="mt-3 bg-[#020617] border border-gray-700 rounded p-2">

          <button
            onClick={() => navigate("/profileManu")}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 hover:bg-red-500 rounded"
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
};

export default ProfileMenu;