import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/Product";
import Order from "./pages/Order";
import StorageBinPage from "./pages/StorageBinPage";
import InventoryPage from "./pages/InventoryPage";
import SerialTrackingPage from "./pages/SerialTrackingPage";
import StockAdjustmentPage from "./pages/StockAdjustmentPage";
import ReserveStockPage from "./pages/ReserveStockPage";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔥 Layout Wrapper (FIX) */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/strogeBin" element={<StorageBinPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/serial-tracking" element={<SerialTrackingPage />} />
        <Route path="/stock-adjustment" element={<StockAdjustmentPage />} />
        <Route path="/reserve-stock" element={<ReserveStockPage />} />

      </Route>

    </Routes>
  );
}

export default App;