/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useSelector } from 'react-redux'


const ToastMsg = () => {

    const messages = useSelector(state=>state.messages.messages)
    useEffect(() => {
        console.log(`messages in store`)
        console.log(messages)
    }, [messages])

    return(
        <>
            <ToastContainer position='bottom-end' className='m-2'>
                {messages.map(message => {
                    return (<Toast key='1'>
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