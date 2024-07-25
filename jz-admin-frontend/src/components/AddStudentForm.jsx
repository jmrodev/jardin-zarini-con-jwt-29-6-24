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
