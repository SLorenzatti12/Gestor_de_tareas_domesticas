import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedPassword = localStorage.getItem(`password:${email}`);
    if (storedPassword === password) {
      localStorage.setItem('userEmail', email);
      navigate('/event-form');
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem(`password:${email}`, password);
      alert('Usuario registrado correctamente.');
    } else {
      alert('Ingrese email y contraseña para registrarse.');
    }
  };

  return (
    <div className="form-container">
      <h2>Bienvenido</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña" 
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
      <button onClick={handleRegister} className="secondary-btn">Registrarse</button>
    </div>
  );
};

export default Auth;