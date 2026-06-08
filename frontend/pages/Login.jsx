import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login Success");

      if (res.data.user.role === "candidate") {
        navigate("/");
      } else {
        navigate("/employer");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm
                      transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3
                       focus:outline-none focus:ring-2 focus:ring-black
                       transition duration-200"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3
                       focus:outline-none focus:ring-2 focus:ring-black
                       transition duration-200"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-black text-white rounded-lg p-3 mt-2 font-semibold
                       transition-all duration-200
                       hover:bg-blue-800 hover:scale-105 active:scale-95"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;