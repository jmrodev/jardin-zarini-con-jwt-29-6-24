import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [permissions, setPermissions] = useState([])
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsSuccess(false)

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ username, password, role, permissions }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage('Usuario registrado con éxito')
        setUsername('')
        setPassword('')
        setRole('')
        setPermissions([])
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage(data.error || 'Error al registrar usuario')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error de conexión. Por favor, intente más tarde.')
    }
  }

  const handlePermissionsChange = (e) => {
    const { value, checked } = e.target
    setPermissions((prevPermissions) =>
      checked ? [...prevPermissions, value] : prevPermissions.filter(p => p !== value)
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reg-username">Usuario:</label>
      <input
        type="text"
        id="reg-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="reg-password">Contraseña:</label>
      <input
        type="password"
        id="reg-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="reg-role">Rol:</label>
      <select
        id="reg-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Seleccione un rol</option>
        <option value="admin">Admin</option>
        <option value="directora">Directora</option>
        <option value="vicedirectora">Vicedirectora</option>
        <option value="preceptora">Preceptora</option>
        <option value="maestra">Maestra</option>
        <option value="padre">Padre</option>
      </select>
      <label htmlFor="reg-permissions">Permisos:</label>
      <label>
        <input type="checkbox" name="permisos" value="create:students" onChange={handlePermissionsChange} />
        Crear estudiantes
      </label>
      <label>
        <input type="checkbox" name="permisos" value="read:students" onChange={handlePermissionsChange} />
        Leer estudiantes
      </label>
      <label>
        <input type="checkbox" name="permisos" value="update:students" onChange={handlePermissionsChange} />
        Actualizar estudiantes
      </label>
      <label>
        <input type="checkbox" name="permisos" value="delete:students" onChange={handlePermissionsChange} />
        Eliminar estudiantes
      </label>
      <label>
        <input type="checkbox" name="permisos" value="create:teachers" onChange={handlePermissionsChange} />
        Crear profesores
      </label>
      <label>
        <input type="checkbox" name="permisos" value="read:teachers" onChange={handlePermissionsChange} />
        Leer profesores
      </label>
      <label>
        <input type="checkbox" name="permisos" value="update:teachers" onChange={handlePermissionsChange} />
        Actualizar profesores
      </label>
      <label>
        <input type="checkbox" name="permisos" value="delete:teachers" onChange={handlePermissionsChange} />
        Eliminar profesores
      </label>
      <label>
        <input type="checkbox" name="permisos" value="create:subjects" onChange={handlePermissionsChange} />
        Crear materias
      </label>
      <label>
        <input type="checkbox" name="permisos" value="read:subjects" onChange={handlePermissionsChange} />
        Leer materias
      </label>
      <label>
        <input type="checkbox" name="permisos" value="update:subjects" onChange={handlePermissionsChange} />
        Actualizar materias
      </label>
      <label>
        <input type="checkbox" name="permisos" value="delete:subjects" onChange={handlePermissionsChange} />
        Eliminar materias
      </label>
      <button type="submit">Registrar</button>
      {message && (
        <div className={isSuccess ? 'success' : 'error'}>{message}</div>
      )}
    </form>
  )
}

export default RegisterForm
