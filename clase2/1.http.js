const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset= utf-8')

  if (req.url === '/') {
    res.end('<h1>Bienvenido a la página de inicio</h1>')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./logo-5-768x512.png', (err, data) => { // buffer de datos, data, lectura de datos binarios, img etc
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.setHeader('Charset', 'utf-8')
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listering on port http://localhost:${desiredPort}`)
})
// status code´s:
// 100-199: respuestas informaticas
// 200-299:respuestas satisfactorias 200 ok
// 300-399: redirecciones 301 moved premanently
// 400-499: errores del cliente 400 bad request 404 not found
// 500-599: errores del servidor 500 internal server error
// http.cat
