import { SERVER_URL } from '../config/config.js'
import cors from 'cors'
const corsMiddleware = cors({
    origin: SERVER_URL , // Ajusta esto según tu configuración
    credentials: true, // Permitir cookies entre dominios
  })

export { corsMiddleware }
