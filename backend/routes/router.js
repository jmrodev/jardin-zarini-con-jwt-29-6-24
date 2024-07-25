import express from 'express'
import authRoutes from './authRoutes.js'
import studentRoutes from './studentRoutes.js'
import morgan from 'morgan'
import logger from '../utils/logger.js'

const router = express.Router()

router.use(morgan('combined', { stream: logger.stream }))
router.use('/auth', authRoutes )

router.use((error, req, res, next) => {
  logger.error(
    `${error.status || 500} - ${error.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )
 res.status(error.status || 500).json({
    error: 'Error del servidor',
    message: error.message
  });
})

export { router }
