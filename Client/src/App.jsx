import { useState,useEffect } from 'react';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import Register from './pages/SignUp';
import Layout from './components/Layout';

function App() {

  const {user,auth} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();
 console.log(document.cookie);

  
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/"  element={auth===true ? <Home /> : <Login />} />
     
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
     </BrowserRouter> 

    </>
  )
}

export default App
