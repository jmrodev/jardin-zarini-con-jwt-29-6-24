import { hasPermission as checkPermission } from '../utils/permissionUtils.js';
export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Asumiendo que el rol del usuario está disponible en req.user
    console.log('userRole', userRole);
    console.log('requiredPermission', requiredPermission);

    if (requiredPermission.every(permission => checkPermission(userRole, permission))){
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};