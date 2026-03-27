import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

     navigate("/dashboard");

    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={loginImg}
          alt="login"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center text-white text-center p-10">
          
          <h1 className="text-5xl font-bold mb-4 
            bg-gradient-to-r from-gray-200 via-white to-gray-300 
            bg-clip-text text-transparent 
            drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            Welcome Back
          </h1>

          <p className="text-lg text-gray-300">
            Login to manage your warehouse system efficiently
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center 
        bg-gradient-to-br from-green-100 to-green-200">

        {/* GLASS CARD */}
        <div className="w-full max-w-md p-8 rounded-3xl 
          backdrop-blur-lg bg-white/70 shadow-2xl 
          transition-all duration-500 hover:scale-105">

          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* USERNAME */}
            <input
              type="text"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg 
              focus:ring-2 focus:ring-green-500 outline-none transition"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg 
                focus:ring-2 focus:ring-green-500 outline-none transition"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-green-600 text-white py-3 rounded-lg 
              font-semibold transition-all duration-300 
              hover:bg-green-700 hover:scale-105 hover:shadow-xl">
              Login
            </button>
          </form>

          <p className="text-center mt-6">
            Don't have account?{" "}
            <Link
              to="/signup"
              className="text-green-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;