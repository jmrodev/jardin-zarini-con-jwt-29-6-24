// routes/authRoutes.js
import express from 'express';
import logger from '../utils/logger.js';
import {
  loginUserController,
  createUserController,
  logoutUserController,
} from '../controllers/userController.js';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import studentRoutes from './studentRoutes.js';
import articleRoutes from './articleRoutes.js';

const router = express.Router();

// Middleware de logging para todas las rutas de autenticación
router.use((req, res, next) => {
  logger.info(`Auth Route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas públicas
router.post('/login', (req, res, next) => {
  logger.info(`Login attempt for user: ${req.body.username}`);
  loginUserController(req, res, next);
});

router.post('/register', (req, res, next) => {
  logger.info(`Registration attempt for user: ${req.body.username}`);
  createUserController(req, res, next);
});

// Middleware de autenticación JWT
router.use(jwtMiddleware);

// Rutas protegidas
router.use('/api/students', studentRoutes);
router.use('/api/articles', articleRoutes);

router.post('/logout', (req, res, next) => {
  logger.info(`Logout attempt for user: ${req.user.username}`);
  logoutUserController(req, res, next);
});

export default router;
