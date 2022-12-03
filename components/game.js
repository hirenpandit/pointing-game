import styles from '../styles/Home.module.css'
import Point from './point'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import PointSelect from './point-select'
import {useSelector, useDispatch} from 'react-redux'
import { retrieveSession } from '../redux/actions/session'

export default function Game(){
    const [show, setShow] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.session)

    useEffect(()=>{
        console.log(`re-rendering game`)
        getSessionDetails()
    },[])

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

    const clear = () => {
        console.log(`clearing`)
    }

    return( !data.loading && 
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
                                        pts={d.point} 
                                        show={show}
                                        id={data._id}/>
                        )
                    }
                </div>
                <div className={styles.action}>
                    <button onClick={showhide}>Show</button>
                    <button onClick={clear}>Reset</button>
                </div>
            </div>
            <div className={styles.pointSelectionView}>
                <PointSelect />
            </div> 
        </div>
        
    )
                
}            
