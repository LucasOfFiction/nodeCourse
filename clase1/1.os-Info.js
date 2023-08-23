//MODULOS NATIVOS
const os = require("node:os");

console.log("información del sistema operativo");
console.log("_________________________________");
console.log("Nombre del sistema operativo", os.platform());
console.log("Versión del sistema operativo", os.release());
console.log("Arquitectura", os.arch());
console.log("CPUs", os.cpus()); // <--- con esto podemos escalar procesos en node.js
console.log("Memoria libre", os.freemem() / 1024 / 1024);
console.log("Memoria total", os.totalmem() / 1024 / 1024);
console.log("Uptime", os.uptime() / 60 / 60);
