import { Server } from "socket.io"

let io

export default async function handler(req, res) {

    if(req.socket.server.io) {
        console.log(`Socket is already running`)
    } else {
        io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('join', data=>{
                socket.join(data.id)
                socket.broadcast.emit('hello', 'hello, world') 
            })
            
            socket.on('point-update', data => {
                socket.to(data.id).emit('update-point', data)
            })

            socket.on('point-clear', data => {
                socket.to(data.id).emit('clear-point', data)
            })

            socket.on('show-points', data => {
                socket.to(data.id).emit('points-show', data)
            })
            
        })
        
    }

    res.end()
}