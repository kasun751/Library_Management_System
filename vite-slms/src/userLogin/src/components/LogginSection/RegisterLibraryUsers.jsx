import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Register.css';
import CircleSpinner from "../CircleSpinner/CircleSpinner.jsx";
import RegistrationCommonForm from "./RegistrationCommonForm.jsx";
import InputField from "../SubComponents/InputFields.jsx";
import HeaderComponent from "../Header/HeaderComponent.jsx";
import FooterComponent from "../Footer/FooterComponent.jsx";

function RegisterLibraryUsers() {
    const [inputs, setInputs] = useState({});
    const [nextUserID, setNextUserID] = useState({});
    const [registerStatus, setRegisterStatus] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
        if (name === 'registeredUserNic') {
            const {birthDate, gender} = calculateBirthDateFromNIC(value);
            setBirthDate(birthDate);
            setGender(gender);
        }
    }

// Function to calculate the birth date and gender from NIC
    const calculateBirthDateFromNIC = (nic) => {
        let birthDate = '';
        let gender = '';

        if (nic) {
            let year, dayOfYear;

            if (nic.length === 10 && (nic.endsWith('V') || nic.endsWith('X'))) {
                // Old format: e.g., 820149894V
                year = '19' + nic.slice(0, 2);
                dayOfYear = parseInt(nic.slice(2, 5), 10);
            } else if (nic.length === 12) {
                // New format: e.g., 200009603327
                year = nic.slice(0, 4);
                dayOfYear = parseInt(nic.slice(4, 7), 10);
            }

            if (dayOfYear > 500) {
                gender = 'female';
                dayOfYear -= 500; 
            } else {
                gender = 'male';
            }

            birthDate = getBirthDateFromDayOfYear(year, dayOfYear);
        }

        return {birthDate, gender};
    };

    const getBirthDateFromDayOfYear = (year, dayOfYear) => {
        const date = new Date(year, 0);
        date.setDate(dayOfYear);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const updateDatabase = async () => {
        const extendedData = {
            accountType: "Register", ...inputs, ...nextUserID,gender: gender,registeredUserBirthDay:birthDate
        };
        console.log(extendedData)
        setLoading(true);
        await axios.post('http://localhost:80/project_1/UserLogin/controllers/LibraryUserRegistrationController.php', extendedData, {
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
                        form.classList.add('was-validated');  

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
        <div id="SignUpMainDiv">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/"} Link7={"Log In"} router7={"/login"}/>
            <div id={"registerSection"}>
                <h1> Sign Up</h1>
                <div id="registerPageSelection">
                    <h3>Register As Libary User</h3>
                </div>
                <div>
                  
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
                                                                              feedback={"Last Name."}/>}
                                                birthDate={birthDate} gender={gender}/>
                    
                </div>
            </div>
            <FooterComponent/>
        </div>)
}

export default RegisterLibraryUsers;