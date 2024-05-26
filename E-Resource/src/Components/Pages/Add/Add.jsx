import './Add.css';
import Navigation from "../../HeaderContent/Navigation.jsx";
import { useState } from "react";
import axios from "axios";

function Add() {
    const [formData, setFormData] = useState({
        id: '',
        isbn: '',
        title: '',
        author: '',
        category: '',
        description: '',
        pdf: null
    });
    const [resMessage, setResMessage] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = name === 'pdf' ? e.target.files[0] : e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const updateDatabase = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const res = await axios.post(
                'http://localhost/Lbrary Management System/E-Resource_Php/Add.php',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setResMessage(res.data.resultMessage);
        } catch (error) {
            console.error('Error uploading file:', error);
            setResMessage('File upload failed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            await updateDatabase();
        }
        form.classList.add('was-validated');
    };

    return (
        <>
            <Navigation />
            <div className="formContainer">
                <h2>Add E-Book</h2>
                <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label">ID</label>
                        <input type="text" className="form-control" id="validationCustom01" name="id"
                               value={formData.id} onChange={handleChange} required />
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
                               value={formData.isbn} onChange={handleChange} required />
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
                                   value={formData.title} onChange={handleChange} required />
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
                               value={formData.author} onChange={handleChange} required />
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
                                value={formData.category} onChange={handleChange}>
                            <option value="">Open this select menu</option>
                            <option value="Education">Education</option>
                            <option value="Novels">Novels</option>
                            <option value="Fantacy">Fantacy</option>
                            <option value="Horror">Horror</option>
                        </select>
                        <div className="invalid-feedback">Please select a category.</div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationCustom05" className="form-label">Description</label>
                        <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="description"
                                  value={formData.description} onChange={handleChange} required />
                        <div className="invalid-feedback">
                            Please provide a description.
                        </div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload</label>
                        <input type="file" className="form-control" aria-label="file example" name="pdf"
                               onChange={handleChange} accept="application/pdf" required />
                        <div className="invalid-feedback">Please upload a PDF file.</div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Add Book</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Response from PHP script: {resMessage}</p>
            </div>
        </>
    );
}

export default Add;
