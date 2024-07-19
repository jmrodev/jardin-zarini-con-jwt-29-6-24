import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:3000/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json
        //const data = JSON.parse(text)()
        document.cookie = `access_token=${data.token}; path=/; max-age=3600; Secure; SameSite=Strict`
        // window.location.reload()
        navigate('/students')
      } else {
        const errorData = await response.json()
        setMessage(errorData.error || 'Error en el inicio de sesión')
      
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al iniciar sesión')
    }
  }

  return (
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
  )
}

export default LoginForm
