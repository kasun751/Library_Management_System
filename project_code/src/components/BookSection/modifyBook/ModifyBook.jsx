import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ModifyBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [bookNameID, setNextBookID] = useState('');
    const handleChange = (e) => {
        if (e.target.name === "isbnNumber") {
            getISBNData({[e.target.name]: e.target.value});
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
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Book Name ID</label>
                        <div className="input-group has-validation">
                            {/*<span className="input-group-text" id="inputGroupPrepend">{CategoryID + " - "}</span>*/}
                            <input type="text" className="form-control" id="validationCustomUsername"
                                   placeholder="Auto fill" aria-describedby="inputGroupPrepend" value={bookNameID || ""}
                                   disabled required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">ISBN Number</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="validationCustomUsername"
                                   aria-describedby="inputGroupPrepend" name="isbnNumber" onChange={handleChange}
                                   required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a valid ISBN Number.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label">Book Name</label>
                        <input type="text" className="form-control " id="validationCustom01" name="bookName"
                               value={inputs.bookName !== undefined ? inputs.bookName: isbnMessage.BookName || ""} onChange={handleChange}  required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Book Name.
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label ">Author Name</label>
                        <input type="text" className="form-control feildDisabled" id="validationCustom02" name="authorName"
                              value={inputs.authorName!== undefined ? inputs.authorName: isbnMessage.AuthorName || ""} onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid Author Name.
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="validationCustom05" className="form-label ">Publisher Name</label>
                        <input type="text" className="form-control feildDisabled" id="validationCustom05" required name="publisherName"
                               value={inputs.publisherName !== undefined ?inputs.publisherName: isbnMessage.PublisherName || ""} onChange={handleChange}/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please provide a valid Publisher Name.
                        </div>
                    </div>


                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label" >Book Location</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="validationCustomUsername"
                                   value={inputs.bookLocation !== undefined ? inputs.bookLocation : isbnMessage.BookLocation || ""} aria-describedby="inputGroupPrepend" name="bookLocation"  onChange={handleChange}  required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a valid Book Location.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label ">Description</label>
                        <textarea className="form-control feildDisabled" id="validationCustom03" rows="4" cols="50" name="description"
                                  value={inputs.description !== undefined ? inputs.description: isbnMessage.Description || ""}   onChange={handleChange} required/>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>Submit form
                        </button>
                    </div>
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