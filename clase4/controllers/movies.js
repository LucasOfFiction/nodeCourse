import { movieModel } from "../models/local-file-system/movie.js"
import { validateMovie, validatePartialMovie } from '../Schemas/movies.js'

export class movieController{


    static async getAll(req, res){
        const { genre } = req.query
        const movies = await movieModel.getAll({genre})
        res.json(movies)
    }

    static async getPaginatedMovies(req,res){
        try {
            const page = parseInt(req.query.page) || 1; // Convierte la cadena en un número y usa 1 como valor predeterminado si no se proporciona
            const moviesPerPage = 2; // Número de películas por página
            const paginatedMovies = await movieModel.getPaginatedMovies(page, moviesPerPage)
            res.json(paginatedMovies);
            
        } catch (error) {
            throw error
        }
    }

    static async getById (req, res){
        const { id } = req.params
        const movie = await movieModel.getById({id})
        if (movie) return res.json(movie)
        res.status(404).json({ message: 'Movie not found' })
    }

    static async create(req, res){
        const result = validateMovie(req.body)
    
        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newMovie = await movieModel.create({input:result.data})
        res.status(201).json(newMovie)
    }

    static async delete(req, res){
        const { id } = req.params
        const result = await movieModel.delete({id})
        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }
        return res.json({ message: 'Movie deleted' })
    }

    static async update(req, res){
        const result = validatePartialMovie(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updatedMovie = await movieModel.update({id, input: result.data}) 
        return res.json({ updatedMovie})
    }
}