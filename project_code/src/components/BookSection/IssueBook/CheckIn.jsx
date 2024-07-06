import {useEffect, useState} from "react";
import axios from "axios";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function CheckIn(){
    const [returnBookInputs, setReturnBookInputs] = useState({});
    const [returnMessage, setReturnMessage] = useState('');
    const [returnBookIdDetails, setReturnBookIdDetails] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const storedReturnMessage = localStorage.getItem("returnMessage");
      if(storedReturnMessage){
            setReturnMessage(storedReturnMessage);
        }
        localStorage.removeItem("returnMessage");

    }, []);

    const returnHandleChange = (e) => {
        if (e.target.name == "returnBookID") {
            getReturnBookIdDetails({[e.target.name]: e.target.value});
            //setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;

        setReturnBookInputs(preValues => ({...preValues, [name]: value}))
    }

    const getReturnBookIdDetails = async (bookID) => {
        console.log(bookID.returnBookID)
        await axios.get('http://localhost:8081/project_01/controllers/ReturnBookController.php', {
            params: {
                bookID: bookID.returnBookID
            }
        })
            .then(response => {
                console.log(response.data);
                setReturnBookIdDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:8081/project_01/controllers/CategoryController.php')
            .then(response => {
                setCategoryList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    function inputEnable_disable(feedback) {
        let inputFields = document.querySelector(".feildDisabled");
        inputFields.disabled = feedback;

    }



    function returnSubmit() {
        (async () => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
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
                    returnBook();
                    //location.reload();
                    // console.log(inputs);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }


    const returnBook = async () => {
        setLoading(true);
        const extendedData = {
            category: returnBookIdDetails.category,
            userID: returnBookIdDetails.userID,
            ...returnBookInputs,
            setAvailability: "available"
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/ReturnBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        console.log(res.data.resultMessage)
        const message = await res.data.resultMessage;
        setLoading(false);
        if (message === "true") {
            localStorage.setItem("returnMessage", "Successfully Returned!");
        } else {
            localStorage.setItem("returnMessage", "Failed!");
        }
        location.reload();
    }
    return (
            <div id="checkIn" className="bookSectionCommonClass">
                {loading && <CircleSpinner/>}
                <HeaderComponent Link1={"Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""}/>
                <div id="formDivReturnBook" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                        <h1>Book Check-In</h1>
                        <p style={{
                            color: returnMessage === "Successfully Returned!" ? 'green' : 'red',
                        }}>{returnMessage}</p>
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <InputField label={"Book ID"} id={"validationBookID"} className={"form-control"}
                                            name={"returnBookID"} type={"text"} handleChange={returnHandleChange}
                                            feedback={"Book ID."}/>
                                <InputField label={"Member Name"} id={"validationMemberName"} className={"form-control"}
                                            value={returnBookIdDetails.fullName || ""} name={"returnUserName"}
                                            disabled={true}
                                            type={"text"} feedback={"Member Name."}/>

                                <InputField label={"Book Name"} id={"validationBookName"} className={"form-control"}
                                            value={returnBookIdDetails.bookName || ""} name={"returnBookName"}
                                            type={"text"}
                                            feedback={"Book Name."} disabled={true}/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <CategoryList value={returnBookIdDetails.category || ""} categoryList={categoryList}
                                              disabled1={true} handleChange={returnHandleChange}/>
                                <InputField label={"Current availability"} id={"validationCurrentAvailability"}
                                            value={returnBookIdDetails.availability || ""} className={"form-control"}
                                            name={"returnAvailability"}
                                            type={"text"} feedback={"Current availability."} disabled={true}/>
                                <InputField label={"User ID"} id={"validationUserID"} className={"form-control"}
                                            name={"returnUserID"} handleChange={returnHandleChange}
                                            value={returnBookIdDetails.userID || ""} type={"text"} feedback={"User ID."}
                                            disabled={true}/>
                            </div>

                            <p>Fine Calculation:{returnBookIdDetails.fine}</p>

                        </div>

                        <div>
                            <div className="form-check " >
                                <input className="form-check-input" type="checkbox" value="" id="verifyFine"
                                       required/>
                                <label className="form-check-label w-75" htmlFor="verifyFine">
                                    Confirm: Getting the fine amount correctly.
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <Button id={"returnBook"} keyword2={"Check-In"} submit={returnSubmit}/>
                    </form>
                </div>
                <FooterComponent/>
            </div>


    )
}
export default CheckIn;