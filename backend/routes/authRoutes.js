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

// Rutas protegidas
router.use(jwtMiddleware); // Aplica el middleware de autenticación JWT a las rutas protegidas
router.get('/', getAuthStatus);
router.get('/debug', debugAuth);
router.post('/logout', logoutUser);

export default router;
