import Navigation from "../../HeaderContent/Navigation.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Update = () =>{

    const location = useLocation();
    const { isbn = '', title = '', author = '',price='',description='' ,category=''} = location.state || {};

    const [updateBook, setUpdateBook]=useState({isbn,title,author,price,description,category});

    useEffect(() => {
        if (isbn || title || author || price || description || category) {
            setUpdateBook({ isbn, title, author ,price,description,category});
        }
    }, [isbn, title, author,price,description,category]);

    const updateHandle = (e) => {
        const { name, value } = e.target;
        setUpdateBook({ ...updateBook, [name]: value });

    }

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

    return(
        <>
            <Navigation />
            <div className="formContainer">
                <h2>Add E-Book</h2>
                <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">ISBN Number</label>
                        <input type="text" className="form-control" id="validationCustom02" name="isbn"
                               value={updateBook.isbn || ""} onChange={updateHandle} required />
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
                                   value={updateBook.title || ""} onChange={updateHandle} required />
                            <div className="invalid-feedback">
                                Please enter a Book Title.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Price</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">Rs:</span>
                            <input type="text" className="form-control" id="validationCustomUsername" placeholder="1500.00"
                                   name="price" value={updateBook.price || ""} onChange={updateHandle} required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a price.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Author</label>
                        <input type="text" className="form-control" id="validationCustom03" name="author"
                               value={updateBook.author || ""} onChange={updateHandle} required />
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
                                value={updateBook.category || ""} onChange={updateHandle}>
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
                                  value={updateBook.description || ""} onChange={updateHandle} required />
                        <div className="invalid-feedback">
                            Please provide a description.
                        </div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload</label>
                        <input type="file" className="form-control" aria-label="file example" name="image"
                               onChange={updateHandle} accept="image/jpeg,image/png" required />
                        <div className="invalid-feedback">Please upload a Cover Image file.</div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload</label>
                        <input type="file" className="form-control" aria-label="file example" name="pdf"
                               onChange={updateHandle} accept="application/pdf" required />
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
                <p>Response from PHP script: {}</p>
            </div>
        </>
    )
}

export default Update;