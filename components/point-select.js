import { updatePoints } from '../lib/request'
import styles from '../styles/Home.module.css'

function savePoint(e) {
    const point = e.target.value
    const id = sessionStorage.getItem('id')
    const name = sessionStorage.getItem('name')
    updatePoints(id, name, point)
        .then(res => console.log(res))

}

export default function PointSelect(){
    const points = [1,2,3,5,8,13,21,'☕']

    return (
        <>  
            <div className={styles.pointslectorheading}>Select Point</div>
            <div className={styles.pointslector}>
            {
                points.map(elem => {
                    return <button key={elem} onClick={savePoint} value={elem}>{elem}</button>
                })
            }
            </div>
        </>
    )

}