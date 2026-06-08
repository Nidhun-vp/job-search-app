import { useState } from "react";
import API from "../api/axios";
import React from 'react';

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
    } catch (err) {
      console.log(err);
      alert("Register Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm
                      transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-lg p-3
                       focus:outline-none focus:ring-2 focus:ring-black
                       transition duration-200"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

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

          <select
            className="border border-gray-300 rounded-lg p-3
                       focus:outline-none focus:ring-2 focus:ring-black
                       transition duration-200 bg-white text-gray-700"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          <button
            type="submit"
            className="bg-black text-white rounded-lg p-3 mt-2 font-semibold
                       transition-all duration-200
                       hover:bg-blue-800 hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
}

export default Register;