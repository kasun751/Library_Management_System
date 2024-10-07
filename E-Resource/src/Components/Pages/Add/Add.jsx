import './Add.css';
import { useState } from "react";
import axios from "axios";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";

function Add() {
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        price: '',
        volume:'',
        version:'',
        author: '',
        category: '',
        description: '',
        image:null,
        pdf: null,
        citations:''
    });
    const [resMessage, setResMessage] = useState('');

    const handleChange = async (e) => {
        const name = e.target.name;
        let value;
        if (name === 'image' || name === 'pdf') {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }
        setFormData({ ...formData, [name]: value });

        // Check if the ISBN or title field is updated and fetch book data
        if (name === 'isbn' || name === 'title') {
            await fetchBookData(value, name);
        }
    };

    const fetchBookData = async (query, type) => {
        try {
            let searchQuery = '';
            if (type === 'isbn') {
                searchQuery = `isbn:${query}`;
            } else if (type === 'title') {
                searchQuery = `intitle:${query}`;
            }

            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyAgwncdGLmMwKCy0yFYIeK2z_WO_DaGRjg`
            );

            if (response.data.items && response.data.items.length > 0) {
                const book = response.data.items[0].volumeInfo;
                const industryIdentifiers = book.industryIdentifiers || [];


                const isbn = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier ||
                    industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')?.identifier || '';


                setFormData({
                    ...formData,
                    isbn: isbn || formData.isbn,
                    title: book.title || formData.title,
                    author: book.authors ? book.authors.join(', ') : formData.author,
                    description: book.description || formData.description,
                    category: book.categories ? book.categories[0] : formData.category,
                    price: formData.price,
                    volume: book.volume || formData.volume,
                    version: book.version || formData.version
                });
            }
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    const updateDatabase = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
            //File inputs like image and pdf can be added to FormData as File objects, which allows their binary data to be uploaded.
        }

        try {
            const res = await axios.post(
                'http://localhost/Lbrary Management System/E-Resource_Php/Controllers/AddBookController.php',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setResMessage(res.data.resultMessage && 'operation success');
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

            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/logout"} Link4={"Log Out"}
            />

        <div className="add_Ebook_form">
            <div className="formContainer">
                <h2 id="add" className="outlined-text ">Add E-Book</h2>
                <h2 style={{color:'yellow'}}>{resMessage}</h2>
                <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
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
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Price</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">Rs:</span>
                            <input type="text" className="form-control" id="validationCustomUsername" placeholder="1500.00"
                                   name="price" value={formData.price} onChange={handleChange} required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a price.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Volume</label>
                        <input type="text" className="form-control" id="validationCustom03" name="volume"
                               value={formData.volume} onChange={handleChange}/>
                        {/*<div className="invalid-feedback">*/}
                        {/*    Please provide a Author name.*/}
                        {/*</div>*/}
                        {/*<div className="valid-feedback">*/}
                        {/*    Looks good!*/}
                        {/*</div>*/}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Version</label>
                        <input type="text" className="form-control" id="validationCustom03" name="version"
                               value={formData.version} onChange={handleChange}  />
                        {/*<div className="invalid-feedback">*/}
                        {/*    Please provide a Author name.*/}
                        {/*</div>*/}
                        {/*<div className="valid-feedback">*/}
                        {/*    Looks good!*/}
                        {/*</div>*/}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Author(s)</label>
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
                        <input type="text" className="form-control" id="validationCustom04" name="category"
                               value={formData.category} onChange={handleChange} required />
                        {/*<select className="form-select" required aria-label="select example" name="category"*/}
                        {/*        value={formData.category} onChange={handleChange}>*/}
                        {/*    <option value="">Open this select menu</option>*/}
                        {/*    <option value="Education">Education</option>*/}
                        {/*    <option value="Novels">Novels</option>*/}
                        {/*    <option value="Fantacy">Fantacy</option>*/}
                        {/*    <option value="Horror">Horror</option>*/}
                        {/*</select>*/}
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
                        <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload</label>
                        <input type="file" className="form-control" aria-label="file example" name="image"
                               onChange={handleChange} accept="image/jpeg,image/png" required />
                        <div className="invalid-feedback">Please upload a Cover Image file.</div>
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
                        <label htmlFor="validationCustom05" className="form-label">Citations</label>
                        <textarea cols="30" rows="5" className="form-control" id="validationCustom05" name="citations"
                                  value={formData.citations} onChange={handleChange} />
                        {/*<div className="invalid-feedback">*/}
                        {/*    Please provide a description.*/}
                        {/*</div>*/}
                        {/*<div className="valid-feedback">*/}
                        {/*    Looks good!*/}
                        {/*</div>*/}
                    </div>
                    <div className="button-container col-12">
                        <button className="btn btn-primary button" id="right-button" type="submit">Add E-Book</button>
                    </div>
                </form>
            </div>
        </div>

            <FooterComponent/>
        </>
    );
}

export default Add;
