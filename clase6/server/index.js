import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'http'

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server,{
    connectionStateRecovery: {}
})

io.on('connection', (socket) => {
    console.log('new connection')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html') //current work diorectory, donde se esta ejecutando el script
})

server.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})
