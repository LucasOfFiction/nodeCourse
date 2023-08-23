const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors"); //diferenciar siempre las dependencias del proyecto:  desarrollo, producción

const folder = process.argv[2] ?? ".";

async function ls(directory) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(pc.red(`No se pudo leer el directorio: ${folder}`));
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath); //status - informacion del archivo
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "d" : "f";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return ` ${pc.bgWhite(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize.toString().padStart(10)
    )} ${pc.yellow(fileModified)}`;
  });
  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}
ls(folder);
