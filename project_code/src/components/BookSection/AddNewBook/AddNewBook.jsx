import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './AddNewBook.css'
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import SetAvailability from "../../SubComponents/SetAvailability.jsx";
import Button from "../../SubComponents/Button.jsx";

function AddNewBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [categoryList, setCategoryList] = useState([]);

    // const y="enabled";

    const handleChange = (e) => {
        if (e.target.name == "isbnNumber") {
            getISBNData({
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            );
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/AddNewBookController.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        console.log(res.data)
        await setMessage(message);
    }

    //check isbn exists or not
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
        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false, "#dee2e6");
                break;
            case (message.ISBN_Number).length > 0:
                inputEnable_disable(true, "red");
                break;
            default:
                inputEnable_disable(true, "red");
        }
        setIsbnMessage(message);
        //console.log(message.ISBN_Number)
    }

    function inputEnable_disable(feedback, color) {
        let inputFields = document.querySelectorAll(".feildDisabled");
        let isbnInputField = document.querySelectorAll('input');
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].disabled = feedback;
            isbnInputField[1].style.borderColor = color;
            isbnInputField[1].style.boxShadow = `2px 2px 2px ${color} `;
        }
        //inputFields.disabled=feedback;

    }

    useEffect(() => {
        axios.get('http://localhost:8081/project_01/controllers/CategoryController.php')
            .then(response => {
                console.log(response.data)
                setCategoryList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

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
                    updateDatabase();
                    // location.reload();
                    console.log(inputs);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    return (

        <div id="addNewBook">
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <div id="formDiv">
                <form className="row g-3 needs-validation" noValidate>
                    <h1>Add New Book</h1>
                    <div className="row">
                        <div className="col-xl-4 col-md-6" >
                            <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                        name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                        feedback={"ISBN Number."}/>
                            <InputField label={"Publisher Name"} id={"validationCustom05"} className={"form-control"}
                                        name={"publisherName"}
                                        placeholder={isbnMessage.PublisherName} type={"text"}
                                        handleChange={handleChange}
                                        feedback={"Publisher Name."}/>
                            <InputField label={"Book Location"} id={"validationLocation"} className={"form-control"}
                                        name={"bookLocation"}
                                        placeholder={isbnMessage.BookLocation} type={"text"} handleChange={handleChange}
                                        feedback={"Book Location."}/>

                        </div>


                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                        name={"bookName"}
                                        placeholder={isbnMessage.BookName} type={"text"} handleChange={handleChange}
                                        feedback={"Book Name."}/>

                            <CategoryList value={inputs.category || isbnMessage.Category || ""}
                                          categoryList={categoryList}
                                          handleChange={handleChange}/>

                            <button id="addCategory" type="button" className="btn btn-secondary"><Link
                                to="/addBook/addCategory"> Add New Book Category</Link></button>
                        </div>

                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Author Name"} id={"validationCustom02"} className={"form-control"}
                                        name={"authorName"}
                                        placeholder={isbnMessage.AuthorName} type={"text"} handleChange={handleChange}
                                        feedback={"Author Name."}/>


                            <InputField label={"QTY"} type={"number"} className={"form-control feildDisabled"}
                                        handleChange={handleChange}
                                        name={"qty"} placeholder={isbnMessage.AllBookQty} id={"validationQty"}
                                        feedback={"quantity."}/>

                            <SetAvailability handleChange={handleChange} parameter="addBook" keyword1={"Available Now"}
                                             keyword2={"Still Not Added To Library"}/>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="validationCustom03" className="form-label ">Description</label>
                            <textarea className="form-control feildDisabled" id="validationCustom03" rows="4" cols="50"
                                      name="description"
                                      placeholder={isbnMessage.Description} onChange={handleChange} required/>
                            <Button id={"submit"} keyword2={"Add Book"} submit={submit}/>
                        </div>
                    </div>


                </form>
            </div>
            <div>
                <p>Response from PHP script: {message}</p>
                <p>ISBN Response from PHP script: {isbnMessage.ISBN_Number}</p>
            </div>
        </div>
    )
}

export default AddNewBook;