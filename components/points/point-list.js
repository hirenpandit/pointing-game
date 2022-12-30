import Point from './point'
import {useEffect} from 'react'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import { retrieveSession } from '../../redux/actions/session'
import { clearPoints, showPoints } from '../../lib/request'
import socket from '../../utils/socket-utils'

export default function PointList(){
    const router = useRouter()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.session)

    useEffect(()=>{
        getSessionDetails()
        socketInitializer()
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        }
    },[])

    useEffect(()=>{
    },[data])

    const getSessionDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionid = urlParams.get('sessionid')
        const id = sessionStorage.getItem('id')
        if(id !== sessionid) {
            sessionStorage.setItem('id', sessionid)
            router.push({
                pathname: '/',
                query: {
                    sessionid: sessionid,
                }
            })
        } else {
            console.log(`dispatchng event to get the session: ${id}`)
            dispatch(retrieveSession(id))
        }
    }

    const socketInitializer = async () => {
        const id = sessionStorage.getItem('id')
        await fetch(`/api/socket/${id}`)

        socket.emit('join', {id: id})
        
        socket.on('update-point', data=>{
            dispatch(retrieveSession(data.id))
        })

        socket.on('clear-point', data=>{
            dispatch(retrieveSession(data.id))
        })

        socket.on('points-show', data => {
            dispatch(retrieveSession(data.id))
        })
    }

    const show = async (id) => {
       const res = await showPoints(id)
       console.log(res)
       socket.emit('show-points', {id: id})
       dispatch(retrieveSession(id))
    }

    const clear = async (id) => {
        const res = await clearPoints(id)
        console.log(res)
        socket.emit('point-clear', {id: id})
        dispatch(retrieveSession(id))
    }

    return( !data.loading &&
        <div className="card border-secondary mb-3">
            <div className='card-header'>
                {data.team}
            </div>
            <div className='card-body text-secondary'>
            <ul class="list-group list-group-flush">
                {
                    data.devs.map(
                        d => {
                            return <li class="list-group-item" key={d.name}>
                                        <Point key={d.name} 
                                        player={d.name} 
                                        point={d.point} 
                                        show={data.show}/>
                                   </li>
                        }
                    )
                }
            </ul>
                
                <div className='d-flex p-2 gap-1'>
                    <button className='btn btn-outline-success' onClick={() => show(data._id)}>Show</button>
                    <button className='btn btn-outline-danger' onClick={(e) => clear(data._id)}>Reset</button>
                </div>
            </div>
        </div>
    )
                
}            
