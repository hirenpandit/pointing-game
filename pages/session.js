import { useRouter } from "next/router";
import { useEffect } from "react";
import Statestics from "../components/point-stats";
import PointList from "../components/points/point-list";
import PointSelect from "../components/points/point-select";

export default function Session(){

    const router = useRouter()

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get('sessionid')) { //check if session id is present in the query param
            router.push('/')
        }
    },[])

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <PointList />
                </div>
                <div className='col'>
                    <div className="row">
                        <PointSelect />
                    </div>
                    <div className="row pt-4">
                        <Statestics />
                    </div>
                </div>
            </div> 
        </div>
    )
}
