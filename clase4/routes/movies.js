import {Router} from 'express'
import { validateMovie, validatePartialMovie } from '../Schemas/movies.js'

import { movieModel } from '../models/movie.js'
import { movieController } from '../controllers/movies.js'

const movies = readJSON('../movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', movieController.getAll),

moviesRouter.get('/page', async (req,res)=>{
    const page = parseInt(req.query.page) || 1; // Convierte la cadena en un número y usa 1 como valor predeterminado si no se proporciona
    const moviesPerPage = 2; // Número de películas por página
    const paginatedMovies = await movieModel.getPaginatedMovies(page, moviesPerPage)
    res.json(paginatedMovies);
}),

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const movie = await movieModel.getById({id})
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
}),

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await movieModel.createMovie({input:result.data})
    res.status(201).json(newMovie)
}),

moviesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await movieModel.deleteMovie({id})
    if (result === false) {
        return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json({ message: 'Movie deleted' })
}),

moviesRouter.patch('/:id', async (req, res) => {
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedMovie = await movieModel.updateMovie({id, input: result.data}) 
    return res.json({ updatedMovie})
})
