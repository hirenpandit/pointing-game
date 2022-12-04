import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Footer(){
    return(
        <>
            <div className={styles.socialLinks}>
                <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/PanditHiren'>
                    <Image src="/twitter.png" width="50px" height="50px" alt='done'/>
                </a>
            </div>
            <div className={styles.socialLinks}>
                <a target='_blank' rel='noopener noreferrer' href='https://github.com/hirenpandit/planning-poker'>
                    <Image src="/github.png" width="50px" height="50px" alt='done'/>
                </a>
            </div>
    </>
    )
}