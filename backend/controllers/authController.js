// controllers/authController.js
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository.js';
import { SECRET_JWT_KEY } from '../config/config.js';
import { createUser } from '../services/userService.js';

export const getAuthStatus = (req, res) => {
  console.log('sesion ', req.session);
  const { user } = req.session;
  res.json({ message: 'Auth routes working', user });
};

export const debugAuth = (req, res) => {
  res.json({ user: req.session.user });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        classRoom: user.classRoom,
      },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    );
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .send({ user });
    console.log('Token configurado correctamente:', token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const result = await createUser({ username, password, role });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('access_token').send('Logged out');
};
