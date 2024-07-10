import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        document.cookie = `access_token=${data.token}; Secure; SameSite=None`;
        window.location.reload();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Usuario:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label htmlFor="password">Contraseña:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Iniciar sesión</button>
      {message && <div className="error">{message}</div>}
    </form>
  );
};

export default LoginForm;
