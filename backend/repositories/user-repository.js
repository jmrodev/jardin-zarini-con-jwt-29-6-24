import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { SALTROUNDS } from '../config/config.js'
// este archivo es el repositorio de usuarios, se encarga de manejar la lógica de la base de datos
// segun que base de datos se use, se debe importar el modulo correspondiente
// y adaptar el codigo para que funcione con la base de datos que se este utilizando

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  classRoom: { type: String },
})

export class UserRepository {
  // Se utiliza static porque encapsula y no es necesario crear instancias nuevas  de las clases
  static async create(username, password, role) {
    //validaciones
    // if (typeof username !== 'string')
    //   throw new Error('username must be a string')
    if (username.length < 3)
      throw new Error('username must be at least 3 characters long ')

    // verificar si no existe el username
    const user = await  User.findOne({ username })
    if (user) throw new Error('username already exists')

    // encriptar la contraseña
    const hash = await bcrypt.hash(password, SALTROUNDS)

    //si la base de datos no genera id unicos
    const id = crypto.randomUUID()

    await User.create({
      _id: id,
      username,
      password : hash,
      role,
    }).save()

    return id
  }

  // metodos para agregar en el futuro
  async getUser(username) {}
  async getUsers() {}
  async updateUser(username, data) {}
  async deleteUser(username) {}
}
