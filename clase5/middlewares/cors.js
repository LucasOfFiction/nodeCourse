import cors from 'cors'
//LOS ORIGINES EXTERNAMENTE POR EJEMPLO PARA UN FILE .ENV
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'
]

// se ejecuta cors al ejecutar una funcion () ya que es interesante en este poder utilizar ({options}) como hosts, ACCEPTED_ORIGINS, etc
export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
  
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  })