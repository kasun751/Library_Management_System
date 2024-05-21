import './Add.css'
import Navigation from "../../HeaderContent/Navigation.jsx";
import {useState} from "react";
import axios from "axios";


function Add() {
    const [formData, setFromData] = useState({});
    const [resMessage, setResMessage] = useState('');
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFromData({...formData, [name]: value})
    }
    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:/Lbrary Management System/E-Resource_Php/Add.php',

            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setResMessage(message);
        //console.log('Form submitted successfully!', message);
    }

    function submit(e) {
        (async () => {
            console.log(formData);
            'use strict'
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')
            await new Promise((resolve, reject) => {
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', event => {
                        form.classList.add('was-validated')
                        if (!form.checkValidity()) {
                            console.log("not validate")
                            event.preventDefault()
                            event.stopPropagation()
                            reject(false);
                        } else {
                            form.classList.add('was-validated')
                            event.preventDefault()
                            resolve(true);
                        }
                    })
                })
            }).then(res=>{
                if (res) {
                    console.log("database called")
                    updateDatabase();
                    // location.reload();
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
            <Navigation/>
            <div className="formContainer">
                <h2>Add E-Book</h2>
                <form className="row g-3 needs-validation" noValidate>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label">ID</label>
                        <input type="text" className="form-control" id="validationCustom01" name="id"
                               placeholder={formData.id} onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter a valid ID.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">ISBN Number</label>
                        <input type="text" className="form-control" id="validationCustom02" name="isbn"
                               placeholder={formData.isbn} onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter a ISBN number.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Title</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="validationCustomUsername" name="title"
                                   placeholder={formData.title} onChange={handleChange} required/>
                            <div className="invalid-feedback">
                                Please enter a Book Title.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Author</label>
                        <input type="text" className="form-control" id="validationCustom03" name="author"
                               placeholder={formData.author} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Please provide a Author name.
                        </div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom04" className="form-label">Category</label>
                        <select className="form-select" required aria-label="select example" name="category"
                                value={formData.category || ""} onChange={handleChange}>
                            <option value="">Open this select menu</option>
                            <option value="Education">Education</option>
                            <option value="Novels">Novels</option>
                            <option value="Fantacy">Fantacy</option>
                            <option value="Horror">Horror</option>

                        </select>
                        <div className="invalid-feedback">Example invalid select feedback</div>

                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationCustom05" className="form-label">Description</label>
                        <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="description"
                                  placeholder={formData.description} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Please provide Desciption.
                        </div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    {/*<div className="mb-3">*/}
                    {/*    <input type="file" className="form-control" aria-label="file example" name="pdf"*/}
                    {/*           onChange={handleChange} required/> /!*value={formData.pdf}*!/*/}
                    {/*    <div className="invalid-feedback">Example invalid form file feedback</div>*/}
                    {/*</div>*/}

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={submit}>Submit form</button>
                    </div>
                </form>
            </div>

            <div>
                <p>Response from PHP script:{resMessage} </p>
            </div>
        </>
    )
}

export default Add;