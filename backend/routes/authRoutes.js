// routes/authRoutes.js
import express from 'express';
import {
  getAuthStatus,
  debugAuth,
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAuthStatus);
router.get('/debug', debugAuth);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

export default router;
