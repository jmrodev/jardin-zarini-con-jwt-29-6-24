// routes/authRoutes.js
import express from 'express'
import logger from '../utils/logger.js'
import {
  getAuthStatusController,
  debugAuthController,
  loginUserController,
  registerUserController,
  logoutUserController,
} from '../controllers/authController.js'
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js'
import { authorize } from '../middlewares/authorizeRolesAndPermissions.js'
import { PERMISSIONS } from '../config/roles.js'
import { createStudentController } from '../controllers/studentController.js'

const router = express.Router()

// Middleware de logging para todas las rutas de autenticación
router.use((req, res, next) => {
  logger.info(`Auth Route accessed: ${req.method} ${req.originalUrl}`)
  next()
})

// Rutas públicas
router.post('/login', (req, res, next) => {
  logger.info(`Login attempt for user: ${req.body.username}`)
  loginUserController(req, res, next)
})

router.post('/register', (req, res, next) => {
  logger.info(`Registration attempt for user: ${req.body.username}`)
  registerUserController(req, res, next)
})

router.get('/authTest', (req, res) => {
  logger.info('Auth test endpoint accessed')
  res.json({ message: 'Endpoint de prueba exitoso' })
})

// Middleware de autenticación JWT
router.use(jwtMiddleware)

// Rutas protegidas
router.get('/protected', (req, res, next) => {
 logger.info(`Auth status checked for user: ${req.user.username}`)
  getAuthStatusController(req, res, next)
})

router.get('/debug', (req, res, next) => {
  logger.info(`Debug info requested for user: ${req.username}`)
  debugAuthController(req, res, next)
})

router.post('/logout', (req, res, next) => {
  logger.info(`Logout attempt for user: ${req.user.username}`)
  jwtMiddleware(req, res, next)
  logoutUserController(req, res, next)
})

// Ruta protegida de prueba
// Solo verificar rol
router.get('/protectedTest', authorize(['admin']),registerUserController, (req, res) => {
  logger.info(`Protected admin route accessed by user: ${req.user.username}`)
  res.send('You are an admin')
})

// Verificar rol y permisos específicos
router.post('/students', authorize(['admin', 'teacher'], [PERMISSIONS.CREATE_STUDENT]), createStudentController);
// Manejador de errores para rutas de autenticación
router.use((err, req, res, next) => {
  logger.error(`Auth Error: ${err.message}`, {
    error: err,
    user: req.user ? req.user.username : 'unauthenticated',
    route: req.originalUrl,
  })
  res.status(err.status || 500).json({ error: err.message })
})

export default router
