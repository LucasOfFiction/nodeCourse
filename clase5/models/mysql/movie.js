import mysql2 from 'mysql2/promise' 

const config = {
    host:'localhost',
    user:'root',
    port: 3306,
    password:'',
    database:'moviesdb'
}

const connection = await mysql2.createConnection(config);

export class movieModel {
  static async getAll ({ genre }) {
    
    if (genre) {
      //discrimino mayusculas y minusculas
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )
        // si no tengo peliculas con ese genero, retorno un array vacio
      if (genres.length === 0) return []
        // el id de las películas es igual al de los generos(tablas en mysql)
      const [{ id }] = genres
        // petición donde declado los JOIN o relaciones entre las tablas movie y genre para filtrar por género la snetencia WHERE
      const [movies] = await connection.query(`
        SELECT HEX(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate
        FROM movie AS m
        JOIN movie_genres AS mg ON m.id = mg.movie_id
        JOIN genre AS g ON mg.genre_id = g.id
        WHERE g.name = ?;
      `, [lowerCaseGenre])
        // devuelvo array de películas
      return movies

    }else{
      // de lo contrario si no coloco el query param en la url me devuelve todas las películas
      const [movies] = await connection.query('SELECT HEX(id) AS id, title, year, director, duration, poster, rate FROM movie;')
      //"SELECT HEX(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie AS m JOIN movie_genres AS mg ON m.id = mg.movie_id JOIN genre AS g ON mg.genre_id = g.id WHERE g.name = `genre`;")
      return movies
    }
  }


  static async getById ({ id }) {

  }

  static async create ({ input }) {
    
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {
    
  }
}