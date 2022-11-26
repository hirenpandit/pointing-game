import {useState, useEffect} from 'react'
import { updatePoints } from '../lib/request'
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'

let socket

function savePoint(e) {
    const point = e.target.value
    const id = sessionStorage.getItem('id')
    const name = sessionStorage.getItem('name')
    updatePoints(id, name, point)
        .then(res => console.log(res))

    socket.emit('point-update', point)

}

const points = [1,2,3,5,8,13,21,'☕']

export default function PointSelect(){

    useEffect(()=>{
        socketInitializer()
    },[])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log(`connected`)
        })
    }

    return (
        <>  
            <div className={styles.selection}>
                <div className={styles.selectHeading}>Select Point</div>
                <div className={styles.point}>
                {
                    points.map(elem => {
                        return <button key={elem} onClick={savePoint} value={elem}>{elem}</button>
                    })
                }
                </div>
            </div>
        </>
    )

}