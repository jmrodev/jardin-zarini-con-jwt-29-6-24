import express from 'express'
import authRoutes from './authRoutes.js'

const router = express.Router()


router.get('/routTest', (req, res) => {
  res.json({ message: 'Endpoint de prueba exitoso' })
})                   
router.use('/', authRoutes)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
export { router }
