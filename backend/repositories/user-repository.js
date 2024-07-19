// repositories/userRepository.js
import bcrypt from 'bcrypt'
import UserSchema from '../models/userSchema.js'
import { hashPassword, generateUniqueId } from '../utils/securityUtils.js'
import {validateUsername, validatePassword} from '../validators/userValidators.js'
export class UserRepository {
  static async create(userData) {
    const { username, password, role } = userData
    validateUsername(username)
    validatePassword(password)
    const existingUser = await UserSchema.findOne({ username })
    if (existingUser) {
      throw new Error('Username already exists')
    }
    const hash = await hashPassword(password)
    const id = generateUniqueId()

    await UserSchema.create({
      _id: id,
      username,
      password: hash,
      role,
    }).save()

    return id
  }

  static async login(userData) {
    const { username, password } = userData

    const user = await UserSchema.findOne({ username })
    if (!user) {
      throw new Error('Username not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid password')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async getUser(username) {}

  static async getUsers() {}

  static async updateUser(username, data) {}

  static async deleteUser(username) {
    // Implementar la lógica para eliminar un usuario
  }
}
