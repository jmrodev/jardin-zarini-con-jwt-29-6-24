import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; // Supongo que tienes un servicio de autenticación

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await registerUser({ username, password, role, permissions });
      setMessage('Registro exitoso');
      navigate('/login');
    } catch (error) {
      setMessage(`Error al registrar. Detalles: ${error.message}`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <label htmlFor="username">Usuario:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="role">Rol:</label>
      <input
        type="text"
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <label htmlFor="permissions">Permisos:</label>
      <select
        id="permissions"
        name="permissions"
        value={permissions}
        onChange={(e) => setPermissions(Array.from(e.target.selectedOptions, option => option.value))}
        multiple
      >
        {/* Aquí deberías tener opciones para los permisos */}
      </select>
      <button type="submit">Registrarse</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default RegisterForm;
