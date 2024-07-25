import React, { useEffect, useState } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const token = getCookie('access_token');

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Error al obtener los estudiantes');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al obtener los estudiantes');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Lista de estudiantes</h1>
      {error && <p>{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <p>{student.name}</p>
            <p>{student.dni}</p>
            <p>{student.birth_date}</p>
            <p>{student.address}</p>
            <p>{student.turn}</p>
            <p>{student.classRoom}</p>
            <p>{student.teacherId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsList;