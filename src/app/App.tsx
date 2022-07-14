import React from "react";
import "./App.css";
import Login from "../components/pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import Register from "../components/pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
