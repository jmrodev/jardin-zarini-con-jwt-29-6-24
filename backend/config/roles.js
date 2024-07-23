// config/roles.js
export const ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    PARENT: 'parent',
  };
  
  export const PERMISSIONS = {
    CREATE_STUDENT: 'create:student',
    READ_STUDENT: 'read:student',
    UPDATE_STUDENT: 'update:student',
    DELETE_STUDENT: 'delete:student',
    MANAGE_USERS: 'manage:users',
    // ... otros permisos
  };
  
  export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
      PERMISSIONS.CREATE_STUDENT,
      PERMISSIONS.READ_STUDENT,
      PERMISSIONS.UPDATE_STUDENT,
      PERMISSIONS.DELETE_STUDENT,
      PERMISSIONS.MANAGE_USERS,
    ],
    [ROLES.TEACHER]: [
      PERMISSIONS.CREATE_STUDENT,
      PERMISSIONS.READ_STUDENT,
      PERMISSIONS.UPDATE_STUDENT,
    ],
    [ROLES.PARENT]: [
      PERMISSIONS.READ_STUDENT,
    ],
  };