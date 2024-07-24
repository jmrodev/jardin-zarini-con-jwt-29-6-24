// validators/userValidators.js
import UserSchema from '../models/userSchema.js'

export function validateUsername(username) {
  const userNameRegexp = '^[A-Za-z]+$'
  if (!username || username.length < 3) {
    throw new Error('Username must be at least 3 characters long')
  }
  if (username.match(userNameRegexp) === null) {
    throw new Error('Username must contain only letters')
  }
}

export function validatePassword(password) {
  const passwordRegexp = '^[A-Za-z\\d$@$!%*?&]+$'
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a valid string')
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long')
  }
  if (password.match(passwordRegexp) === null) {
    throw new Error(
      'Password must contain only letters, numbers, and some special characters without spaces'
    )
  }
}

export function validateEntries(username, password, role, permissions) {
  console.log('datos ', username, password, role, permissions)
  if (!username || !password || !role || !permissions) {
    throw new Error(
      'Todos los campos son obligatorios: username, password, role y permissions'
    )
  }
}

export function checkIfUserExists(username) {
  const existingUser = UserSchema.findOne({ username })
  if (existingUser) {
    throw new Error('Username already exists !!')
  }
}
