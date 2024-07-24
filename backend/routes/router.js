import express from 'express'
import authRoutes from './authRoutes.js'
import studentRoutes from './studentRoutes.js'
import morgan from 'morgan'
import logger from '../utils/logger.js'

const router = express.Router()

router.use(morgan('combined', { stream: logger.stream }))

router.use('/api', studentRoutes )
router.use('/auth', authRoutes )

router.use((error, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )
 res.status(err.status || 500).json({
    error: 'Error del servidor',
    message: err.message
  });
})

export { router }
