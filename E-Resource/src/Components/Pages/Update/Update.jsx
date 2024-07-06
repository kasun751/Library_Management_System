import Navigation from "../../Navigation/Navigation.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import './Update.css';
import axios from "axios";
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";

const Update = () => {

    const location = useLocation();
    const { isbn = '', title = '', author = '', price = '',
        description = '', category = '', image_path = '', pdf_path = '' } = location.state || {};

    const [updateBook, setUpdateBook] = useState({ isbn, title, author, price, description, category, image_path, pdf_path });
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [resMessage, setResMessage] = useState('');

    useEffect(() => {
        if (isbn || title || author || price || description || category || image_path || pdf_path) {
            setUpdateBook({ isbn, title, author, price, description, category, image_path, pdf_path });
        }
    }, [isbn, title, author, price, description, category, image_path, pdf_path]);

    const updateHandle = (e) => {
        const { name, value } = e.target;
        setUpdateBook({ ...updateBook, [name]: value });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setImageFile(files[0]);
        } else if (name === 'pdf') {
            setPdfFile(files[0]);
        }
    }

    const updateDatabase = async () => {
        const formData = new FormData();
        for (const key in updateBook) {
            formData.append(key, updateBook[key]);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        try {
            const res = await axios.post(
                'http://localhost/Lbrary Management System/E-Resource_Php/Update.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setResMessage(res.data.resultMessage && 'operation success');
            console.log(res.data);
        } catch (error) {
            console.error('error: ', error);
            setResMessage('Error updating the book');
        }
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

    return (
        <>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/logout"} Link4={"Log Out"}
            />
            <div className="update_Ebook_form">
                <div className="formContainer">
                    <h2 id="add" className="outlined-text ">Update E-Book</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">ISBN Number</label>
                            <input type="text" className="form-control" id="validationCustom02" name="isbn"
                                   value={updateBook.isbn || ""} onChange={updateHandle} disabled required />
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
                                       name="price" value={updateBook.price || ""} onChange={updateHandle} required />
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
                                Please provide an Author name.
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
                            <label htmlFor="validationCustom06" className="form-label">Choose cover image to upload<br/> <small>Here Is the link for check the already uploaded cover image = </small></label>
                            {updateBook.image_path && <a href={updateBook.image_path} target="_blank" > View Existing Cover Image</a>}
                            <input type="file" className="form-control" aria-label="file example" name="image"
                                   onChange={handleFileChange} accept="image/jpeg,image/png" />
                            <div className="invalid-feedback">Please upload a Cover Image file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationCustom06" className="form-label">Choose PDF to upload<br /> <small>Here Is the link for check the already uploaded file = </small></label>
                            {updateBook.pdf_path && <a href={updateBook.pdf_path} target="_blank">View Existing PDF</a>}
                            <input type="file" className="form-control" aria-label="file example" name="pdf"
                                   onChange={handleFileChange} accept="application/pdf" />
                            <div className="invalid-feedback">Please upload a PDF file.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="button-container col-12">
                            <button className="btn btn-primary button" id="right-button" type="submit">Update E-Book</button>
                        </div>
                    </form>
                </div>
            </div>

            <FooterComponent/>
        </>
    )
}

export default Update;
