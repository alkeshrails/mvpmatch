import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Login } from './features/Login';
import { Register } from './features/Register';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Login />}/>
        <Route  path="/Login" element={<Login />}/>
        <Route  path="/Register" element={<Register />}/>
        <Route  path="/Counter" element={<Counter/>}/>
      </Routes>
    </div>
  );
}

export default App;
