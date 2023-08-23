const path = require("node:path");
// barra separadora decarpetas segun SO
console.log(path.sep);
// unir rutas con path.join
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath);
// solo nombre del ficherp
const base = path.basename("/temp/secret/password.txt");
console.log(base);
// nombre del fichero sin la extensión
const filename = path.basename("/temp/secret/password.txt", ".txt");
console.log(filename);
// extension de archivos
const extension = path.extname("mysuper.image.jpg");
console.log(extension);
