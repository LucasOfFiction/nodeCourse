import express, { json } from 'express' // require -> commonJS
import { randomUUID } from 'node:crypto'
import cors from 'cors'


//importando json de movies -> no recomendable a priori
// import movies from './movies.json' assert { type: 'json' } //esta sintaxis no existe, ya cambió por eso los avisos de warning LA NUEVA SINTAXIS ES CON WITH EN LUGAR DE ASSERT:
// import movies from './movies.json' with { type: 'json' } 
import { validateMovie, validatePartialMovie } from './Schemas/movies.js'
import { readJSON } from './utils.js'

//importando json de movies -> doy muchas vueltas
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

//como leer json en ESMODULES por ahora... -> crear un requiere?
// import {createRequire} from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json') -> llevandolo a utils.js:
const movies = readJSON('./movies.json')

const app = express()
app.use(json())
// SOLUCIÓN CORS
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/page',(req,res)=>{
  const page = parseInt(req.query.page) || 1; // Convierte la cadena en un número y usa 1 como valor predeterminado si no se proporciona

  const moviesPerPage = 2; // Número de películas por página
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const paginatedMovies = movies.slice(startIndex, endIndex);

  res.json(paginatedMovies);
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})
// tengo un error y es que no logro que el mensaje de error sea un json
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newMovie = {
    id: randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

// app.options('/movies/id', (req, res) => {
//   const origin = req.headers.origin
//   if(ACCEPTED_ORIGINS.includes(origin || !origin)){
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.send(200)
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})