import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js';

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1]
  req.session = { user: null }

  if (!token) {
    console.log('No token provided')
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' })
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
    console.log('Usuario autenticado:', req.session.user)
    next()
  } catch (error) {
    console.log('Error de token:', error.message)
    
    // Invalidar la sesión
    req.session.user = null
    
    // Limpiar la cookie del token
    res.clearCookie('access_token')
    
    // Manejar diferentes tipos de errores JWT
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión nuevamente.' })
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido. Por favor, inicie sesión nuevamente.' })
    } else {
      return res.status(401).json({ message: 'Error de autenticación. Por favor, inicie sesión nuevamente.' })
    }
  }
}

export { jwtMiddleware }