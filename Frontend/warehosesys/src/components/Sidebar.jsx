import React from "react";
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

          <li className="flex items-center justify-between bg-green-500 text-black px-3 py-2 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              Dashboard
            </div>
            <span>{">"}</span>
          </li>

          <li className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
            <Box size={18} />
            Products
          </li>

          <li className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
            <Boxes size={18} />
            Inventory
          </li>

          <li className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
            <Archive size={18} />
            Storage Bins
          </li>

          <li className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
            <ClipboardList size={18} />
            Orders
          </li>

          <li className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
            <QrCode size={18} />
            Serial Numbers
          </li>

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