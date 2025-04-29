import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (isRegistering) {
      if (usuarios[email]) {
        setError('El usuario ya existe');
      } else {
        usuarios[email] = { password };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActual', email);
        onLogin(email);
      }
    } else {
      if (!usuarios[email] || usuarios[email].password !== password) {
        setError('Credenciales incorrectas');
      } else {
        localStorage.setItem('usuarioActual', email);
        onLogin(email);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>
      <button onClick={() => {
        setIsRegistering(!isRegistering);
        setError('');
      }}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Auth;