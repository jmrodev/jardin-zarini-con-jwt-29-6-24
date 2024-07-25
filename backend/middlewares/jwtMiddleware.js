import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

export const jwtMiddleware = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res
      .status(401)
      .json({ message: 'No se proporcionó token de autenticación' })
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.user = data
    next()
  } catch (error) {
    req.user = null
    res.clearCookie('access_token')
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({
          message: 'Token expirado. Por favor, inicie sesión nuevamente.',
        })
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({
          message: 'Token inválido. Por favor, inicie sesión nuevamente.',
        })
    } else {
      return res
        .status(401)
        .json({
          message:
            'Error de autenticación. Por favor, inicie sesión nuevamente.',
        })
    }
  }
}
