import { UserRepository } from '../repositories/user-repository.js'
import { hashPassword, generateUniqueId } from '../utils/securityUtils.js'
import {
  validateUsername,
  validatePassword,
  validateEntries,
  checkIfUserExists,
} from '../validators/userValidators.js'

export async function createUserService({ username, password, role }) {
  validateUsername(username)
  validatePassword(password)
  validateEntries(username, password, role)
  await checkIfUserExists(username)

  const hash = await hashPassword(password)
  const id = generateUniqueId()

  try {
    const newUser = await UserRepository.postUserRepository({
      _id: id,
      username,
      password: hash,
      role,
    })
    console.log('Usuario creado exitosamente:', newUser)
    // Verifica si newUser es un array y toma el primer elemento si es así
    const user = Array.isArray(newUser) ? newUser[0] : newUser

    if (!user || !user._id || !user.username || !user.role) {
      console.error('Propiedades faltantes en el usuario creado:', user);
      throw new Error('El usuario creado no tiene todas las propiedades esperadas');
    }

     
    return {
      message: 'Usuario creado exitosamente',
      user: { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      },
     
    }
  } catch (error) {
    console.error('Error en createUser:', error)
    throw new Error(`Error al crear el usuario: ${error.message}`)
  }
}
