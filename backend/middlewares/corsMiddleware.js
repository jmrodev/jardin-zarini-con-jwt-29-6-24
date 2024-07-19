import cors from 'cors'
const corsMiddleware = cors({
    origin: 'http://localhost:5173', // Ajusta esto según tu configuración
    credentials: true, // Permitir cookies entre dominios
  })

export { corsMiddleware }
