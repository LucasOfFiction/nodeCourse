//MODULOS NATIVOS
// puedo importarlos mediante commonjs o mjs:
import {
  platform,
  release,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime,
} from "node:os";

console.log("información del sistema operativo");
console.log("_________________________________");

console.log("Nombre del sistema operativo", platform());
console.log("Versión del sistema operativo", release());
console.log("Arquitectura", arch());
console.log("CPUs", cpus()); // <--- con esto podemos escalar procesos en node.js
console.log("Memoria libre", freemem() / 1024 / 1024);
console.log("Memoria total", totalmem() / 1024 / 1024);
console.log("Uptime", uptime() / 60 / 60);
// las extensiones de ecmascript modules es parte de la especificacion, obligatoria
