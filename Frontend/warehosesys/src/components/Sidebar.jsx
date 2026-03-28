import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  Boxes,
  Archive,
  ClipboardList,
  QrCode
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col justify-between">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-800">
          <div className="text-green-400 text-2xl">▣</div>
          <h1 className="text-lg font-semibold">WMS Pro</h1>
        </div>

        {/* Menu */}
        <ul className="p-3 space-y-2">

          {/* Dashboard */}
          <NavLink to="/dashboard">
            {({ isActive }) => (
              <li className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  Dashboard
                </div>

                <span>{">"}</span>
              </li>
            )}
          </NavLink>

          {/* Products */}
          <NavLink to="/products">
            {({ isActive }) => (
              <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <Box size={18} />
                Products
              </li>
            )}
          </NavLink>

          {/* Inventory */}
          <NavLink to="/inventory">
            {({ isActive }) => (
              <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <Boxes size={18} />
                Inventory
              </li>
            )}
          </NavLink>

          {/* Storage */}
          <NavLink to="/storage">
            {({ isActive }) => (
              <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <Archive size={18} />
                Storage Bins
              </li>
            )}
          </NavLink>

          {/* Orders */}
          <NavLink to="/orders">
            {({ isActive }) => (
              <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <ClipboardList size={18} />
                Orders
              </li>
            )}
          </NavLink>

          {/* Serial */}
          <NavLink to="/serial">
            {({ isActive }) => (
              <li className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
              ${isActive ? "bg-green-500 text-black" : "text-gray-300 hover:bg-gray-800"}`}>
                
                <QrCode size={18} />
                Serial Numbers
              </li>
            )}
          </NavLink>

        </ul>
      </div>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-gray-800 flex items-center gap-3">
        <div className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">
          JD
        </div>
        <div>
          <p className="text-sm font-semibold">John Doe</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;