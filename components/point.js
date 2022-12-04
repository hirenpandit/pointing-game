import {useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'


export default function Point({player, point, show}){
    useEffect(()=>{
    }, [point])
    
    return(
        <>
            <div className={styles.grid}>
                <div className={styles.icon}>
                    {point > 0 
                        ? 
                        <div className={styles.checkIcon}>
                            <Image src="/done.png" width="50px" height="50px" alt='done'/>
                        </div>
                        : 
                        <div className={styles.thinkIcon}>
                            <Image src="/thinking2.png" width="50px" height="50px" alt='think'/>
                        </div>
                    }
                </div>
                <div className={styles.name}>{player}</div>
                {show &&
                    <button className={styles.pointbtn}>
                        {console.log(point)}
                        {!point ? <div className={styles.teaImage}>
                                    <Image  src="/tea.png" width="50px" height="50px" alt='think'/>
                                </div> 
                                : point
                        }
                    </button>
                }
                {!show && 
                    <button className={styles.pointbtn}></button>
                }
            </div>
            
        </>
    )
}
