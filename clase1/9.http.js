const http = require("node:http");
const { findAvailablePort } = require("./10.free-port");
const desiredPort = process.env.PORT ?? 3000;
const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("hola mundo");
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listering on port http://localhost:${port}`);
  });
});

console.log(process.env);

// server.listen(3000, () => {
//   // al usar el puerto 0 utilizará automaticamente uno que tengas libre console.log (`$(server.address().port`))
//   console.log("server listering on port 3000");
// });
// en shell para enviar mi variable de entorno: $env:PORT=1234; node 9.http.js
// see alternatives to dotenv
