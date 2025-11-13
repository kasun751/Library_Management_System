import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Register.css';
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";
import RegistrationCommonForm from "./RegistrationCommonForm.jsx";
import InputField from "../SubComponents/InputFields.jsx";
import HeaderComponent from "../Header/HeaderComponent.jsx";
import FooterComponent from "../Footer/FooterComponent.jsx";

function Register() {
    const [inputs, setInputs] = useState({});
    const [nextUserID, setNextUserID] = useState({});
    const [registerStatus, setRegisterStatus] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedPage, setSelectedPage] = useState('RegisterUser');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }


    const updateDatabase = async () => {
        const extendedData = {
            accountType: "Register", ...inputs, ...nextUserID
        };
        console.log(extendedData)
        setLoading(true);
        await axios.post('http://localhost:8081/project_01/controllers/LibraryUserRegistrationController.php', extendedData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setLoading(false);
                console.log(response.data);
                setRegisterStatus(response.data)
                if (response.data.resultMessage == "verificationProcessRunning...") {
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
                    updateDatabase();


                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    const handlePage = (event) => {
        setSelectedPage(event.target.value);
    };


    return (
        <div id="SignUpMainDiv">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/"} Link7={"Log In"} router7={"/login"}/>
            <div id={"registerSection"}>
                <h1> Sign Up</h1>
                <div id="registerPageSelection">
                    <h3>Register As</h3>
                    <div className="selectMethod">
                        <label > Register User </label>
                        <input
                            type="radio"
                            value="RegisterUser"
                            checked={selectedPage === 'RegisterUser'}
                            onChange={handlePage}
                        />
                    </div>
                    <div className="selectMethod ms-0">
                        <label> Staff Users </label>
                        <input
                            type="radio"
                            value="staffUser"
                            checked={selectedPage === 'staffUser'}
                            onChange={handlePage}
                        />
                    </div>
                </div>
                <div >
                    {selectedPage === 'RegisterUser' &&
                        <RegistrationCommonForm handleChange={handleChange} submit={submit}
                                                registerStatus={registerStatus.resultMessage}
                                                tittle={"Register User"}
                                                selectTypeInput1={<InputField label={"First Name"} id={"regFirstName"}
                                                                              className={"form-control"}
                                                                              name={"registeredUserFirstName"}
                                                                              type={"text"}
                                                                              handleChange={handleChange}
                                                                              feedback={"First Name."}/>}
                                                selectTypeInput2={<InputField label={"Last Name"}
                                                                              id={"regLastName"}
                                                                              className={"form-control"}
                                                                              name={"registeredUserLastName"}
                                                                              type={"text"}
                                                                              handleChange={handleChange}
                                                                              feedback={"Last Name."}/>}/>}
                    {selectedPage === 'staffUser' && <RegistrationCommonForm handleChange={handleChange} submit={submit}
                                                                             value={nextUserID.nextUserID}
                                                                             registerStatus={registerStatus.resultMessage}
                                                                             tittle={"Staff User"}

                                                                             selectTypeInput1={<div className="row">
                                                                                 <div
                                                                                     className="nameFields col-xl-6 col-lg-6 col-md-6">
                                                                                     <InputField label={"First Name"}
                                                                                                 id={"regFirstName"}
                                                                                                 className={"form-control"}
                                                                                                 name={"registeredUserFirstName"}
                                                                                                 type={"text"}
                                                                                                 handleChange={handleChange}
                                                                                                 feedback={"First Name."}/>
                                                                                 </div>
                                                                                 <div
                                                                                     className="nameFields col-xl-6 col-lg-6 col-md-6">
                                                                                     <InputField label={"Last Name"}
                                                                                                 id={"regLastName"}
                                                                                                 className={"form-control"}
                                                                                                 name={"registeredUserLastName"}
                                                                                                 type={"text"}
                                                                                                 handleChange={handleChange}
                                                                                                 feedback={"Last Name."}/>
                                                                                 </div>
                                                                             </div>} selectTypeInput2={<div>
                        <label htmlFor="selectPosition"
                               className="form-label">Position</label>
                        <select className="form-select"
                                id="selectPosition"
                                defaultValue=""
                                onChange={handleChange}
                                name="accountType" required>
                            <option disabled value="">Choose...
                            </option>
                            <option value="SystemAdmin">System
                                Admin
                            </option>
                            <option value="Librarian">Librarian
                            </option>
                            <option
                                value="LibraryAssistantRegistrar">Library
                                Assistant Registrar
                            </option>
                            <option
                                value="LibraryInformationAssistant">Library
                                Information
                                Assistant
                            </option>
                        </select>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a valid Position.
                        </div>
                    </div>}/>}
                </div>
            </div>
            <FooterComponent/>
        </div>)
}

export default Register;