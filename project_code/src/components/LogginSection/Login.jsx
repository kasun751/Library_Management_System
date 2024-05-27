import {useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
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
            'http://localhost:8081/project_01/libraryUserLogin.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                setLoginStatus(response.data)
                if(response.data.resultMessage == "Login_Success"){
                    const encodedId = encodeURIComponent(response.data.userID);
                    navigate(`/dashboard/${encodedId}`);
                }else if (response.data.resultMessage == "NotVerifiedAccount"){
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
        <>
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> Email Or User_ID</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername01"
                               aria-describedby="inputGroupPrepend" name="loginUserEmailOrUser_ID" onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Email.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> password</label>
                    <div className="input-group has-validation">
                        <input type="password" className="form-control" id="validationCustomUsername02"
                               aria-describedby="inputGroupPrepend" name="loginUserPassword"
                               onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid password.
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>Login
                    </button>
                </div>
            </form>
            <div>
                <p>Response from PHP script: {loginStatus.resultMessage}</p>
            </div>
        </>
    )
}


export default Login;