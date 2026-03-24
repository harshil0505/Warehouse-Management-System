import React from "react";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <div className="w-64 bg-[#020617] text-white flex flex-col justify-between">

      {/* TOP */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-green-400 mb-6">
          WMS Pro
        </h2>

        <ul className="space-y-3">

          <li onClick={() => navigate("/dashboard")}
            className="bg-green-500 p-2 rounded cursor-pointer">
            Dashboard
          </li>

          <li onClick={() => navigate("/products")}
            className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Products
          </li>

          <li onClick={() => navigate("/inventory")}
            className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Inventory
          </li>

          <li onClick={() => navigate("/orders")}
            className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Orders
          </li>

          <li onClick={() => navigate("/serial")}
            className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Serial Numbers
          </li>

        </ul>
      </div>

      {/* BOTTOM PROFILE */}
      <ProfileMenu />

    </div>
  );
};

export default Sidebar;