import { Server } from "socket.io"

export default async function handler(req, res) {
    if(req.socket.server.io) {
        console.log(`Socket is already running`)
    } else {
        console.log(`Socket is initializing`)
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('point-update', msg => {
                socket.broadcast.emit('update-point', msg)
            })
        })
    }

    res.end()
}