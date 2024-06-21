import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import InputField from "../SubComponents/InputFields.jsx";
import './ForgotPassword.css';
import LoginSideImage from '../../assets/images/LoginSideImage.jpg';
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";
import AutoPopupModel from "../SubComponents/AutoPopupModel.jsx";

function ForgotPassword() {

    const [inputs, setInputs] = useState({});
    const [loginDetailsValidateResponse, setLoginDetailsValidateResponse] = useState('');
    const [verificationCodeResponse, setVerificationCodeResponse] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checkPara, setCheckPara] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const validFeedback = document.getElementsByClassName("valid-feedback");

    if (validFeedback.length > 0) {
        for (let i = 0; i < validFeedback.length; i++) {
            validFeedback[i].style.display = "none";
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "forgotPasswordVerificationCode") {
            setVerificationCode(value);
        } else {
            setInputs(preValues => ({...preValues, [name]: value}))
        }


    }
    useEffect(() => {
        const getCheckPara = localStorage.getItem("checkPara");
        if(getCheckPara){
            setCheckPara(true);
            localStorage.removeItem("checkPara");
        }
    }, []);

    const ForgotPassword = async () => {
        if (inputs.NewPassword === inputs.ReEnterNewPassword) {
            setLoading(true);
            const extendData = {
                ...inputs,
                filterParameter: 1
            }
            console.log(extendData)
            await axios.post(
                'http://localhost:8081/project_01/controllers/LibraryUserLoginController.php',
                extendData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    setLoading(false);
                    console.log(response.data);
                    const message = response.data.resultMessage;
                    if (message === "verification code sent.") {
                        setShowOverlay(true);
                        setShowModal(true);
                        setLoginDetailsValidateResponse(message)
                    } else if (message === "Email Not Exist!") {
                        const emailField = document.getElementById("forgotEmail");
                        emailField.style.borderColor = "red";
                        setLoginDetailsValidateResponse(message)
                    } else {
                        const emailField = document.getElementById("forgotEmail");
                        const passwordField1 = document.getElementById("ReEnterNewPassword");
                        const passwordField2 = document.getElementById("NewPassword");
                        emailField.style.borderColor = "red";
                        passwordField1.style.borderColor = "red";
                        passwordField2.style.borderColor = "red";
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
        } else {
            const passwordField1 = document.getElementById("ReEnterNewPassword");
            const passwordField2 = document.getElementById("NewPassword");
            passwordField1.style.borderColor = "red";
            passwordField2.style.borderColor = "red";
            setLoginDetailsValidateResponse("Passwords Not Matched!");
        }


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
                    ForgotPassword();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    async function sendVerificationCode() {
        setLoading(true);
        const extendData = {
            ...inputs,
            verificationCode: verificationCode,
            filterParameter: 2
        }
        console.log(extendData)
        await axios.post(
            'http://localhost:8081/project_01/controllers/LibraryUserLoginController.php',
            extendData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            setLoading(false);
            console.log(response.data);
            const message = response.data.resultMessage;

            if (message === "Password Changed.") {
                localStorage.setItem("checkPara",true);
               location.reload();
            } else {
                setVerificationCodeResponse(message);
            }

        })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <div id="forgotPasswordFormMainDiv" className="row">
            {checkPara && <div className="position-fixed top-0 start-0 m-3">
                <div className="alert alert-success alert-dismissible fade show w-25" role="alert"
                     style={{borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <strong>Success!</strong> Password Changed!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>


            }

            {loading && <CircleSpinner/>}
            {showOverlay && (
                <div className={`category-dark-overlay ${showOverlay ? 'show' : ''}`}
                     onClick={() => setShowOverlay(false)}></div>
            )}
            <AutoPopupModel tittle={"Verification Code Sent To The Your Email"} body={
                <div>
                    <label htmlFor="validationCustomUsername" className="form-label"
                           id="simpleUsage">Enter Code</label>
                    <input type="number" className="form-control w-75 h-25" id="forgotPasswordVerificationCode"
                           aria-describedby="inputGroupPrepend" name="forgotPasswordVerificationCode"
                           onChange={handleChange} minLength="4" maxLength="4"
                           required/>
                </div>
            } footer={
                <div>
                    <label className="mt-2 mx-3" style={{
                        color: verificationCodeResponse === "Password Changed." ? 'green' : 'red',
                    }}>{verificationCodeResponse}</label>
                    <button className="btn btn-primary feildDisabled" type="submit"
                            onClick={sendVerificationCode}>Submit
                    </button>
                </div>
            } setShowModal={setShowModal} setShowOverlay={setShowOverlay} showModal={showModal}/>

            <div className="col-xl-4 col-lg-5 col-md-5  col-0">
                <div id="forgotPasswordSideImage">
                    <img src={LoginSideImage} alt="LoginSideImage"/>
                </div>
            </div>
            <div id="forgotPasswordForm" className="col-lg-4 col-md-4  col-6 mx-auto my-auto ">
                <form className="g-3 needs-validation px-3 px-sm-4 px-md-3  px-lg-3 py-5" noValidate>
                    <h3>Forgot Password</h3>
                    {/*email eka local storage eken gann one*/}
                    <InputField label={"Email"} id={"forgotEmail"} className={"form-control"}
                                name={"email"} type={"email"} handleChange={handleChange}
                                feedback={"Email."}/>

                    <InputField label={"New Password"} id={"NewPassword"} className={"form-control"}
                                name={"NewPassword"} type={"password"} handleChange={handleChange}
                                feedback={"Fill password according to the conditions"}
                                minLength={8}
                                requiredPattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$"}
                                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                    />
                    <InputField label={"Re Enter New Password"} id={"ReEnterNewPassword"} className={"form-control"}
                                name={"ReEnterNewPassword"} type={"password"} handleChange={handleChange}
                                feedback={"Fill password according to the conditions"}
                                minLength={8}
                                requiredPattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$"}
                                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                    />
                    <label className="mt-2 ms-1" style={{
                        color: loginDetailsValidateResponse === "verification code sent." ? 'green' : 'red',
                    }}>{loginDetailsValidateResponse}</label><br/>

                    <div className="col-12">
                        <button className="col-12 btn btn-primary feildDisabled" type="submit" onClick={submit}>Reset
                            Password
                        </button>
                        <hr className="w-75  mt-4 mx-auto"/>
                        <div className="text-center">
                            <Link id="backToLogin" to="/login">Back To Login page </Link>
                        </div>
                    </div>


                </form>


            </div>

        </div>
    )
}

export default ForgotPassword;

