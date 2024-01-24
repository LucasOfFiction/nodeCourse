import  app  from "./app.js";
import { connectDB } from "./db.js";


app.listen(3000)
connectDB()
console.log('listening on port 3000')