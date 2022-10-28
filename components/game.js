import styles from '../styles/Home.module.css'
import Point from './point'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

export default function Game(props){
    const [devs, setDevs] = useState([])
    const [show, setShow] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        validateRequest()
    },[])

    const validateRequest = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionid = urlParams.get('sessionid');
        if (!sessionid) { //check if session id is present in the query param
            router.push('/')
        }

        const id = sessionStorage.getItem('id')
        console.log(`session detail id: ${id} team: ${sessionStorage.getItem('team')} name: ${sessionStorage.getItem('name')}`)
        if(id !== sessionid) {
            sessionStorage.setItem('id', sessionid)
            router.push({
                pathname: '/',
                query: {
                    sessionid: sessionid,
                }
            })
        }
    }

    const showhide = () => {
        setShow((prev) => {
            return !prev
        })
    }

    return( devs && 
        <div className={styles.description}>
            Get started by pointing stories !
            <div className={styles.title}>
                <code>{props.name}</code>
            </div>
            <div className={styles.card}>
                {
                    devs.map(n => <Point key={n} player={n} point={1} show={show}/>)
                }
            </div>
            <button onClick={showhide}>Show Votes</button>
        </div> 
        
    )
}