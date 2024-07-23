/* The UserRepository class provides methods for interacting with user data in a MongoDB database,
including creating, updating, deleting, and retrieving user information. */
// repositories/user-repository.js
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'

export class UserRepository {
  static async postUserRepository(userData) {
    const newUser = User.create(userData)
    await newUser.save()
    // Intentamos obtener el usuario recién creado
    const createdUser = User.findOne({ _id: userData._id }) 
  
    return createdUser
  }

  static async loginUserRepository(userData) {
    const { username, password } = userData

    const user = User.findOne({ username })
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

  static async getUserRepository(username) {
    const user = User.find({ username })
    if (!user) {
      throw new Error('User not found')
    }
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async getUsersRepository() {
    const users = User.find()
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
  }

  static async updateUserRepository(username, data) {
    const user = User.find({ username })
    if (!user) {
      throw new Error('User not found')
    }
    Object.assign(user, data)
    await user.save()
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async deleteUserRepository(username) {
    const user = User.find({ username })
    if (!user) {
      throw new Error('User not found')
    }
    await User.remove({ username })
    return { message: 'User deleted successfully' }
  }
}
