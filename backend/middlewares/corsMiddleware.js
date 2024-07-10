import cors from 'cors'

const corsMiddleware = (
    cors({
      origin: 'http://localhost:3000', // Ajusta esto según tu configuración
      credentials: true, // Permitir cookies entre dominios
    })
  )
export { corsMiddleware }
