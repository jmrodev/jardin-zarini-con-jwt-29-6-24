// StudentsList.jsx
import React, { useEffect, useState } from 'react'
import Logout from './Logout'
import EditStudentForm from './EditStudentForm'
import './StudentsList.css' // Importa el CSS para el modal

const StudentsList = () => {
  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/api/students', {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setStudents(data)
        } else {
          const errorData = await response.json()
          setError(errorData.error || 'Error al obtener los estudiantes')
        }
      } catch (error) {
        console.error('Error:', error)
        setError('Error al obtener los estudiantes')
      }
    }

    fetchStudents()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/api/students/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (response.ok) {
        setStudents(students.filter(student => student._id !== id))
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Error al eliminar el estudiante')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error al eliminar el estudiante')
    }
  }

  const openModal = (student) => {
    setEditingStudent(student)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingStudent(null)
  }

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Fecha de Nacimiento</th>
            <th>Dirección</th>
            <th>Turno</th>
            <th>Aula</th>
            <th>Contactos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.dni}</td>
              <td>{new Date(student.birth_date).toLocaleDateString()}</td>
              <td>{student.address}</td>
              <td>{student.turn}</td>
              <td>{student.classRoom}</td>
              <td>
                {student.contacts.map((contact, index) => (
                  <div key={index}>
                    {contact.name} ({contact.relationship}): {contact.phone}
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => openModal(student)}>Editar</button>
                <button onClick={() => handleDelete(student._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Logout />
      {isModalOpen && editingStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditStudentForm
              student={editingStudent}
              onClose={closeModal}
              onSave={(updatedStudent) => {
                setStudents(students.map(student =>
                  student._id === updatedStudent._id ? updatedStudent : student
                ))
                closeModal()
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsList
