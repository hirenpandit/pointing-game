import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import { getSession, postRequest, putRequest } from '../lib/request'

export default function Home() {

  const [team, setTeam] = useState('')
  const [pName, setName] = useState('')
  const [create, isCreate] = useState(true)

  const router = useRouter()
  const btnRef = useRef()
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionid = urlParams.get('sessionid');
    if(sessionid) {
      isCreate(false)
      getSession(sessionid).then(res => {
        sessionStorage.setItem('team', res.team)
        setTeam(res.team) 
      })
    }
  },[])

  useEffect(() => {
    const enabled = (team && team.trim().length > 0) 
    && (pName && pName.trim().length > 0)
    if(enabled) {
      btnRef.current.disabled=false
    } else {
      btnRef.current.disabled=true
    }
  }, [team, pName])

  const newSession = () => {
    sessionStorage.setItem('team', team)
    sessionStorage.setItem('name', pName)
    postRequest(team, pName).then(res => {
      sessionStorage.setItem('id',res._id)
      router.push(`/table?sessionid=${res._id}`)
    })
    
  }
  const joinSession = () => {
    const id = sessionStorage.getItem('id')
    putRequest(id, team, pName).then(res => {
      sessionStorage.setItem('name', pName)
      router.push(`/table?sessionid=${id}`)
    }).catch(e => console.error(e))
    
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
            <div className={styles.newsession}>
              <input type="text" 
                    label="Team"
                    placeholder='Team' 
                    id="session-name-txt" 
                    onChange={(e) => setTeam(e.target.value)}
                    value={team}
                    disabled={!create}/>
              <input type="text" 
                    label="Name"
                    placeholder='Your Name' 
                    id="session-name-txt" 
                    onChange={(e) => setName(e.target.value)}
                    value={pName}/>
              {create && 
                <button onClick={newSession} ref={btnRef}>Create</button>
              }
              {!create &&
                <button onClick={joinSession} ref={btnRef}>Join</button>
              }
            </div>
        </div>
      </main>
    </div>
  )
}
