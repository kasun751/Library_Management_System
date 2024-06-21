
import InputField from "../SubComponents/InputFields.jsx";

function RegistrationCommonForm({handleChange, registerStatus, submit,selectTypeInput1,selectTypeInput2,tittle}) {

    return (
        <div id="registrationForm">
            <h2 className="d-flex justify-content-center" style={{color:"black"}}>{tittle}</h2>
            <form className="row g-3 needs-validation justify-content-center" noValidate>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 mx-2 mx-xl-4">
                    {selectTypeInput1}

                    {selectTypeInput2}

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
                            <input className="form-check-input  mt-3" type="radio" name="gender"
                                   id="femaleRadio"
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
                            color: registerStatus === "verificationProcessRunning..." ? 'green' : 'red',
                        }}>{registerStatus}</label>
                    </div>
                    <div className="d-flex justify-content-centercol-12">
                        <button className="btn btn-primary feildDisabled col-6 mx-auto " type="submit"
                                onClick={submit}>Logging
                        </button>
                    </div>

            </form>
        </div>
)


}

export default RegistrationCommonForm