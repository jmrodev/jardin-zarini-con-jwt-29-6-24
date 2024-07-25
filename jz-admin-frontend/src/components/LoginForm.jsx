import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterButton from './RegisterButton'

const URL = 'http://localhost:3000/auth/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Esto es importante para incluir las cookies
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Respuesta completa:', data)

        // El token está en la cookie, no necesitamos guardarlo manualmente
        // Pero podemos guardar la información del usuario si es necesario
        localStorage.setItem('user', JSON.stringify(data.user))

        // Redirigir al usuario
        navigate('/students')
      } else {
        const errorData = await response.json()
        console.error('Error en la respuesta:', response.status, errorData)
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    } catch (error) {
      console.error('Error de autenticación:', error)
      // Manejar el error de red
    }
  }
  return (
    <>
      {' '}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>
        {message && <div className="error">{message}</div>}
      </form>
      <RegisterButton />
    </>
  )
}

export default LoginForm
