/* eslint-disable @next/next/no-img-element */
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


const ToastMsg = () => {
    return(
        <>
            <ToastContainer position='bottom-end' className='p-4'>
                <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default ToastMsg