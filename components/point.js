import {useState, useEffect} from 'react'
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'


export default function Point({player, pts, show, id}){

    let socket
    const [point, setPoint] = useState(pts)

    useEffect(()=>{
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        console.log(`connecting at socket url: /api/socket/${id}`)
        await fetch(`/api/socket/${id}`)
        socket = io()

        socket.on('connect', () => {
            console.log(`connected`)
        })

        socket.emit('join', {id: id})

        socket.on('update-point', data=>{
            if(player === data.name) {
                setPoint(data.point)
            }
        })
    }
    
    

    return(
        <>
            <div className={styles.grid}>
                <div className={styles.name}>{player}</div>
                {show && 
                    <button className={styles.pointbtn}>{point}</button>
                }
                {!show && 
                    <button className={styles.pointbtn}></button>
                }
            </div>
            
        </>
    )
}
