import DBLocal from 'db-local';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from '../config/config.js';

// Inicializa DBLocal con el directorio de la base de datos
const { Schema } = new DBLocal({ path: './db' });

// Define el esquema de usuario
const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  classRoom: { type: String },
});

export class UserRepository {
  // Método para crear un nuevo usuario
  static async create(userData) {
    const { username, password, role } = userData;

    // Validaciones
    const passwordRegexp = '^[A-Za-z\\d$@$!%*?&]+$';
    const userNameRegexp = '^[A-Za-z]+$';

    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a valid string');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (password.match(passwordRegexp) === null) {
      throw new Error('Password must contain only letters, numbers, and some special characters without spaces');
    }

    if (username.match(userNameRegexp) === null) {
      throw new Error('Username must contain only letters');
    }

    // Verificar si el username ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Encriptar la contraseña
    const hash = await bcrypt.hash(password, SALTROUNDS);

    // Generar un ID único
    const id = crypto.randomUUID();

    // Crear y guardar el nuevo usuario
    await User.create({
      _id: id,
      username,
      password: hash,
      role,
    }).save();

    return id;
  }

  // Método para login de usuario
  static async login(userData) {
    const { username, password } = userData;

    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Username not found');
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Devolver los datos del usuario (excluyendo la contraseña)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Método para obtener un usuario por username (por implementar)
  static async getUser(username) {
    // Implementar la lógica para obtener un usuario por su nombre de usuario
  }

  // Método para obtener todos los usuarios (por implementar)
  static async getUsers() {
    // Implementar la lógica para obtener todos los usuarios
  }

  // Método para actualizar un usuario (por implementar)
  static async updateUser(username, data) {
    // Implementar la lógica para actualizar un usuario
  }

  // Método para eliminar un usuario (por implementar)
  static async deleteUser(username) {
    // Implementar la lógica para eliminar un usuario
  }
}
