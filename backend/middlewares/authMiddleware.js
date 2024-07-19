// authMiddleware.js
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';
import { StudentRepository } from '../repositories/student-repository.js';

// Middleware para autenticar con JWT
export const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
  req.session = { user: null };

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
    console.log('Usuario autenticado:', req.session.user);
    next();
  } catch (error) {
    console.log('Error de token:', error.message);

    // Invalidar la sesión
    req.session.user = null;

    // Limpiar la cookie del token
    res.clearCookie('access_token');

    // Manejar diferentes tipos de errores JWT
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
    if (!req.session.user) {
      console.log('Usuario no autenticado'); // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    if (!roles.includes(req.session.user.role)) {
      console.log(`Rol no autorizado: ${req.session.user.role}`); // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};

// Middleware para autorizar maestra
export const authorizeMaestra = async (req, res, next) => {
  if (req.session.user.role === 'maestra') {
    const alumno = await StudentRepository.getById(req.params.id);
    if (req.session.user.classRoom !== alumno.classRoom) {
      return res.status(403).json({ message: 'No autorizado' });
    }
  }
  next();
};

// Middleware para autorizar padre
export const authorizePadre = async (req, res, next) => {
  const hijo = await StudentRepository.getById(req.params.id);
  if (hijo.classRoom !== 'sala3') {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next();
};

// Middleware para autorizar creación por maestra
export const authorizeMaestraCreate = (req, res, next) => {
  if (req.session.user.role === 'maestra') {
    if (req.body.classRoom !== req.session.user.classRoom || req.body.classRoom === 'sala3') {
      return res.status(403).json({ message: 'No autorizado' });
    }
  }
  next();
};
