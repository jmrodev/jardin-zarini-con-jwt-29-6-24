import express from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository.js';
import { SECRET_JWT_KEY } from '../config/config.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log("sesion ",req.session);
  const { user } = req.session;
  res.render('index', { user });
});

router.get('/debug', (req, res) => {
  res.json({ user: req.session.user });
});

router.post('/login', async (req, res) => {
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
    console.log('Token configurado correctamente:', token); // Registro para depuración
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post('/register', async (req, res) => {
  const { username, password, role, classRoom } = req.body;

  try {
    const id = await UserRepository.create({
      username,
      password,
      role,
      classRoom,
    });
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('access_token').send('Logged out');
});

export default router;
