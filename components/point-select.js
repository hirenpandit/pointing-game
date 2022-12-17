import {useEffect, useState} from 'react'
import { updatePoints } from '../lib/request'
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { retrieveSession } from '../redux/actions/session'
import Image from 'next/image'

const points = [1,2,3,5,8,13,21,-1]

export default function PointSelect(){
    const socket = io();
    const [isConnected, setIsConnected] = useState(socket.isConnected)

    const dispatch = useDispatch()

    useEffect(()=>{
        socketInitializer()

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        }
    },[])

    const socketInitializer = async () => {
        const id = sessionStorage.getItem('id')
        await fetch(`/api/socket/${id}`)

        socket.on('connect-error', (err) => {
            console.log(err)
        })

        socket.on('connect', () => {
            setIsConnected(true)
            socket.emit('join', {id: id})
        })
        
        socket.on('hello', data =>{
            console.log(data)
        })
        
        
        socket.on('update-point', data=>{
            dispatch(retrieveSession(id))
        })
    }

    return (
        <>  
            <div className={styles.selection}>
                <div className={styles.selectHeading}>Select Point</div>
                <div className={styles.point}>
                {
                    points.map(elem => {
                        return (
                            <button key={elem} onClick={e => savePoint(e, socket)} value={elem}>
                                { elem === -1 ?
                                        <Image src="/tea.png" width="50px" height="50px" alt='think'/>
                                    :
                                        elem
                                }
                            </button>
                        )
                    })
                }
                </div>
            </div>
        </>
    )

}

function savePoint(e, socket) {
    if(!e.target.value){
        return //TODO: implement need tea feature
    }
    const point = e.target.value
    const id = sessionStorage.getItem('id')
    const name = sessionStorage.getItem('name')
    updatePoints(id, name, point).then(res => {
        socket.emit('point-update', {id: id, name: name, point: point})
    })
}