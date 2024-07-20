// routes/authRoutes.js
import express from 'express';
import logger from '../utils/logger.js';
import {
  getAuthStatus,
  debugAuth,
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';
import { jwtMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware de logging para todas las rutas de autenticación
router.use((req, res, next) => {
  logger.info(`Auth Route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas públicas
router.post('/login', (req, res, next) => {
  logger.info(`Login attempt for user: ${req.body.username}`);
  loginUser(req, res, next);
});

router.post('/register', (req, res, next) => {
  logger.info(`Registration attempt for user: ${req.body.username}`);
  registerUser(req, res, next);
});

router.get('/authTest', (req, res) => {
  logger.info('Auth test endpoint accessed');
  res.json({ message: 'Endpoint de prueba exitoso' });
});

// Middleware de autenticación JWT
router.use(jwtMiddleware);

// Rutas protegidas
router.get('/', (req, res, next) => {
  logger.info(`Auth status checked for user: ${req.user.username}`);
  getAuthStatus(req, res, next);
});

router.get('/debug', (req, res, next) => {
  logger.info(`Debug info requested for user: ${req.user.username}`);
  debugAuth(req, res, next);
});

router.post('/logout', (req, res, next) => {
  logger.info(`Logout attempt for user: ${req.user.username}`);
  logoutUser(req, res, next);
});

// Ruta protegida de prueba
router.get('/protectedTest', authorizeRoles('admin'), (req, res) => {
  logger.info(`Protected admin route accessed by user: ${req.user.username}`);
  res.send('You are an admin');
});

// Manejador de errores para rutas de autenticación
router.use((err, req, res, next) => {
  logger.error(`Auth Error: ${err.message}`, { 
    error: err, 
    user: req.user ? req.user.username : 'unauthenticated',
    route: req.originalUrl
  });
  res.status(err.status || 500).json({ error: err.message });
});

export default router;