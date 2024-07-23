// middlewares/authorizeRolesAndPermissions.js
import { ROLE_PERMISSIONS } from '../config/roles.js';

export const authorize = (allowedRoles, requiredPermissions = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Verificar rol
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Rol no autorizado' });
    }

    // Verificar permisos si se especifican
    if (requiredPermissions.length > 0) {
      const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
      const hasAllRequiredPermissions = requiredPermissions.every(
        permission => userPermissions.includes(permission)
      );

      if (!hasAllRequiredPermissions) {
        return res.status(403).json({ message: 'Permisos insuficientes' });
      }
    }

    next();
  };
};