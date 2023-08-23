const fs = require("node:fs");
const { promisify } = require("node:util");

console.log("leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log("primer texto:", text);
});

console.log("hacer cosas mientras lee los archivos...");

console.log("leyendo el segundo archivo...");
fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log("segundo texto:", text);
});
