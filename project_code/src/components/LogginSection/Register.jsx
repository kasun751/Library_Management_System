import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Register.css';
import InputField from "../SubComponents/InputFields.jsx";
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";

function Register() {
    const [inputs, setInputs] = useState({});
    const [nextUserID, setNextUserID] = useState({});
    const [registerStatus, setRegisterStatus] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }

    useEffect(() => {
        axios.get('http://localhost:8081/project_01/controllers/LibraryUserRegistrationController.php')
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
            ...inputs, ...nextUserID,accountType:"Register"
        };
        console.log(extendedData)
        setLoading(true);
        await axios.post(
            'http://localhost:8081/project_01/controllers/LibraryUserRegistrationController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setLoading(false);
                console.log(response.data);
                setRegisterStatus(response.data)
                if (response.data.resultMessage == "verificationProcessRunning...") {
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
        <div>
            {loading && <CircleSpinner/>}
        <div id={"registerSection"} >
            <h1> Sign Up</h1>
            <div id="registrationForm">
                <form className="row g-3 needs-validation justify-content-center" noValidate>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 mx-2 mx-xl-4">
                        <div className="row">
                            <div className="nameFields col-xl-6 col-lg-6 col-md-6">
                                <InputField label={"First Name"} id={"regFirstName"} className={"form-control"}
                                            name={"registeredUserFirstName"} type={"text"} handleChange={handleChange}
                                            feedback={"First Name."}/>
                            </div>
                            <div className="nameFields col-xl-6 col-lg-6 col-md-6">
                                <InputField label={"Last Name"} id={"regLastName"} className={"form-control"}
                                            name={"registeredUserLastName"} type={"text"} handleChange={handleChange}
                                            feedback={"Last Name."}/>
                            </div>
                        </div>
                        <InputField label={"User ID"} id={"regUserID"} className={"form-control"}
                                    name={"registeredUserID"} type={"text"} handleChange={handleChange}
                                    value={nextUserID.nextUserID || ""} disabled={true}/>

                        <InputField label={"Address"} id={"regAddress"} className={"form-control"}
                                    name={"registeredUserAddress"} type={"text"} handleChange={handleChange}
                                    feedback={"Address."}/>

                        <InputField label={"Phone Number"} id={"regPhoneNumber"} className={"form-control"}
                                    name={"registeredUserPhoneNumber"} type={"tel"} handleChange={handleChange}
                                    feedback={"Phone Number."}/>
                        <InputField label={"NIC"} id={"regNIC"} className={"form-control "}
                                    name={"registeredUserNic"} type={"text"} handleChange={handleChange}
                                    feedback={"NIC."}/>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 mx-2 mx-xl-4">

                        <InputField label={"BirthDay"} id={"regBirthDay"} className={"form-control"}
                                    name={"registeredUserBirthDay"} type={"date"} handleChange={handleChange}
                                    feedback={"BirthDay."}/>
                        <div className="gender col-md-12">
                            <label className="form-label d-block">Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input mt-3" type="radio" name="gender" id="maleRadio"
                                       value="male"
                                       required onChange={handleChange}/>
                                <label className="form-check-label " htmlFor="maleRadio">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  mt-3" type="radio" name="gender" id="femaleRadio"
                                       value="female" required onChange={handleChange}/>
                                <label className="form-check-label " htmlFor="femaleRadio">Female</label>
                            </div>
                        </div>
                        <InputField label={"Email"} id={"regEmail"} className={"form-control"}
                                    name={"registeredUserEmail"} type={"email"} handleChange={handleChange}
                                    feedback={"Email."}/>


                        <InputField label={"Password"} id={"regPassword"} className={"form-control"}
                                    name={"registeredUserPassword"} type={"password"} handleChange={handleChange}
                                    feedback={"Fill password according to the conditions"}
                                    minLength={8}
                                    requiredPattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$"}
                                    title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                        />

                        <InputField label={"Re-Enter password"} id={"regRe-EnterPassword"}
                                    className={"form-control"}
                                    name={"registeredUserPasswordConfirm"} type={"password"}
                                    handleChange={handleChange} minLength={8}
                                    requiredPattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$"}
                                    feedback={"Fill password according to the conditions"}
                                    title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                        />
                    </div>
                    <div className="col-10">
                        <label className="mx-2 mt-1" style={{
                            color: registerStatus.resultMessage === "verificationProcessRunning..." ? 'green' : 'red',
                        }}>{registerStatus.resultMessage}</label>
                    </div>
                    <div className="d-flex justify-content-centercol-12">
                        <button className="btn btn-primary feildDisabled col-6 mx-auto mt-3" type="submit"
                                onClick={submit}>Logging
                        </button>
                    </div>

                </form>
            </div>

        </div>
        </div>
    )
}

export default Register;