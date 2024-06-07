import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import SetAvailability from "../../SubComponents/SetAvailability.jsx";
import Button from "../../SubComponents/Button.jsx";

function IssueBook(){
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [bookIdDetails, setBookIdDetails] = useState({});
    const [data, setData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [userIDDetails, setUserIDDetails] = useState({});
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



    //check isbn exists or not        check this
    const getBookIdDetails = async (bookID) => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/BookIDDataController.php',
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
            'http://localhost:8081/project_01/controllers/GetRegLibraryUserDetailsController.php',
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
        const extendedData = {
            ...data,...inputs,dateTime: getCurrentDateTime()
        };
        console.log(extendedData);
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/IssueBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        // console.log(res.data.resultMessage)
        const message = await res.data.resultMessage;
        setMessage(message);
        //console.log(message.ISBN_Number)
    }

    // console.log(bookIdDetails);
    return (
        <>
            <div id="singleBooksDelete">
                <div id="progress">
                    <img src="" alt=""/>
                    <h1>Issue Books </h1>
                </div>
                <form className="row g-3 needs-validation" noValidate>
                    <InputField label={"Book ID"} id={"validationBookID"} className={"form-control"} placeholder="Auto fill"
                                name={"bookID"} type={"text"} handleChange={handleChange} feedback={"Book ID."}/>
                    <CategoryList value={inputs.category || bookIdDetails.Category || ""} categoryList={categoryList}
                                  handleChange={handleChange}/>
                    <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"} name={"bookName"}
                                placeholder={bookIdDetails.BookName} type={"text"} handleChange={handleChange}
                                feedback={"Book Name."} disabled={true}/>
                    <InputField label={"Current availability"} id={"validationCurrentAvailability"} className={"form-control"} name={"Availability"}
                                placeholder={bookIdDetails.Availability} type={"text"} handleChange={handleChange}
                                feedback={"Current availability."} disabled={true}/>
                    <SetAvailability handleChange={handleChange}/>
                    <InputField label={"User ID"} id={"validationUserID"} className={"form-control"} name={"userID"}
                               type={"text"} handleChange={handleChange} feedback={"User ID."}/>
                    <InputField label={"Member Name"} id={"validationMemberName"} className={"form-control"}
                                name={"userName"} disabled={true} value={userIDDetails.userName || ""} type={"text"}
                                handleChange={handleChange} feedback={"Member Name."}/>

                    <Button keyword={"Issue Book"} submit={submit}/>
                </form>
                <div>
                    <p>Response from PHP script: {message}</p>
                    <p>ISBN Response from PHP script: {bookIdDetails.ISBN_Number}</p>
                </div>
            </div>
        </>
    )
}

export default IssueBook;
