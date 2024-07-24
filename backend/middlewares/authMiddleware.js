import { hasPermission as checkPermission } from '../utils/permissionUtils.js';
export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (requiredPermission.every(permission => checkPermission(userRole, permission))){
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};