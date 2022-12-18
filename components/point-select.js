import {useEffect, useState} from 'react'
import { updatePoints } from '../lib/request'
import styles from '../styles/Home.module.css'
import {useDispatch} from 'react-redux'
import Image from 'next/image'
import socket from '../utils/socket-utils'
import { retrieveSession } from '../redux/actions/session'

const points = [1,2,3,5,8,13,21,-1]

export default function PointSelect(){
    const dispatch = useDispatch()

    useEffect(()=>{
    },[])

    return (
        <>  
            <div className={styles.selection}>
                <div className={styles.selectHeading}>Select Point</div>
                <div className={styles.point}>
                {
                    points.map(elem => {
                        return (
                            <button key={elem} onClick={e => savePoint(e, dispatch)} value={elem}>
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

function savePoint(e, dispatch) {
    if(!e.target.value){
        return //TODO: implement need tea feature
    }
    const point = e.target.value
    const id = sessionStorage.getItem('id')
    const name = sessionStorage.getItem('name')
    updatePoints(id, name, point).then(res => {
        socket.emit('point-update', {id: id, name: name, point: point})
        dispatch(retrieveSession(id))
    })
}