import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { SALTROUNDS } from '../config/config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  classRoom: { type: String }
})

export class UserRepository {
  static async create ({ username, password, role, classRoom }) {
    Validation.username(username)
    Validation.password(password)
    Validation.role(role)
    if (classRoom) Validation.classRoom(classRoom)

    const existingUser = User.findOne({ username })
    if (existingUser) {
      throw new Error('User already exists')
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS)

    const newUser = User.create({
      _id: id,
      username,
      password: hashedPassword,
      role,
      classRoom
    })
    newUser.save()

    const { password: _, ...publicUser } = newUser
    return publicUser
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) {
      throw new Error('User does not exist')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }

    const { password: _, ...publicUser } = user
    return publicUser
  }

  static async getById(id) {
    const user = User.findOne({ _id: id })
    if (!user) {
      throw new Error('User not found')
    }

    const { password: _, ...publicUser } = user
    return publicUser
  }

  static async getAll() {
    const users = User.find()
    return users.map(user => {
      const { password: _, ...publicUser } = user
      return publicUser
    })
  }

  static async update(id, updateData) {
    const user = User.findOne({ _id: id })
    if (!user) {
      throw new Error('User not found')
    }
    
    if (updateData.username) {
      Validation.username(updateData.username)
      const existingUser = User.findOne({ username: updateData.username })
      if (existingUser && existingUser._id !== id) {
        throw new Error('Username already taken')
      }
    }
    if (updateData.password) {
      Validation.password(updateData.password)
      updateData.password = await bcrypt.hash(updateData.password, SALTROUNDS)
    }
    if (updateData.role) Validation.role(updateData.role)
    if (updateData.classRoom) Validation.classRoom(updateData.classRoom)

    Object.assign(user, updateData)
    user.save()

    const { password: _, ...publicUser } = user
    return publicUser
  }

  static async delete(id) {
    const user = User.findOne({ _id: id })
    if (!user) {
      throw new Error('User not found')
    }
    User.deleteOne({ _id: id })
    return { message: 'User deleted successfully' }
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') {
      throw new Error('The username must be a string')
    }
    if (username.length < 3) {
      throw new Error('The username must be at least 3 characters long')
    }
    if (username.length > 30) {
      throw new Error('The username must not exceed 30 characters')
    }
  }

  static password(password) {
    if (typeof password !== 'string') {
      throw new Error('The password must be a string')
    }
    if (password.length < 8) {
      throw new Error('The password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('The password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('The password must contain at least one lowercase letter')
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('The password must contain at least one number')
    }
    if (!/[!@#$%^&*]/.test(password)) {
      throw new Error('The password must contain at least one special character (!@#$%^&*)')
    }
  }

  static role(role) {
    const validRoles = ['admin', 'directora', 'vicedirectora', 'preceptora', 'maestra', 'padre']
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role')
    }
  }

  static classRoom(classRoom) {
    if (typeof classRoom !== 'string') {
      throw new Error('The classRoom must be a string')
    }
    if (classRoom.length < 2 || classRoom.length > 20) {
      throw new Error('The classRoom must be between 2 and 20 characters long')
    }
    // Aquí puedes añadir más validaciones específicas para classRoom si es necesario
  }
}