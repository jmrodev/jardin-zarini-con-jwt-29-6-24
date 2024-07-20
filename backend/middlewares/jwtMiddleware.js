import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

// Middleware para autenticar con JWT
export const jwtMiddleware = (req, res, next) => {
  // Obtener token desde cookies o encabezado de autorización
  const token =
    req.cookies.access_token || req.headers['authorization']?.split(' ')[1]
  //req.session = { user: null }; // Inicializar sesión

  // Verificar presencia del token
  if (!token) {
    return res
      .status(401)
      .json({ message: 'No se proporcionó token de autenticación' })
  }

  try {
    // Verificar el token JWT
    const data = jwt.verify(token, SECRET_JWT_KEY)
    //req.session.user = data;
    req.user = data
    next()
  } catch (error) {
    // Invalidar la sesión y limpiar la cookie del token
    // req.session.user = null;
    req.user = null
    res.clearCookie('access_token')

    // Manejar errores de JWT
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
