import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import InputField from "../SubComponents/InputFields.jsx";
import './Login.css';
import LoginSideImage from '../../assets/images/LoginSideImage.jpg';
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";

function Login() {

    //development mode ekedi deparak useEffect eka run wena hinda eya nawathweemata useRef hook eka use kara athaa
    const [inputs, setInputs] = useState({});
    const [loginDetailsValidateResponse, setLoginDetailsValidateResponse] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const validFeedback = document.getElementsByClassName("valid-feedback");
    if (validFeedback.length > 0) {
        for (let i = 0; i < validFeedback.length; i++) {
            validFeedback[i].style.display = "none";
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }


    const UserLogin = async () => {
        setLoading(true);
        await axios.post(
            'http://localhost:8081/project_01/controllers/LibraryUserLoginController.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setLoading(false);
                console.log(response.data);
                const message = response.data.resultMessage;
                if (message === "Login details not matched!") {
                    const emailField=document.getElementById("validationUserLogin01");
                    const passwordField=document.getElementById("validationUserLogin02");
                    emailField.style.borderColor="red";
                    passwordField.style.borderColor="red";
                    setLoginDetailsValidateResponse("Login details not matched!")
                } else {
                    setLoginDetailsValidateResponse(message)
                }
                if (response.data.resultMessage == "Login_Success") {
                    const encodedId = encodeURIComponent(response.data.userID);
                    navigate(`/dashboard/${encodedId}`);
                } else if (response.data.resultMessage == "NotVerifiedAccount") {
                    console.log(response.data.userID);
                    const encodedId = encodeURIComponent(response.data.userID);
                    navigate(`/verificationPage/${encodedId}`);
                }

            })
            .catch(error => {
                console.log(error.message);
            });

    }

    function submit() {
        (async () => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')
            await new Promise((resolve, reject) => {
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', event => {
                        form.classList.add('was-validated');   //was-validated This class is commonly used in Bootstrap forms to indicate that the form has been validated.

                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            reject(false)
                            console.log("not complete");
                        } else {
                            console.log('validate true')
                            resolve(true)
                            event.preventDefault()

                        }

                    })
                })
            }).then(res => {
                if (res) {
                    console.log(inputs);
                    UserLogin();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    return (
        <div id="loginFormMainDiv" className="row">
            {loading && <CircleSpinner/>}
            <div className="col-xl-4 col-lg-5 col-md-5  col-0">
                <div id="loginSideImage">
                    <img src={LoginSideImage} alt="LoginSideImage"/>
                </div>
            </div>
            <div id="loginForm" className="col-lg-4 col-md-4  col-6 mx-auto my-auto ">
                <form className="g-3 needs-validation px-3 px-sm-4 px-md-3  px-lg-3 py-5" noValidate>
                    <h3>Login</h3>
                    <InputField label={"Email Or User_ID"} id={"validationUserLogin01"} className={"form-control"}
                                name={"loginUserEmailOrUser_ID"} type={"text"} handleChange={handleChange}
                                feedback={"Email Or User_ID."}/>

                    <InputField label={"Password"} id={"validationUserLogin02"} className={"form-control"}
                                name={"loginUserPassword"} type={"password"} handleChange={handleChange}
                                feedback={"Password"}/>
                        <label className="mt-1" style={{
                            color:  loginDetailsValidateResponse=== "Login details not matched!" ? 'red' : 'green',
                        }}>{loginDetailsValidateResponse}</label><br/>

                    <label className="mt-1" htmlFor="fogotPassword">Forgot Password?</label>
                    <div className="col-12">
                        <button className="col-12 btn btn-primary feildDisabled" type="submit" onClick={submit}>Sign
                            In
                        </button>
                        <hr className="w-75  mt-4 mx-auto"/>
                        <div className="text-center">
                            <p>Or sign in with</p>
                            <Link id="createAccountLink" to="/register">Create new account </Link>
                        </div>
                    </div>


                </form>


            </div>

        </div>
    )
}


export default Login;