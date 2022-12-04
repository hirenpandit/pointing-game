import {useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCommentDots } from '@fortawesome/free-regular-svg-icons'


export default function Point({player, point, show}){
    useEffect(()=>{
    }, [point])
    
    return(
        <>
            <div className={styles.grid}>
                <div className={styles.checkIcon}>
                    {point > 0 
                        ? <FontAwesomeIcon icon={faCheckCircle} /> 
                        : <FontAwesomeIcon icon={faCommentDots} />
                    }
                </div>
                <div className={styles.name}>{player}</div>
                {show && 
                    <button className={styles.pointbtn}>{point}</button>
                }
                {!show && 
                    <button className={styles.pointbtn}></button>
                }
            </div>
            
        </>
    )
}
