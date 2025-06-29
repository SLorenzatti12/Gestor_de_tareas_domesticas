import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, onLogin, switchToRegister }) => (
  <>
    <h2>Iniciar Sesión</h2>
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
    <button onClick={onLogin}>Entrar</button>
    <button className="secondary-btn" onClick={switchToRegister}>
      Registrarse
    </button>
  </>
);

export default LoginForm;