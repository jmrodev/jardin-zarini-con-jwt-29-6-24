import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';

// Middleware para autenticar con JWT
export const jwtMiddleware = (req, res, next) => {
  // Obtener token desde cookies o encabezado de autorización
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
  req.session = { user: null }; // Inicializar sesión

  // Verificar presencia del token
  if (!token) {
    console.log('No token provided from authmiddleware'); // Registro para depuración
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }

  try {
    // Verificar el token JWT
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
    console.log('Usuario autenticado:', req.session.user);
    next();
  } catch (error) {
    console.log('Error de token:', error.message);

    // Invalidar la sesión y limpiar la cookie del token
    req.session.user = null;
    res.clearCookie('access_token');

    // Manejar errores de JWT
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión nuevamente.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido. Por favor, inicie sesión nuevamente.' });
    } else {
      return res.status(401).json({ message: 'Error de autenticación. Por favor, inicie sesión nuevamente.' });
    }
  }
};

// Middleware para autorizar roles específicos
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    // Verificar autenticación del usuario
    if (!req.session.user) {
      console.log('Usuario no autenticado'); // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    // Verificar si el rol del usuario está en la lista de roles permitidos
    if (!roles.includes(req.session.user.role)) {
      console.log(`Rol no autorizado: ${req.session.user.role}`); // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};
