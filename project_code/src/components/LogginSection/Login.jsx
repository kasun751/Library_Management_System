
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
function Login() {

    //development mode ekedi deparak useEffect eka run wena hinda eya nawathweemata useRef hook eka use kara athaa
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
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
                    // navigate(`/dashboard/${inputs.guestUserName}`);

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
                        <input type="email" className="form-control" id="validationCustomUsername1"
                               aria-describedby="inputGroupPrepend" name="loginUserEmail" onChange={handleChange}
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
                        <input type="password" className="form-control" id="validationCustomUsername2"
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

        </>
    )
}


export default Login;