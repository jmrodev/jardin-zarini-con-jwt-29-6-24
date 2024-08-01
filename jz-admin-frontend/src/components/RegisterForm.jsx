import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormRegister from './FormRegister.jsx';
import { registerUser } from '../services/authService.js'; // Importa el servicio

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    const userDetails = { username, password, role, permissions };

    try {
      const data = await registerUser(userDetails); // Usa el servicio aquí

      if (data) {
        setIsSuccess(true);
        setMessage('Usuario registrado con éxito');
        setUsername('');
        setPassword('');
        setRole('');
        setPermissions([]);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Por favor, intente más tarde.');
    }
  };

  const handlePermissionsChange = (e) => {
    const { value, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked ? [...prevPermissions, value] : prevPermissions.filter(p => p !== value)
    );
  };

  return (
    <FormRegister
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      handlePermissionsChange={handlePermissionsChange}
      message={message}
      isSuccess={isSuccess}
    />
  );
};

export default RegisterForm;
