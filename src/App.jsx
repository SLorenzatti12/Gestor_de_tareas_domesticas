import React, { useState, useEffect } from 'react';
import Planner from './components/Planner';
import Auth from './components/Auth';
import './styles.css';

const App = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario) {
      setUsuarioActual(usuario);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual');
    setUsuarioActual(null);
  };

  return (
    <div className="App">
      {usuarioActual ? (
        <>
          <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
          <Planner usuarioActual={usuarioActual} />
        </>
      ) : (
        <Auth onLogin={setUsuarioActual} />
      )}
    </div>
  );
};

export default App;