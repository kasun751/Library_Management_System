import TypeIt from "typeit";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import './GuestUser.css';
import AutoPopupModel from "../SubComponents/AutoPopupModel.jsx";

function GuestUser() {

    const typeItRef = useRef(false);
    //development mode ekedi deparak useEffect eka run wena hinda eya nawathweemata useRef hook eka use kara athaa
    const [input, setInputs] = useState(null);
    const navigate = useNavigate();
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputs(value)
    }
    useEffect(() => {
        const guestUserName = localStorage.getItem('guestUserName');
        if (guestUserName === null) {
            setShowOverlay(true);
            setShowModal(true);
        } else {
            setInputs(guestUserName);
        }
    }, []);

    function submit() {
        console.log(input)
        if (input !== null) {
            localStorage.setItem('guestUserName', input);
           location.reload();
        }
    }
    useEffect(() => {
        const initializeTypeIt = () => {
            if (!typeItRef.current && document.getElementById('simpleUsage')) {
                typeItRef.current = new TypeIt("#simpleUsage", {
                    strings: "Enter Your Name...",
                    speed: 50,
                    waitUntilVisible: true,
                }).go();
            }
        };

        if (showModal) {
            initializeTypeIt();
        }
    }, [showModal]);


    return (
        <>
            {showOverlay && (
                <div className={`category-dark-overlay ${showOverlay ? 'show' : ''}`}
                     onClick={() => setShowOverlay(false)}></div>
            )}

            <div id="GuestUser" style={{display: 'initial'}}>
                <AutoPopupModel tittle={"Welcome To LMS!!!"}  body={
                    <div>
                    <label htmlFor="validationCustomUsername" className="form-label"
                           id="simpleUsage"></label>
                    <input type="text" className="form-control w-75 h-25" id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend" name="guestUserName"
                    onChange={handleChange}
                                required/>
                    </div>
                } footer={
                    <button className="btn btn-primary feildDisabled" type="submit"
                            onClick={submit}>View Website
                    </button>
                } setShowModal={setShowModal} setShowOverlay={setShowOverlay} showModal={showModal}/>
            </div>

        </>
    )
}


export default GuestUser;