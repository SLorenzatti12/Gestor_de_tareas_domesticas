import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import'./components/styles.css';
import Dashboard from './components/Dashboard';

const App = () => {

  const [mockUsers] = useState([
    { id: 1, name: 'Usuario 1'},
    { id: 2, name: 'Usuario 2'},
    { id: 3, name: 'Usuario 3'}
  ]);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/event-form" element={<Dashboard />} />
    </Routes>
  );
};

export default App;