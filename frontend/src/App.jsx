import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CandidateDashboard from "../pages/CandidateDashboard";
import EmployerDashboard from "../pages/EmployerDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/candidate" element={<CandidateDashboard />} />

        <Route path="/employer" element={<EmployerDashboard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;