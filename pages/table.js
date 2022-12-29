import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Game from "../components/game";
import PointSelect from "../components/point-select";

export default function Table(){

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
                    <Game />
                </div>
                <div className='col'>
                    <PointSelect />
                </div>
            </div> 
        </div>
    )
}
