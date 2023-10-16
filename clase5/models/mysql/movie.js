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
    const [movies] = await connection.query(
      `SELECT HEX(id) AS id, title, year, director, duration, poster, rate 
        FROM movie WHERE id= UNHEX(REPLACE(?, '-', ''));`,
        [id])
    if (movies.length === 0) return null

    return movies[0];
  }

  static async getPaginatedMovies ({ page, moviesPerPage}) {
    try {
      const offset = (page - 1) * moviesPerPage;
      const [movies] = await connection.query(`
        SELECT HEX(id) AS id, title, year, director, duration, poster, rate
        FROM movie
        LIMIT ? OFFSET ?;
      `, [moviesPerPage, offset]);
  
      return movies;
    } catch (error) {
      console.error('Error al obtener películas paginadas:', error);
      throw new Error('Error al obtener películas paginadas');
    }
  }

  static async create ({ input }) {
    
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query( 
        `INSERT INTO movie( id, title, year, director, duration, poster, rate) 
        VALUES(UNHEX(REPLACE("${uuid}", '-', '')), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      ) 
    } catch (e) {
      throw new Error('Error creating movie')
    }
    try {
      // Obtén el ID del género basado en genreInput
      const [genreQueryResult] = await connection.query(
        'SELECT id FROM genre WHERE name = ?;', [genreInput]
      );
  
      if (genreQueryResult.length > 0) {
        // Si se encuentra el género en la base de datos, asocia la película con el género en la tabla 'movie_genres'
        const [{ id: genreId }] = genreQueryResult;
  
        await connection.query(
          `INSERT INTO movie_genres(movie_id, genre_id)
          VALUES (UNHEX(REPLACE(?, '-', '')), ?);`,
          [uuid, genreId]
        );
      } else {
        // Si el género no existe en la base de datos, puedes manejarlo aquí
        console.error('El género no existe en la base de datos');
      }
    } catch (e) {
      throw new Error('Error creating movie');
    }
  

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, HEX(id) AS id
      FROM movie WHERE id= UNHEX(REPLACE(?, '-', ''));`,
      [uuid]
    )
    return movies[0]
    
  }

  static async delete ({ id }) {
    try {
      // Implementa la lógica para eliminar la película de la base de datos
      const result = await connection.query(
        'DELETE FROM movie WHERE id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      );
  
      if (result[0].affectedRows > 0) {
        // La película se eliminó exitosamente
        return 'Película eliminada con éxito';
      } else {
        // No se encontró una película con ese ID
        throw new Error('Película no encontrada');
      }
    } catch (error) {
      // Se produjo un error al eliminar la película
      throw new Error('Error al eliminar la película');
    }
  }

  static async update ({ id, input }) {
    try {
      // Verificar si la película con el ID proporcionado existe
      const [existingMovie] = await connection.query(
        'SELECT * FROM movie WHERE id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      );
  
      if (existingMovie.length === 0) {
        throw new Error('Película no encontrada');
      }
  
      const {
        title,
        year,
        director,
        duration,
        poster,
        rate,
      } = input;
  
      // Realizar la actualización de la película
      await connection.query(
        'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UNHEX(REPLACE(?, "-", ""));',
        [title, year, director, duration, poster, rate, id]
      );
  
      return 'Película actualizada con éxito';
    } catch (error) {
      throw new Error('Error al actualizar la película');
    }
  }
}