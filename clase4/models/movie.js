import { randomUUID } from 'node:crypto' //para generar un id único
import { readJSON } from '../utils.js'  //lógica de negocio-> poner en un archivo externo la lógica de la aplicación: filtros, orden, paginación, etc.
const movies = readJSON('../movies.json')  //por que una clase? lo interesante es que TENGA UN CONTRATO-> async await

export class movieModel{
    static getAll = async ({genre}) =>{ //de esta forma todos tienen que devolver una promesa -> router->get '/'
        if (genre) { 
            const filteredMovies = movies.filter(
              movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return res.json(filteredMovies)
        }
        return movies
    }

    static async  getPaginatedMovies (page, moviesPerPage){
        try {
            const startIndex = (page - 1) * moviesPerPage
            const endIndex = startIndex + moviesPerPage
            const paginatedMovies = movies.slice(startIndex, endIndex)
        } catch (error) {
            throw error
        }
    }

    static async getById({id}){
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async createMovie({input}){ //data es el body
        // en base de datos
        const newMovie = {
            id: randomUUID(), // uuid v4
            ...input
        }
        movies.push(newMovie)
    }

    static async deleteMovie({id}){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false
        movies.splice(movieIndex, 1)
        return true
    }

    static async updateMovie({id}, input){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false
        const movie = movies[movieIndex]
        const updatedMovie = {
            ...movie,
            ...input
        }
        movies[movieIndex] = updatedMovie
        return true
    }

}