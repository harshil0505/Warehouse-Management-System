import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Order from "./pages/Order";
import StorageBinPage from "./pages/StorageBinPage";
import InventoryPage from "./pages/InventoryPage";
import SerialTrackingPage from "./pages/SerialTrackingPage";
import StockAdjustmentPage from "./pages/StockAdjustmentPage";
import ReserveStockPage from "./pages/ReserveStockPage";
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/deshborad" element={<Dashboard />} />
      <Route path="/product" element={<Product/>}  />\
      <Route path="/order" element={<Order/>}  />
      <Route path="/strogeBin" element={<StorageBinPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/serial-tracking" element={<SerialTrackingPage />} />
      <Route path="/stock-adjustment" element={<StockAdjustmentPage />} />
      <Route path="/reserve-stock" element={<ReserveStockPage />} />
      
      </Routes>
  );
} 

export default App;