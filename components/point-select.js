import {useEffect, useState} from 'react'
import { updatePoints } from '../lib/request'
import {useDispatch} from 'react-redux'
import socket from '../utils/socket-utils'
import { retrieveSession } from '../redux/actions/session'

const points = [1,2,3,5,8,13,21]

export default function PointSelect(){
    const dispatch = useDispatch()

    useEffect(()=>{
    },[])

    return (
        <>  
            <div className='grid gap-2'>
                <div className='p-2 g-col-6'>Select Point</div>
                <div className='col'>
                {
                    points.map(elem => {
                        return (
                            <button key={elem} 
                                    className='m-1 col-1 btn btn-outline-dark'
                                    onClick={e => savePoint(e, dispatch)} 
                                    value={elem}>
                                        {elem}
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