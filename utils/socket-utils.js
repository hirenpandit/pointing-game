import { io } from "socket.io-client";

let socket
export function init(){
    socket = io();

}

export function getSocket(){
    if(!socket){
        socket = io()
    }
    return socket
    
}