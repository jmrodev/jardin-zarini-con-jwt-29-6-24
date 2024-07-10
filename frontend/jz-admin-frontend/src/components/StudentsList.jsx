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
