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
                console.log(`joinded: ${data.id}`)
            })
            socket.on('point-update', data => {
                socket.to(data.id).emit('update-point', data)
            })
            
        })
        
    }

    res.end()
}