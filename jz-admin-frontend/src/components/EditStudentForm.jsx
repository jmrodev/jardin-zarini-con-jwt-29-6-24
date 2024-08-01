// EditStudentForm.jsx
import React, { useState } from 'react'

const EditStudentForm = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...student })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/auth/api/students/${student._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      if (response.ok) {
        const updatedStudent = await response.json()
        onSave(updatedStudent)
      } else {
        const errorData = await response.json()
        console.error(errorData.error || 'Error al actualizar el estudiante')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h3>Editar Estudiante</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>DNI:
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </label>
        <label>Fecha de Nacimiento:
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date.substring(0, 10)}
            onChange={handleChange}
          />
        </label>
        <label>Dirección:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>Turno:
          <input
            type="text"
            name="turn"
            value={formData.turn}
            onChange={handleChange}
          />
        </label>
        <label>Aula:
          <input
            type="text"
            name="classRoom"
            value={formData.classRoom}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  )
}

export default EditStudentForm
