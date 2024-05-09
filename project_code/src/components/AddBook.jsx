import {useState} from "react";
import axios from "axios";

function AddBook() {
    let CategoryID = "EDU";
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setInputs(values=>({...values,[name]:value}))
    }

    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:8081/project_01/BookManagement.php',
            inputs,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setMessage(message);
    }

    function submit() {
        (() => {
            'use strict'


            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    form.classList.add('was-validated');   //was-validated This class is commonly used in Bootstrap forms to indicate that the form has been validated.
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                        console.log("not complete");
                    }else{
                        console.log(inputs)
                        event.preventDefault()
                        updateDatabase()
                    }

                })
            })
        })()
    }

    return (
<>
    <div id="progress">
        <img src="" alt=""/>
    </div>
        <form  className="row g-3 needs-validation" noValidate>
            <div className="col-md-4">
                <label htmlFor="validationCustomUsername" className="form-label">Book ID</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">{CategoryID + " - "}</span>
                    <input type="text" className="form-control" id="validationCustomUsername"
                           aria-describedby="inputGroupPrepend" disabled required />
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">Book Name</label>
                <input type="text" className="form-control" id="validationCustom01" name="bookName" onChange={handleChange} required/>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    Please choose a valid Book Name.
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">Author Name</label>
                <input type="text" className="form-control" id="validationCustom02"  name="authorName" onChange={handleChange} required/>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    Please choose a valid Author Name.
                </div>
            </div>

            <div className="col-md-3">
                <label htmlFor="validationCustom05" className="form-label">Publisher Name</label>
                <input type="text" className="form-control" id="validationCustom05" required  name="publisherName" onChange={handleChange}/>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    Please provide a valid Publisher Name.
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustomUsername" className="form-label">ISBN Number</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="validationCustomUsername"
                           aria-describedby="inputGroupPrepend"  name="isbnNumber" onChange={handleChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please choose a valid ISBN Number.
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <label htmlFor="validationCustom04" className="form-label">Category</label>
                <select className="form-select" id="validationCustom04" required  name="category" value={inputs.category || ""} onChange={handleChange}>
                    <option value="" disabled > select Category</option>
                    <option value="Science">Science</option>
                    <option value="Romance">Romance</option>
                    <option value="IT">IT</option>
                </select>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    Please select a valid Category.
                </div>
            </div>

            <div className="col-md-4">
                <label htmlFor="validationCustomUsername" className="form-label">QTY</label>
                <div className="input-group has-validation">
                    <input type="number" className="form-control" id="validationCustomUsername"
                           aria-describedby="inputGroupPrepend"  name="number" onChange={handleChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please choose a valid quantity.
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <label htmlFor="validationCustom03" className="form-label">Description</label>
                <textarea className="form-control" id="validationCustom03" rows="4" cols="50"  name="description" onChange={handleChange}/>
            </div>



            <div className="col-12">
                <button className="btn btn-primary" type="submit" onClick={submit}>Submit form</button>
            </div>
        </form>
    <div>
        <p>Response from PHP script: {message}</p>
    </div></>
    )
}

export default AddBook;