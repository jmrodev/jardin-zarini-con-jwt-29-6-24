import express from 'express';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);

export { router };
