import styles from '../styles/Home.module.css'
import Point from './point'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { getSession } from '../lib/request'
import PointSelect from './point-select'

export default function Game(props){
    const [devs, setDevs] = useState([])
    const [show, setShow] = useState(false)
    const [team, setTeam] = useState("")
    const router = useRouter()

    useEffect(()=>{
        validateRequest()
    },[])

    const validateRequest = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionid = urlParams.get('sessionid');
        if (!sessionid) { //check if session id is present in the query param
            router.push('/')
        }
        const session = await getSession(sessionid)
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
            const names = session.devs.map(dev => {
                return {
                    name: dev.name,
                    point: dev.point ? dev.point : 0,
                }
            })
            setDevs(names)
            setTeam(session.team)
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

    return( devs && 
        <div className={styles.pointsview}>
            <div className={styles.selectionView}>
                <div className={styles.title}>Get started by pointing stories !</div>
                <div className={styles.title}>
                    {team}
                </div>
                <div className={styles.card}>
                    {
                        devs.map(d => <Point key={d.name} player={d.name} point={d.point} show={show}/>)
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
