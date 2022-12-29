import {useEffect, useRef} from 'react'

export default function Point({player, point, show}){

    const ref = useRef(null)

    let name = null
    useEffect(()=>{
        name = point > 0 ? 
            'col-2 btn btn-outline-success' : 
            'col-2 btn btn-outline-danger'
        ref.current.className = name
    }, [show, point])
    
    return(
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>{player}</div>
                    {show &&
                        <button className='' ref={ref}>
                            {point}
                        </button>
                    }
                    {!show && 
                        <button className='' ref={ref}>_</button>
                    }
                </div>
            </div>
            
        </>
    )
}
