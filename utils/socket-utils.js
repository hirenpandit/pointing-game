import { io } from "socket.io-client"
const socket = io('ws://pointing-game.vercel.app/', {
    transports: ['websocket'],
    reconnection: true
})

socket.on('connect-error', (err) => {
    console.log(err)
})

socket.on('connect', () => {
    console.log(`socket connected`)
})

socket.on('hello', data =>{
    console.log(data)
})

export default socket