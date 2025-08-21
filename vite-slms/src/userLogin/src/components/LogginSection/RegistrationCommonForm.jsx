import React, {useState, useEffect} from 'react';
import InputField from "../SubComponents/InputFields.jsx";
import AlertMessage from './AlertMessage.jsx';

function RegistrationCommonForm({
                                    handleChange,
                                    registerStatus,
                                    submit,
                                    selectTypeInput1,
                                    selectTypeInput2,
                                    tittle,
                                    birthDate,
                                    gender
                                }) {
    const [alertMessage, setAlertMessage] = useState('');
    // const [birthDate, setBirthDate] = useState('');
    // const [gender, setGender] = useState('');

    useEffect(() => {
        if (registerStatus) {
            setAlertMessage(registerStatus);
        }

    }, [registerStatus]);

    // Function to calculate the birth date and gender from NIC
    // const calculateBirthDateFromNIC = (nic) => {
    //     let birthDate = '';
    //     let gender = '';
    //
    //     if (nic) {
    //         let year, dayOfYear;
    //
    //         if (nic.length === 10 && (nic.endsWith('V') || nic.endsWith('X'))) {
    //             // Old format: e.g., 820149894V
    //             year = '19' + nic.slice(0, 2);
    //             dayOfYear = parseInt(nic.slice(2, 5), 10);
    //         } else if (nic.length === 12) {
    //             // New format: e.g., 200009603327
    //             year = nic.slice(0, 4);
    //             dayOfYear = parseInt(nic.slice(4, 7), 10);
    //         }
    //
    //         if (dayOfYear > 500) {
    //             gender = 'female';
    //             dayOfYear -= 500; // Adjust dayOfYear for females
    //         } else {
    //             gender = 'male';
    //         }
    //
    //         birthDate = getBirthDateFromDayOfYear(year, dayOfYear);
    //     }
    //
    //     return { birthDate, gender };
    // };
    //
    // const getBirthDateFromDayOfYear = (year, dayOfYear) => {
    //     const date = new Date(year, 0);
    //     date.setDate(dayOfYear);
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    // Handle changes to NIC input
    // const handleNICChange = (event) => {
    //     if (event && event.target) {
    //         const nic = event.target.value;
    //         const { birthDate, gender } = calculateBirthDateFromNIC(nic);
    //         setBirthDate(birthDate);
    //         setGender(gender);
    //     }
    //     handleChange(event);
    // };

    return (
        <div id="registrationForm" className="bookSectionCommonFormClass">
            <h2 className="d-flex justify-content-center text-white">{tittle}</h2>
            <form className="row g-3 needs-validation justify-content-center" noValidate>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 mx-2 mx-xl-4">
                    {selectTypeInput1}
                    {selectTypeInput2}
                    <InputField label={"Address"} id={"regAddress"} className={"form-control"}
                                name={"registeredUserAddress"} type={"text"} handleChange={handleChange}
                                feedback={"Address."}/>
                    <InputField
                        label={"Phone Number"}
                        id={"regPhoneNumber"}
                        className={"form-control"}
                        name={"registeredUserPhoneNumber"}
                        type={"tel"}
                        handleChange={handleChange}
                        requiredPattern={"^(?:7|0|(?:\\+94))[0-9]{9,10}$"}
                        feedback={"Please enter a valid phone number."}
                    />
                    <InputField label={"BirthDay"} id={"regBirthDay"} className={"form-control"}
                                name={"registeredUserBirthDay"} type={"date"} handleChange={handleChange}
                                value={birthDate} feedback={"BirthDay."} disabled={true}/>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 mx-2 mx-xl-4">
                    <InputField label={"NIC"} id={"regNIC"} className={"form-control "}
                                name={"registeredUserNic"} type={"text"} handleChange={handleChange} // Updated
                                feedback={"NIC."}/>
                    <div className="gender col-md-12">
                        <label className="form-label d-block">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input mt-3" type="radio" name="gender" id="maleRadio"
                                   value="male" required onChange={handleChange}
                                   checked={gender === 'male'} disabled={true}/>
                            <label className="form-check-label" htmlFor="maleRadio">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input mt-3" type="radio" name="gender"
                                   id="femaleRadio" value="female" required onChange={handleChange}
                                   checked={gender === 'female'} disabled={true}/>
                            <label className="form-check-label" htmlFor="femaleRadio">Female</label>
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
                                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."/>
                    <InputField label={"Re-Enter password"} id={"regRe-EnterPassword"} className={"form-control"}
                                name={"registeredUserPasswordConfirm"} type={"password"} handleChange={handleChange}
                                minLength={8} requiredPattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$"}
                                feedback={"Fill password according to the conditions"}
                                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."/>
                </div>
                <div className="col-10">
                    <label className="mx-2 mt-1" style={{
                        color: registerStatus === "verificationProcessRunning..." ? 'green' : 'red',
                    }}>{registerStatus}</label>
                </div>
                <div className="d-flex justify-content-center col-12">
                    <button className="btn btn-primary feildDisabled col-6 mx-auto" type="submit"
                            onClick={submit}>Sign Up
                    </button>
                </div>
            </form>
            <AlertMessage message={alertMessage} duration={5000}/>
        </div>
    );
}

export default RegistrationCommonForm;
