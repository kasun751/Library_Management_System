import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import InputField from "../SubComponents/InputFields.jsx";
import './Login.css';
import LoginSideImage from '../../assets/images/LoginSideImage.jpg';

function Login() {

    //development mode ekedi deparak useEffect eka run wena hinda eya nawathweemata useRef hook eka use kara athaa
    const [inputs, setInputs] = useState({});
    const [loginStatus, setLoginStatus] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const UserLogin = async () => {

        await axios.post(
            'http://localhost:8081/project_01/controllers/LibraryUserLoginController.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                setLoginStatus(response.data)
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
                                feedback={"Email Or User_ID."}/>
                    <label htmlFor="fogotPassword">Forgot Password?</label>
                    <div className="col-12">
                        <button className="col-12 btn btn-primary feildDisabled" type="submit" onClick={submit}>Sign
                            In
                        </button>
                        <hr className="w-75  mt-4 mx-auto"/>
                        <div className="text-center">
                            <p>Or sign in with</p>
                            <Link id="createAccountLink" to="/guestUser">Create new account </Link>
                        </div>
                    </div>


                </form>


            </div>
            {/*<div>*/}
            {/*    <p>Response from PHP script: {loginStatus.resultMessage}</p>*/}
            {/*</div>*/}
        </div>
    )
}


export default Login;