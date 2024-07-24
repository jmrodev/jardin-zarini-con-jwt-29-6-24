import { UserRepository } from '../repositories/user-repository.js'
import { hashPassword, generateUniqueId } from '../utils/securityUtils.js'
import {
  validateUsername,
  validatePassword,
  validateEntries,
  checkIfUserExists,
} from '../validators/userValidators.js'
import { PERMISSIONS, ROLES, ROLE_PERMISSIONS } from '../config/roles.js'

export async function createUserService({
  username,
  password,
  role,
  permissions,
}) {

  validateUsername(username)
  validatePassword(password)
  validateEntries(username, password, role, permissions)
  await checkIfUserExists(username)

  const hash = await hashPassword(password)
  const id = generateUniqueId()

  try {
    const newUser = await UserRepository.postUserRepository({
      _id: id,
      username,
      password: hash,
      role,
      permissions: permissions || ROLE_PERMISSIONS[role],
    })
    // Verifica si newUser es un array y toma el primer elemento si es así
    const user = Array.isArray(newUser) ? newUser[0] : newUser

    if (!user || !user._id || !user.username || !user.role || !user.permissions) {
      console.error('Propiedades faltantes en el usuario creado:', user)
      throw new Error(
        'El usuario creado no tiene todas las propiedades esperadas'
      )
    }

    return {
      message: 'Usuario creado exitosamente',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
      },
    }
  } catch (error) {
    console.error('Error en createUser:', error)
    throw new Error(`Error al crear el usuario: ${error.message}`)
  }
}
