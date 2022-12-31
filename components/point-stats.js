import { LineChart, Line, XAxis, YAxis} from 'recharts';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

let points = ['0','1','2','3','5','8','13','21'];

const Statestics = () => {
    const {data} = useSelector(state => state.session)
    useEffect(() => {

    }, [data.length])

    const dummy = [
        {point: 1, count:1}
    ]
    const getData = () => {
        console.log(`preparing data`)
        console.log(data.devs)
        const d = points.map(p => {
            return {
                point: p,
                count: data.devs.filter(dev => dev.point === p).length
            }
        })
        console.log(`data for chart`)
        console.log(d)
        return d
    }

    return ( data.show &&
        <>
            <div className='d-flex flex-row gap-3 ms-5'>
                <pre>x axis: point,</pre>
                <pre>y axis: vote</pre>
            </div>
            <LineChart width={450} height={300} data={getData()}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <XAxis dataKey="point" />
                <YAxis dataKey="count"/>
            </LineChart>
        </>
    ) 
}

export default Statestics