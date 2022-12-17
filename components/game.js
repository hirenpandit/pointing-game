import styles from '../styles/Home.module.css'
import Point from './point'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import PointSelect from './point-select'
import {useSelector, useDispatch} from 'react-redux'
import { retrieveSession } from '../redux/actions/session'
import { clearPoints } from '../lib/request'

export default function Game(){
    const [show, setShow] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.session)

    useEffect(()=>{
        console.log(`re-rendering game`)
        getSessionDetails()
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
            dispatch(retrieveSession(id))
        }
    }

    const showhide = () => {
        setShow((prev) => {
            return !prev
        })
    }

    const clear = (id) => {
        clearPoints(id)
    }

    return( !data.loading &&
        <div className={styles.container}>
            <div className={styles.pointsview}>
                <div className={styles.selectionView}>
                    <div className={styles.title}>Get started by pointing stories !</div>
                    <div className={styles.title}>
                        {data.team}
                    </div>
                    <div className={styles.card}>
                        {
                            data.devs.map(
                                d => <Point key={d.name} 
                                            player={d.name} 
                                            point={d.point} 
                                            show={show}/>
                            )
                        }
                    </div>
                    <div className={styles.action}>
                        <button onClick={showhide}>Show</button>
                        <button onClick={(e) => clear(data._id)}>Reset</button>
                    </div>
                </div>
                <div className={styles.pointSelectionView}>
                    <PointSelect />
                </div> 
            </div>
        </div>
        
        
    )
                
}            
