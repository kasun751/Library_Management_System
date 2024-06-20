import './CircleSpinner.css';
import {useState} from "react";

const CircleSpinner = () => {
    const [loading, setLoading] = useState(false);

    return (

        <div id="spinner">
            <div className="spinner-border text-light mb-3" role="status"
                 style={{width: '3rem', height: '3rem', animationDuration: '1.5s', borderWidth: '0.4em'}}>
                <span className="visually-hidden">Loading</span>
            </div>
            <div className="text-light">Loading<span className="dot-animation">...</span></div>
        </div>

    );
};

export default CircleSpinner;
