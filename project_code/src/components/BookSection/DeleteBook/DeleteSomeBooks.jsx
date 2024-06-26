import {useEffect, useState} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import './DeleteSomeBooks.css'

function IssueBook() {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [bookIdDetails, setBookIdDetails] = useState({});
    const [data, setData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const handleChange = (e) => {
        if (e.target.name == "bookID") {
            getBookIdDetails({[e.target.name]: e.target.value});
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);
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
                    deleteBook();
                    //location.reload();
                    console.log(inputs);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    const deleteBook = async () => {
        const extendedData = {
            ...data,
            delete_parameter: 1
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/DeleteBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        console.log(res.data)
        if (message === "true") {
            localStorage.setItem("message", "Delete Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }


    return (
        <div id="singleBooksDelete">
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <div id="formDivSingleBooksDelete">
                <form className="row g-3 needs-validation" noValidate>
                    <h1>Delete Single Book</h1>
                    <p style={{
                        color: message === "Delete Successfully!" ? 'green' : 'red',
                    }}>{message}</p>
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Book ID"} id={"validationBookID"} className={"form-control"}
                                        placeholder="Auto fill"
                                        name={"bookID"} type={"text"} handleChange={handleChange}
                                        feedback={"Book ID."}/>
                            <CategoryList value={inputs.category || bookIdDetails.Category || ""}
                                          categoryList={categoryList}
                                          handleChange={handleChange}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                        name={"bookName"}
                                        placeholder={bookIdDetails.BookName} type={"text"}
                                        handleChange={handleChange} disabled={true}
                                        feedback={"Book Name."}/>
                            <InputField label={"Current Availability"} id={"validationCustom01"}
                                        className={"form-control"} name={"currentAvailability"}
                                        placeholder={bookIdDetails.Availability} type={"text"} disabled={true}/>
                        </div>
                        <div className="col-12 col-xl-8">
                            <Button id={"submit"} keyword2={"Delete Book"} submit={submit}/>
                        </div>
                    </div>
                </form>
            </div>
            {/*<div>*/}
            {/*    <p>Response from PHP script: {message}</p>*/}
            {/*    <p>ISBN Response from PHP script: {bookIdDetails.ISBN_Number}</p>*/}
            {/*</div>*/}
        </div>
    )
}

export default IssueBook;
