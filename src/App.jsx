import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import'./components/styles.css';
import Planner from './components/Planner';

const App = () => {

  const [mockUsers] = useState([
    { id: 1, name: 'Usuario 1'},
    { id: 2, name: 'Usuario 2'},
    { id: 3, name: 'Usuario 3'}
  ]);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/event-form" element={< Planner/>} />
    </Routes>
  );
};

export default App;