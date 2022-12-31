/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useSelector } from 'react-redux'


const ToastMsg = () => {
    const messages = useSelector(state=>state.messages.messages)
    const [show, setShow] = useState([]);
    useEffect(() => {
        const arr = Array.from(messages, msg => true)
        setShow(arr)
    }, [messages])

    const setShowStatus = (index) => {
        setShow((prevState) => {
            return prevState.map((prev, idx) => {
                if(idx===index){
                    prev = false;
                }
                return prev;
            })
        })
    }

    return(
        <>
            <ToastContainer position='bottom-end' className='m-2'>
                {messages.map((message, index) => {
                    return (<Toast key={index} onClose={() => setShowStatus(index)} show={show[index]}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Message</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>)
                })}
            </ToastContainer>
        </>
    )
}

export default ToastMsg