import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const [inputs, setInputs] = useState({});
    const [nextUserID, setNextUserID] = useState({});
    const [registerStatus, setRegisterStatus] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }

    useEffect(() => {axios.get('http://localhost:8081/project_01/controllers/LibraryUserRegistrationController.php')
            .then(response => {
                console.log(response.data)
                setNextUserID(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    const updateDatabase = async () => {
        const extendedData = {
            ...inputs,...nextUserID
        };
        await axios.post(
            'http://localhost:8081/project_01/controllers/LibraryUserRegistrationController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                setRegisterStatus(response.data)
                if(response.data.resultMessage == "verificationProcessRunning"){
                    const encodedId = encodeURIComponent(nextUserID.nextUserID);
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
                    updateDatabase();


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
                    <label htmlFor="validationCustomUsername" className="form-label"> First Name</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername01"
                               aria-describedby="inputGroupPrepend" name="registeredUserFirstName"
                               onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid First Name.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="validationCustomUsername" className="form-label"> Last Name</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername02"
                               aria-describedby="inputGroupPrepend" name="registeredUserLastName"
                               onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Last Name.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> NIC</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername03"
                               aria-describedby="inputGroupPrepend" name="registeredUserNic" onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid NIC.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> Address</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername04"
                               aria-describedby="inputGroupPrepend" name="registeredUserAddress" onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Address.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> Phone Number</label>
                    <div className="input-group has-validation">
                        <input type="phone" className="form-control" id="validationCustomUsername05"
                               aria-describedby="inputGroupPrepend" name="registeredUserPhoneNumber"
                               onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Phone Number.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> BirthDay</label>
                    <div className="input-group has-validation">
                        <input type="date" className="form-control" id="validationCustomUsername06"
                               aria-describedby="inputGroupPrepend" name="registeredUserBirthDay"
                               onChange={handleChange}
                               required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid BirthDay.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="col-md-6">
                        <label className="form-label d-block">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="maleRadio" value="male"
                                   required onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="maleRadio">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="femaleRadio"
                                   value="female" required onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="femaleRadio">Female</label>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> Email</label>
                    <div className="input-group has-validation">
                        <input type="email" className="form-control" id="validationCustomUsername07"
                               aria-describedby="inputGroupPrepend" name="registeredUserEmail" onChange={handleChange}
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
                    <label htmlFor="validationCustomUsername" className="form-label"> User ID</label>
                    <div className="input-group has-validation">
                        <input type="email" className="form-control" id="validationCustomUsername08"
                               aria-describedby="inputGroupPrepend" name="registeredUserID"
                               value={nextUserID.nextUserID || ""}
                               onChange={handleChange}
                               required disabled/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid User Name.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> password</label>
                    <div className="input-group has-validation">
                        <input type="password" className="form-control" id="validationCustomUsername09"
                               aria-describedby="inputGroupPrepend" name="registeredUserPassword"
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

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label"> Re-Enter password</label>
                    <div className="input-group has-validation">
                        <input type="password" className="form-control" id="validationCustomUsername10"
                               aria-describedby="inputGroupPrepend" name="registeredUserPasswordConfirm"
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
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>Logging
                    </button>
                </div>
            </form>

            <div>
                <p>Response from PHP script: {registerStatus.resultMessage}</p>
            </div>
        </>
    )
}

export default Register;