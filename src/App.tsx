import React from 'react';
import List from './components/List/List';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AddContact from './components/AddContact/AddContact';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </>
  );
}

export default App;
