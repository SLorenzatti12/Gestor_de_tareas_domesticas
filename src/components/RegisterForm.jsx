import React, { useState } from 'react';

const RegisterForm = ({ onRegister, switchToLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    onRegister(name, password);
    setName('');
    setPassword('');
  };

  return (
    <div className="auth-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tenés cuenta?{' '}
        <button className="secondary-btn" onClick={switchToLogin}>
          Iniciar Sesión
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;