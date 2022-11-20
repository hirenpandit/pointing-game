import styles from '../styles/Home.module.css'
export default function Point({player, point, show}){
    return(
        <>
            <div className={styles.grid}>
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
