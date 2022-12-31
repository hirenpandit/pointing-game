/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/actions/message';


const ToastMsg = () => {
    const messages = useSelector(state=>state.messages.messages)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [messages])

    const removeMessage = (index) => {
        dispatch(remove(index))
    }

    return(
        <>
            <ToastContainer position='bottom-end' className='m-2'>
                {messages.map((message, index) => {
                    return (<Toast key={index} onClose={() => removeMessage(index)} show={true}>
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