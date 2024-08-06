import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importa el contexto
import RegisterButton from './RegisterButton';

const URL = 'http://localhost:3000/auth/login';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth(); // Usa el hook del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        login(); // Llama a la función de login del contexto
        setMessage('Inicio de sesión exitoso. Bienvenido!');
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta:', response.status, errorData);
        setMessage(`Error al iniciar sesión. Código de estado: ${response.status}. Mensaje: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      setMessage(`Error de red. Detalles: ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Iniciar sesión
        </button>
        {message && <div className="message">{message}</div>}
      </form>
      <RegisterButton />
    </>
  );
};

export default LoginForm;
