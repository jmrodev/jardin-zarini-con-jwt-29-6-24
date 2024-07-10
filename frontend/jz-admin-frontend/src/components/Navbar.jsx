import React from 'react';

const Navbar = ({ user, onLogout, onViewStudents, onAddStudent, onViewChildren }) => (
  <div className="nav-menu">
    {['directora', 'vicedirectora', 'preceptora', 'maestra'].includes(user.role) && (
      <button onClick={onViewStudents}>Ver Alumnos</button>
    )}
    {user.role === 'preceptora' && <button onClick={onAddStudent}>Añadir Alumno</button>}
    {user.role === 'padre' && <button onClick={onViewChildren}>Ver Mis Hijos</button>}
    <button onClick={onLogout}>Cerrar sesión</button>
  </div>
);

export default Navbar;
