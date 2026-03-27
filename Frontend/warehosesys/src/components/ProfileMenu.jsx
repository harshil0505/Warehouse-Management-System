

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => console.log("Error fetching user"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative">
      
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full cursor-pointer"
      >
        {user?.userName?.charAt(0).toUpperCase() || "U"}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg">

          <div className="p-3 border-b">
            <p className="font-semibold">{user?.userName}</p>
            <p className="text-sm text-gray-500">ID: {user?.id}</p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default ProfileMenu;