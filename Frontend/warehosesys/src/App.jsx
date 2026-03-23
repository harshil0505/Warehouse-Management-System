import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />

      {/* REMOVE OR COMMENT BELOW */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;