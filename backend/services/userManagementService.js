import { UserRepository } from '../repositories/user-repository.js'
import { hashPassword, generateUniqueId } from '../utils/securityUtils.js'
import {
  validateUsername,
  validatePassword,
  validateEntries,
  checkIfUserExists,
} from '../validators/userValidators.js'

export async function createUser({ username, password, role }) {
  validateUsername(username)
  validatePassword(password)
  validateEntries(username, password, role)
  await checkIfUserExists(username)

  const hash = await hashPassword(password)
  const id = generateUniqueId()

  try {
    const newUser = await UserRepository.postUser({
      id,
      username,
      password: hash,
      role,
    })
    return {
      message: 'Usuario creado exitosamente',
      user: { id: newUser.id, username: newUser.username, role: newUser.role },
    }
  } catch (error) {
    console.error('Error en createUser:', error)
    throw new Error(`Error al crear el usuario: ${error.message}`)
  }
}
