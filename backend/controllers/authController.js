// controllers/authController.js
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user-repository.js'
import { SECRET_JWT_KEY } from '../config/config.js'
import { createUser } from '../services/userService.js'
import  logger  from '../utils/logger.js'


export const getAuthStatus = (req, res) => {
  
  const { user } = req.user
  res.json({ message: 'Auth routes working', user ,
    accessToken: req.cookies.access_token,
  })
}

export const debugAuth = (req, res) => {
  res.json({ user: req.user })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.loginUser({ username, password })
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        classRoom: user.classRoom,
      },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .send({ user })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body

  try {
    const result = await createUser({ username, password, role })
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


export const logoutUser = async (req, res) => {
  console.log(req.cookies.access_token);
  try {
    // Verifica si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'No authenticated user found' });
    }

    const { username } = req.user;

    // Registra el intento de logout
    logger.info(`Logout attempt for user: ${username}`);

    // Limpia la cookie del token
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Envía una respuesta exitosa
    res.status(200).json({ 
      message: 'Logout successful',
      redirectUrl: '/login',
      clearLocalStorage: true
    });

    // Registra el logout exitoso
    logger.info(`User logged out successfully: ${username}`);

  } catch (error) {
    // Registra el error
    logger.error(`Error during logout for user: ${req.user?.username || 'unknown'}`, { error });

    // Envía una respuesta de error
    res.status(500).json({ 
      message: 'Error during logout process',
      error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : error.message
    });
  }
  console.log("sin cookie", req.cookies.access_token);
};
