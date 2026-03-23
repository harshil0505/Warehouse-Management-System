import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import signupImg from "../assets/signup.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    role: "STAFF",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        userName: formData.userName,   // ✅ fixed key
        password: formData.password,
        roles: [formData.role],
      });

      navigate("/login");
    } catch (error) {
      setError("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={signupImg}
          alt="signup"
          className="h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center text-white text-center p-10">

          <h1 className="text-5xl font-bold mb-4 
            bg-gradient-to-r from-gray-200 via-white to-gray-300 
            bg-clip-text text-transparent 
            drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            Warehouse System
          </h1>

          <p className="text-lg text-gray-300 tracking-wide 
            drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
            Smart inventory & staff management platform
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center 
        bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

        {/* GLASS CARD */}
        <div className="w-full max-w-md p-8 rounded-3xl 
          backdrop-blur-lg bg-white/70 shadow-2xl 
          hover:shadow-green-300/50 transition-all duration-500 hover:scale-105">

          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* USERNAME */}
            <input
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 
              outline-none transition"
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
    focus:ring-2 focus:ring-green-500 focus:border-green-500 
    outline-none transition"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg 
    focus:ring-2 focus:ring-green-500 focus:border-green-500 
    outline-none transition"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: "ADMIN" })
                }
                className={`flex-1 p-3 rounded-lg font-semibold transition-all duration-300 ${formData.role === "ADMIN"
                    ? "bg-green-600 text-white scale-105 shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                ADMIN
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: "STAFF" })
                }
                className={`flex-1 p-3 rounded-lg font-semibold transition-all duration-300 ${formData.role === "STAFF"
                    ? "bg-green-600 text-white scale-105 shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                STAFF
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="w-full bg-green-600 text-white py-3 rounded-lg 
              font-semibold transition-all duration-300 
              hover:bg-green-700 hover:scale-105 hover:shadow-xl">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6">
            Already have account?{" "}
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;