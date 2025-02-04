import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import Player from "./components/Player.jsx";
function App() {
  const { user } = useSelector((state) => state.auth);
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              user && user.role === "ADMIN" ? <AdminDashboard /> : <Home />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Player />
    </>
  );
}

export default App;
