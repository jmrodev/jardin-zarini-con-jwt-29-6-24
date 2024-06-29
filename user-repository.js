import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { SALTROUNDS } from './config.js'

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

    const user = User.findOne({ username })
    if (user) {
      throw new Error('User already exists')
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword,
      role,
      classRoom
    }).save()

    return id
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
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') {
      throw new Error('The username must be a string')
    }
    if (username.length < 3) {
      throw new Error('The username must be at least 3 characters long')
    }
  }

  static password(password) {
    if (typeof password !== 'string') {
      throw new Error('The password must be a string')
    }
    if (password.length < 3) {
      throw new Error('The password must be at least 3 characters long')
    }
  }

  static role(role) {
    const validRoles = ['admin', 'directora', 'vicedirectora', 'preceptora', 'maestra', 'padre']
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role')
    }
  }
}