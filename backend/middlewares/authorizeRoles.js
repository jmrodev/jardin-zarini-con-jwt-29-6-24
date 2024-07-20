// middlewares/authorizeRoles.js

// Middleware para autorizar roles específicos
export const authorizeRoles = (roles) => {
    return (req, res, next) => {
      // Verificar autenticación del usuario
      if (!req.user) {
        return res.status(403).json({ message: 'No autorizado' });
      }
      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'No autorizado' });
      }
      next();
    };
  };
  