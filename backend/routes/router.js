import express from 'express'
import authRoutes from './authRoutes.js'
import morgan from 'morgan'
import logger from '../utils/logger.js'

const router = express.Router()

router.use(morgan('combined', { stream: logger.stream }))

router.get('/routTest', (req, res) => {
  logger.info('Endpoint de prueba exitoso')

  res.json({ message: 'Endpoint de prueba exitoso' })
})

router.use('/', authRoutes)

router.use((error, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )
  res.status(err.status || 500).send('Error del servidor')
})

export { router }
