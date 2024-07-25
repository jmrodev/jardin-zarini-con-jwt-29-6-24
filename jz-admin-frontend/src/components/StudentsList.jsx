import React, { useEffect, useState } from 'react'
import Logout from './Logout'


const StudentsList = () => {
  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
 

    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/api/students', {
          credentials: 'include'
        }
        )
        console.log('response:', response)
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


    return (
      <div>
        <h2>Lista de Estudiantes</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
        <Logout />
      </div>
     
    ); 
    
}

export default StudentsList
