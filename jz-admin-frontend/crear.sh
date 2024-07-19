#!/bin/bash

# Crear la carpeta de componentes si no existe
mkdir -p src/components

# Crear LoginForm.jsx
cat <<EOL > src/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        document.cookie = \`access_token=\${data.token}; Secure; SameSite=None\`;
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
EOL

# Crear RegisterForm.jsx
cat <<EOL > src/components/RegisterForm.jsx
import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Usuario registrado con éxito');
        setUsername('');
        setPassword('');
        setRole('');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reg-username">Usuario:</label>
      <input type="text" id="reg-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label htmlFor="reg-password">Contraseña:</label>
      <input type="password" id="reg-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <label htmlFor="reg-role">Rol:</label>
      <select id="reg-role" value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="admin">Admin</option>
        <option value="directora">Directora</option>
        <option value="vicedirectora">Vicedirectora</option>
        <option value="preceptora">Preceptora</option>
        <option value="maestra">Maestra</option>
        <option value="padre">Padre</option>
      </select>
      <button type="submit">Registrar</button>
      {message && <div className={response.ok ? "success" : "error"}>{message}</div>}
    </form>
  );
};

export default RegisterForm;
EOL

# Crear Navbar.jsx
cat <<EOL > src/components/Navbar.jsx
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
EOL

# Crear AddStudentForm.jsx
cat <<EOL > src/components/AddStudentForm.jsx
import React, { useState } from 'react';

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    dni: '',
    birth_date: '',
    address: '',
    contact_name: '',
    contact_relationship: '',
    contact_phone: '',
    turn: '',
    classRoom: '',
    teacherId: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Alumno añadido con éxito');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al añadir el alumno');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="student-name">Nombre:</label>
      <input type="text" id="student-name" value={studentData.name} onChange={handleChange} required />
      <label htmlFor="student-dni">DNI:</label>
      <input type="number" id="student-dni" value={studentData.dni} onChange={handleChange} required />
      <label htmlFor="student-birth-date">Fecha de Nacimiento:</label>
      <input type="date" id="student-birth-date" value={studentData.birth_date} onChange={handleChange} required />
      <label htmlFor="student-address">Dirección:</label>
      <input type="text" id="student-address" value={studentData.address} onChange={handleChange} required />
      <label htmlFor="student-contact-name">Nombre del Contacto:</label>
      <input type="text" id="student-contact-name" value={studentData.contact_name} onChange={handleChange} required />
      <label htmlFor="student-contact-relationship">Relación del Contacto:</label>
      <input type="text" id="student-contact-relationship" value={studentData.contact_relationship} onChange={handleChange} required />
      <label htmlFor="student-contact-phone">Teléfono del Contacto:</label>
      <input type="text" id="student-contact-phone" value={studentData.contact_phone} onChange={handleChange} required />
      <label htmlFor="student-turn">Turno:</label>
      <select id="student-turn" value={studentData.turn} onChange={handleChange} required>
        <option value="morning">Mañana</option>
        <option value="afternoon">Tarde</option>
      </select>
      <label htmlFor="student-classroom">Aula:</label>
      <input type="text" id="student-classroom" value={studentData.classRoom} onChange={handleChange} required />
      <label htmlFor="student-teacher-id">ID del Profesor:</label>
      <input type="text" id="student-teacher-id" value={studentData.teacherId} onChange={handleChange} required />
      <button type="submit">Añadir</button>
      {message && <div className={response.ok ? "success" : "error"}>{message}</div>}
    </form>
  );
};

export default AddStudentForm;
EOL

# Crear StudentsList.jsx
cat <<EOL > src/components/StudentsList.jsx
import React, { useEffect, useState } from 'react';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/students');
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name} - {student.classRoom}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
EOL

# Crear ChildrenList.jsx
cat <<EOL > src/components/ChildrenList.jsx
import React, { useEffect, useState } from 'react';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch('/mis-hijos');
        const data = await response.json();
        if (response.ok) {
          setChildren(data);
        } else {
          console.error('Failed to fetch children');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div>
      <h2>Mis Hijos</h2>
      <ul>
        {children.map((child) => (
          <li key={child.id}>{child.name} - {child.classRoom}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChildrenList;
EOL

echo "Componentes creados exitosamente en src/components"
