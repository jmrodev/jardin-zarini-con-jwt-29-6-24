// routes/authRoutes.js
import express from 'express';
import {
  getAuthStatus,
  debugAuth,
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';
import { jwtMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/authTest', (req, res) => {
  res.json({ message: 'Endpoint de prueba exitoso' });
});

// Middleware de autenticación JWT
router.use(jwtMiddleware); // Aplica el middleware de autenticación JWT a las rutas protegidas

// Rutas protegidas
router.get('/', getAuthStatus);
router.get('/debug', debugAuth);
router.post('/logout', logoutUser);

// Ruta protegida de prueba
router.get('/protectedTest', authorizeRoles('admin'), (req, res) => {
  res.send('You are an admin');
});

export default router;


