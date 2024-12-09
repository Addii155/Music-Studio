import { useState,useEffect } from 'react';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import Register from './pages/SignUp';
import Layout from './components/Layout';
import GenerateContent from './components/Gemini';
import { useStore } from './store';
import { ThemeProvider } from "@/components/theme-provider"
import ArtistPage from './pages/Artist';
import FavouriteSong from './pages/FavouriteSong';
import AlbumPage from './pages/Album';
import Player from './components/Player';
import AdminDashboard from './pages/AdminDashboard';

function App() {


  const {user} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin"  element={user.role === "ADMIN" ? <AdminDashboard /> : <Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/artist/:id" element={<ArtistPage />} />
      <Route path='/favourite' element= {user?   <FavouriteSong/> :<Login  />} />
      <Route path='/album/:id' element={ <AlbumPage />} />
    </Routes>
     </BrowserRouter> 
  
    
    </>
  )
}

export default App
