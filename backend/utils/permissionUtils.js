import { ROLE_PERMISSIONS} from '../config/roles.js';

// Función para verificar permisos
export function hasPermission(userRole, permission) {
    if (ROLE_PERMISSIONS[userRole]) {
        return ROLE_PERMISSIONS[userRole].includes(permission);
    }
    return false;
}

