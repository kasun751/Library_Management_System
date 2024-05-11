import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AddNewBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [categoryList, setCategoryList] = useState([]);

   // const y="enabled";

    const handleChange = (e) => {
        if (e.target.name=="isbnNumber") {
            getISBNData({[e.target.name]: e.target.value});
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:8081/project_01/BookManagement.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setMessage(message);
    }

    //check isbn exists or not
    const getISBNData = async (isbnNumber) => {
        const res = await axios.post(
            'http://localhost:8081/project_01/ISBN_Data.php',
            isbnNumber,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false,"#dee2e6");
                break;
            case (message.ISBN_Number).length>0:
                inputEnable_disable(true,"red");
                    break;
            default:
                inputEnable_disable(true,"red");
            }
        setIsbnMessage(message);
        //console.log(message.ISBN_Number)
    }

    function inputEnable_disable(feedback,color){
       let inputFields = document.querySelectorAll(".feildDisabled");
        let isbnInputField = document.querySelectorAll('input');
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].disabled=feedback;
            isbnInputField[1].style.borderColor = color;
            isbnInputField[1].style.boxShadow = `2px 2px 2px ${color} `;
        }
        //inputFields.disabled=feedback;

    }

    useEffect(() => {
       axios.get('http://localhost:8081/project_01/BookManagement.php')
            .then(response => {
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
        <>
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <form className="row g-3 needs-validation" noValidate>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label" >ISBN Number</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername"
                               aria-describedby="inputGroupPrepend" name="isbnNumber"  onChange={handleChange}  required/>
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
                    <input type="text" className="form-control feildDisabled" id="validationCustom01" name="bookName"
                           placeholder={isbnMessage.BookName} onChange={handleChange}  required />
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
                           placeholder={isbnMessage.AuthorName} onChange={handleChange} required/>
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
                           placeholder={isbnMessage.PublisherName} onChange={handleChange}/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please provide a valid Publisher Name.
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Category</label>
                    <select className="form-select feildDisabled" id="validationCustom04" required name="category"
                             value={inputs.category || isbnMessage.Category || ""} onChange={handleChange}>
                        <option value="" disabled> select Category</option>
                        {categoryList.map((category, index) => (
                            <option key={index} value={category.Category_Name}>{category.Category_Name}</option>
                        ))}
                    </select>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a valid Category.
                    </div>
                    <button id="addCategory" type="button" className="btn btn-secondary"><Link to="/addBook/addCategory"> Add Book Category</Link></button>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">QTY</label>
                    <div className="input-group has-validation ">
                        <input type="number" className="form-control feildDisabled" id="validationCustomUsername"
                               placeholder={isbnMessage.AllBookQty} aria-describedby="inputGroupPrepend" name="number" onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid quantity.
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label ">Description</label>
                    <textarea className="form-control feildDisabled" id="validationCustom03" rows="4" cols="50" name="description"
                              placeholder={isbnMessage.Description}   onChange={handleChange}/>
                </div>


                <div className="col-12">
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>Submit form</button>
                </div>
            </form>
            <div>
                <p>Response from PHP script: {message}</p>
                <p>ISBN Response from PHP script: {isbnMessage.ISBN_Number}</p>
            </div>
        </>
    )
}

export default AddNewBook;