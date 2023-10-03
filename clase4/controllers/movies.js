import { movieModel } from "../models/movie"

export class movieController{


    static async getAll(req, res){
        const { genre } = req.query
        const movies = await movieModel.getAll({genre})
        res.json(movies)
    }
}