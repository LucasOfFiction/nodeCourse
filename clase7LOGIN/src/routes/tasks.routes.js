import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"

const router = Router()

router.get('/tasks', authRequired, (req, res) => res.send('Welcome to my API'))

export default router