import {useState, useEffect} from 'react'
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'


export default function Point({player, pts, show}){

    let socket
    const [point, setPoint] = useState(pts)

    useEffect(()=>{
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log(`connected`)
        })

        socket.on('update-point', point=>{
            console.log(`point updated to: ${point}`)
            setPoint(point)
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
