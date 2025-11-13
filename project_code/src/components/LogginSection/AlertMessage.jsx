import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Alert.css';

function AlertMessage({ message, duration }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    return ReactDOM.createPortal(
        <div className={`alert ${show ? 'show' : 'hide'}`}>
            {message}
        </div>,
        document.body
    );
}

export default AlertMessage;
