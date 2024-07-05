import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'; // Asegúrate de que esta ruta sea correcta


const jwtMiddleware =(req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = data
      console.log('Usuario autenticado:', req.session.user) // Registro para depuración
    } catch (error) {
      console.log('Token inválido:', error.message) // Registro para depuración
    }
  } else {
    console.log('No token provided')
  }
  next()
}

export { jwtMiddleware }

