import express from 'express'
import authRoutes from './authRoutes.js'

const router = express.Router()

router.use('/', authRoutes)
router.get('/test', (req, res) => {
  res.json({ message: 'Endpoint de prueba exitoso' })
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
export { router }
