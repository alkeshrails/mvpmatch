import React from 'react';
import logo from './logo.svg';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { VendorDashboard } from './components/VendorDashboard';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Login />}/>
        <Route  path="/Login" element={<Login />}/>
        <Route  path="/Register" element={<Register />}/>
        <Route  path="/Vendor-Dashboard" element={<VendorDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
