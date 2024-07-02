import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './user-repository.js';
import { StudentRepository } from './student-repository.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',  // Ajusta esto según tu configuración
  credentials: true  // Permitir cookies entre dominios
}));

app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY);
      req.session.user = data;
      console.log('Usuario autenticado:', req.session.user);  // Registro para depuración
    } catch (error) {
      console.log('Token inválido:', error.message);  // Registro para depuración
    }
  } else {
    console.log('No token provided');
  }
  next();
});

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      console.log('Usuario no autenticado');  // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    if (!roles.includes(req.session.user.role)) {
      console.log(`Rol no autorizado: ${req.session.user.role}`);  // Registro para depuración
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};

app.get('/', (req, res) => {
  const { user } = req.session;
  res.render('index', { user });
});

app.get('/debug', (req, res) => {
  res.json({ user: req.session.user });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, classRoom: user.classRoom },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    );
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      .send({ user });
    console.log('Token configurado correctamente:', token);  // Registro para depuración
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// Eliminamos la autorización en la ruta de registro para permitir el registro sin autenticación previa
app.post('/register', async (req, res) => {
  const { username, password, role, classRoom } = req.body;

  try {
    const id = await UserRepository.create({ username, password, role, classRoom });
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').send('Logged out');
});

app.get('/protected', authorize(['admin', 'directora', 'vicedirectora', 'preceptora', 'maestra']), (req, res) => {
  res.render('protected', req.session.user);
});

app.get('/alumnos', authorize(['admin', 'directora', 'vicedirectora', 'preceptora']), async (req, res) => {
  const alumnos = await StudentRepository.getAll();
  res.json(alumnos);
});

app.put('/alumnos/:id', authorize(['admin', 'preceptora', 'maestra']), async (req, res) => {
  const alumno = await StudentRepository.getById(req.params.id);
  if (req.session.user.role === 'maestra' && req.session.user.classRoom !== alumno.classRoom) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const updatedAlumno = await StudentRepository.update(req.params.id, req.body);
  res.json(updatedAlumno);
});

app.get('/mis-hijos', authorize(['padre']), async (req, res) => {
  const hijos = await StudentRepository.getByParentId(req.session.user.id);
  res.json(hijos);
});

app.put('/mis-hijos/:id', authorize(['padre']), async (req, res) => {
  const hijo = await StudentRepository.getById(req.params.id);
  if (hijo.classRoom !== 'sala3') {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const updatedHijo = await StudentRepository.update(req.params.id, req.body);
  res.json(updatedHijo);
});

app.post('/alumnos', authorize(['admin', 'preceptora', 'maestra']), async (req, res) => {
  if (req.session.user.role === 'maestra') {
    if (req.body.classRoom !== req.session.user.classRoom || req.body.classRoom === 'sala3') {
      return res.status(403).json({ message: 'No autorizado' });
    }
  }
  const newAlumno = await StudentRepository.create(req.body);
  res.status(201).json(newAlumno);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
