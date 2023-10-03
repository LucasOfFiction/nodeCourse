import express, { json } from 'express' // require -> commonJS
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
//los import de un json en el futuro se van a poder hacer así:
//import movies from './movies.json' with {type: 'json'}

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE
// CORS PRE-Flight
// OPTIONS
app.use('/movies', moviesRouter)
const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})