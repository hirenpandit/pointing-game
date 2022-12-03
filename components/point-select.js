import {useEffect} from 'react'
import { updatePoints } from '../lib/request'
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'
import {useDispatch} from 'react-redux'
import { retrieveSession } from '../redux/actions/session'

const points = [1,2,3,5,8,13,21,'☕']
let socket

export default function PointSelect(){

    const dispatch = useDispatch()

    useEffect(()=>{
        socketInitializer()
    },[])

    const socketInitializer = async () => {
        const id = sessionStorage.getItem('id')
        await fetch(`/api/socket/${id}`)
        socket = io()

        socket.on('connect', () => {
            console.log(`connected`)
        })
        socket.emit('join', {id: id})
        socket.on('update-point', data=>{
            console.log(`points updated`)
            dispatch(retrieveSession(id))
            // if(player === data.name) {
            //     setPoint(data.point)
            // }
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

function savePoint(e) {
    const point = e.target.value
    const id = sessionStorage.getItem('id')
    const name = sessionStorage.getItem('name')
    updatePoints(id, name, point).then(res => {
        socket.emit('point-update', {id: id, name: name, point: point})
    })
}