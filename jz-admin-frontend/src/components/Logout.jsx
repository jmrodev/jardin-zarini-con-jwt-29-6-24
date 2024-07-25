import { useNavigate } from 'react-router-dom';

function logout() {
  // Eliminar la cookie del lado del cliente
  document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict;';
  
  // Limpiar cualquier dato de usuario almacenado localmente
  localStorage.removeItem('user');
  
  // Llamar al endpoint de logout en el backend
  fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      console.log('Logout exitoso');
    } else {
      console.error('Error en el logout');
    }
  })
  .catch(error => console.error('Error durante el logout:', error));
}

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
}