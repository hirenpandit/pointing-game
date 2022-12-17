import { Server } from "socket.io"

export default async function handler(req, res) {

    if(req.socket.server.io) {
        console.log(`Socket is already running`)
        
    } else {
        console.log(`Socket is initializing`)
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('join', data=>{
                socket.join(data.id)
                socket.broadcast.emit('hello', 'hello, world') 
            })
            
            socket.on('point-update', data => {
                socket.to(data.id).emit('update-point', data)
            })

            socket.on('point-clear', id => {
                console.log(`point-clear fired ${id}`)
                socket.to(id).emit('clear-point', id)
            })
            
        })
        
    }

    res.end()
}