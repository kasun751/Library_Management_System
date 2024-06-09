import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import InputField from "../../SubComponents/InputFields.jsx";
import Button from "../../SubComponents/Button.jsx";

function ModifyBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [bookNameID, setNextBookID] = useState('');
    const handleChange = (e) => {
        if (e.target.name === "isbnNumber") {
            getISBNData({
                [e.target.name]: e.target.value,
                id:e.target.id}
            );
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;
        setInputs(preValues => ({...preValues, [name]: value}))
    }
// get ID
    const getBookID = async () => {
        const extendedData = {
            ...data,
            dataGetting_parameter: 1
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/GetBookIDController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        const message = await res.data.resultMessage;
        setNextBookID(message);
        //console.log(message.ISBN_Number)
    }
    useEffect(() => {
        getBookID();
    }, [data]);

    //check isbn exists or not        check this
    const getISBNData = async (isbnNumber) => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/GetIsbnDataController.php',
            isbnNumber,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        if (message && message.Category && message.Category.length > 0) {
            setData(preValues => ({...preValues,
                ["bookName"]: message.BookName,
                ["authorName"]: message.AuthorName,
                ["publisherName"]: message.PublisherName,
                ["bookLocation"]: message.BookLocation,
                ["description"]: message.Description,
                ["category"]: message.Category,
            }));
        }
        setIsbnMessage(message);
        //console.log(message.ISBN_Number)
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
                    updateBookDetails();
                    //location.reload();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    const updateBookDetails = async () => {
        const extendedData = {
            ...data,...inputs
        };
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/UpdateBookDetailsController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        const message = await res.data.resultMessage;
        await setMessage(message);
    }

    return (
        <>
            <div id="allBooksDelete">
                <div id="progress">
                    <img src="" alt=""/>
                    <h1>Update Book Details</h1>
                </div>
                <form className="row g-3 needs-validation" noValidate>
                    <InputField label={"Book Name ID"} id={"validationBookNameID"} className={"form-control"}
                                name={"bookNameID"} placeholder="Auto fill" type={"text"} value={bookNameID || ""}
                                disabled={true} handleChange={handleChange} feedback={"Book Name ID."}/>
                    <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                name={"isbnNumber"} type={"text"} handleChange={handleChange} feedback={"ISBN Number."}/>
                    <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"} name={"bookName"}
                                value={inputs.bookName !== undefined ? inputs.bookName: isbnMessage.BookName || ""}
                                type={"text"} handleChange={handleChange}  feedback={"Book Name."}/>
                    <InputField label={"Author Name"} id={"validationCustom02"} className={"form-control"} name={"authorName"}
                                value={inputs.authorName!== undefined ? inputs.authorName: isbnMessage.AuthorName || ""}
                                type={"text"} handleChange={handleChange} feedback={"Author Name."}/>

                    <InputField label={"Publisher Name"} id={"validationCustom05"} className={"form-control"} name={"publisherName"}
                                value={inputs.publisherName !== undefined ?inputs.publisherName: isbnMessage.PublisherName || ""} type={"text"} handleChange={handleChange}
                                feedback={"Publisher Name."}/>

                    <InputField label={"Book Location"} id={"validationLocation"} className={"form-control"} name={"bookLocation"}
                                value={inputs.bookLocation !== undefined ? inputs.bookLocation : isbnMessage.BookLocation || ""}
                                type={"text"} handleChange={handleChange} feedback={"Book Location."}/>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label ">Description</label>
                        <textarea className="form-control feildDisabled" id="validationCustom03" rows="4" cols="50" name="description"
                                  value={inputs.description !== undefined ? inputs.description: isbnMessage.Description || ""}   onChange={handleChange} required/>
                    </div>
                    <Button keyword2={"Modify Book"} submit={submit}/>
                </form>
                <div>
                    <p>Response from PHP script: {message}</p>
                    <p>ISBN Response from PHP script: {isbnMessage.ISBN_Number}</p>
                </div>
            </div>
        </>
    )
}
export default ModifyBook;