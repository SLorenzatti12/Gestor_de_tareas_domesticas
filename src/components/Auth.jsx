import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedPassword = localStorage.getItem(`password:${email}`);
    if (storedPassword === password) {
      localStorage.setItem('userEmail', email);
      navigate('/event-form'); // o la ruta principal de tu app
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem(`password:${email}`, password);
      alert('Usuario registrado correctamente.');
      setIsRegistering(false);
    } else {
      alert('Ingrese email y contraseña para registrarse.');
    }
  };

  return (
    <div className="form-container">
      {isRegistering ? (
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onRegister={handleRegister}
          switchToLogin={() => setIsRegistering(false)}
        />
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onLogin={handleLogin}
          switchToRegister={() => setIsRegistering(true)}
        />
      )}
    </div>
  );
};

export default Auth;