import {useEffect, useState} from "react";
import axios from "axios";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import {Link} from "react-router-dom";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function CheckOut(){

    const [inputs, setInputs] = useState({});
    const [issueMessage, setIssueMessage] = useState('');
    const [bookIdDetails, setBookIdDetails] = useState({});
    const [data, setData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [userIDDetails, setUserIDDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name == "bookID") {
            getBookIdDetails({[e.target.name]: e.target.value});
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }
        if (e.target.name == "userID") {
            getUserIDDetails({[e.target.name]: e.target.value});
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    useEffect(() => {
        const storedIssueMessage = localStorage.getItem("issueMessage");
        if (storedIssueMessage) {
            setIssueMessage(storedIssueMessage);
        }
        localStorage.removeItem("issueMessage");

    }, []);


    //check isbn exists or not        check this
    const getBookIdDetails = async (bookID) => {
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/BookIDDataController.php',
            bookID,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        if (message && message.Category && message.Category.length > 0) {
            setData(preValues => ({...preValues, ["category"]: message.Category}));
        }


        let submitButton = document.getElementById("submitButton");
        let validationCurrentAvailability1 = document.getElementById("validationCurrentAvailability1");
        if (message.Availability !== "available") {
            submitButton.disabled = true;
            validationCurrentAvailability1.style.borderColor = "red";
            validationCurrentAvailability1.style.boxShadow = "2px 2px 2px red";
        } else {
            submitButton.disabled = false;
            validationCurrentAvailability1.style.borderColor = ""; // Reset to default or remove
            validationCurrentAvailability1.style.boxShadow = "";
        }


        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false, "#dee2e6");
                break;
            case (message.ISBN_Number).length > 0:
                inputEnable_disable(true);
                break;
            default:
                inputEnable_disable(true);
        }
        console.log(message)
        setBookIdDetails(message);
        //console.log(message.ISBN_Number)
    }


    const getUserIDDetails = async (userID) => {
        console.log(userID)
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/GetRegLibraryUserDetailsController.php',
            userID,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        setUserIDDetails(message)

    }

    useEffect(() => {
        axios.get('http://localhost:80/project_1/UserLogin/controllers/CategoryController.php')
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

    function submit() {
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
                    issueBook();
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

    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const issueBook = async () => {
        setLoading(true);
        const extendedData = {
            ...data,
            ...inputs,
            setAvailability: "bookIssued",
            dateTime: getCurrentDateTime()
        };
        console.log(extendedData);
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/IssueBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        console.log(res.data)
        const message = await res.data.resultMessage;
        setLoading(false);
        if (message === "true") {
            localStorage.setItem("issueMessage", "Successfully issued!");
        } else {
            localStorage.setItem("issueMessage", "Failed!");
        }
        location.reload();
    }


    return (
            <div id="checkOut" className="bookSectionCommonClass">
                {loading && <CircleSpinner/>}
                <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
                <div id="formDivIssueBook" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                        <h1>Book CheckOut</h1>
                        <p style={{
                            color: issueMessage === "Successfully issued!" ? 'yellow' : 'red',
                        }}>{issueMessage}</p>
                        <br/><br/><br/><br/>
                        <div className="row justify-content-center">
                            <h3 className=" checkoutTitles">Book Details</h3>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <InputField label={"Book ID"} id={"validationBookID1"} className={"form-control"}
                                            name={"bookID"} type={"text"} handleChange={handleChange}
                                            feedback={"Book ID."}/>
                                <InputField label={"Book Name"} id={"validationBookName1"} className={"form-control"}
                                            handleChange={handleChange}
                                            name={"bookName"} placeholder={bookIdDetails.BookName} type={"text"}
                                            feedback={"Book Name."} disabled={true}/>

                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <CategoryList value={inputs.category || bookIdDetails.Category || ""}
                                              categoryList={categoryList} handleChange={handleChange} disabled1={true}/>
                                <InputField label={"Current availability"} id={"validationCurrentAvailability1"}
                                            className={"form-control"} name={"Availability"} handleChange={handleChange}
                                            placeholder={bookIdDetails.Availability} type={"text"}
                                            feedback={"Current availability."} disabled={true}/>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <h3 className="mt-4 checkoutTitles">User Details</h3>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <InputField label={"User ID"} id={"validationUserID1"} className={"form-control"}
                                            name={"userID"}
                                            type={"text"} feedback={"User ID."} handleChange={handleChange}/>

                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                <InputField label={"Member Name"} id={"validationMemberName1"}
                                            className={"form-control"}
                                            name={"userName"} disabled={true} value={userIDDetails.userName || ""}
                                            type={"text"}
                                            feedback={"Member Name."} handleChange={handleChange}/>
                            </div>


                            <Button id="submitButton" keyword2={"CheckOut"} submit={submit}/>
                            <Link id="requestBook" className="btn btn-success" to={"/issueBook/requestList"}>View Books
                                Requests </Link>
                        </div>
                    </form>
                </div>
                <FooterComponent/>
            </div>
    )
}

export default CheckOut;