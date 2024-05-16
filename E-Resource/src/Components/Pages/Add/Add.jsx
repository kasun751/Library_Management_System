import './Add.css'
import Navigation from "../../HeaderContent/Navigation.jsx";
import {useState} from "react";
import axios from "axios";


function Add() {
    const [formData,setFromData]=useState({
        id:'',
        isbn:'',
        title:'',
        author:'',
        category:'',
        description:'',
        // pdf:'',
    });

    const handleChange = (e)=>{
        const {name,value}=e.target;
        setFromData({
                ...formData,
                [name]: value
            }
        )
    }

    function submit(e) {
        console.log(formData);
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (async () => {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')
            e.preventDefault();
            axios.post('http://localhost:5173/src/Components/Php/Add.php',formData,

                {headers: {
                        'Content-Type': 'application/json'
                    }}

            )
                .then(response => {
                    console.log('Form submitted successfully!', response.data.resultMessage);

                    setFromData({
                        id:'',
                        isbn:'',
                        title:'',
                        author:'',
                        category:'',
                        description:'',
                        // pdf:'',
                    });
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        })()

    }
   return(
       <>
       <Navigation/>
       <div className="formContainer">
           <h2>Add E-Book</h2>
       <form className="row g-3 needs-validation"  noValidate >
           <div className="col-md-4">
               <label htmlFor="validationCustom01" className="form-label">ID</label>
               <input type="text" className="form-control" id="validationCustom01" name="id" value={formData.id} onChange={handleChange} required/>
                   <div className="valid-feedback">
                       Looks good!
                   </div>
               <div className="invalid-feedback">
                   Please enter a valid ID.
               </div>
           </div>
           <div className="col-md-4">
               <label htmlFor="validationCustom02" className="form-label">ISBN Number</label>
               <input type="text" className="form-control" id="validationCustom02" name="isbn" value={formData.isbn} onChange={handleChange} required/>
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
                   <input type="text" className="form-control" id="validationCustomUsername" name="title" value={formData.title} onChange={handleChange} required/>
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
               <input type="text" className="form-control" id="validationCustom03" name="author" value={formData.author} onChange={handleChange} required/>
                   <div className="invalid-feedback">
                       Please provide a Author name.
                   </div>
               <div className="valid-feedback">
                   Looks good!
               </div>
           </div>
           <div className="col-md-6">
               <label htmlFor="validationCustom04" className="form-label">Category</label>
               <select className="form-select" required aria-label="select example" name="category" value={formData.category} onChange={handleChange} >
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
               <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="description" value={formData.description} onChange={handleChange} required/>
                   <div className="invalid-feedback">
                       Please provide Desciption.
                   </div>
               <div className="valid-feedback">
                   Looks good!
               </div>
           </div>

           <div className="mb-3">
               <input type="file" className="form-control" aria-label="file example" name="pdf"  onChange={handleChange} required/>    {/*value={formData.pdf}*/}
                   <div className="invalid-feedback">Example invalid form file feedback</div>
           </div>

           <div className="col-12">
               <button className="btn btn-primary" type="submit" onClick={submit}>Submit form</button>
           </div>
       </form>
       </div>

           <div>
               <p>Response from PHP script: </p>
           </div>
       </>
       )
}

export default Add;