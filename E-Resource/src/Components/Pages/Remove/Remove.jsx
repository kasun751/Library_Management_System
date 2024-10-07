import Navigation from "../../Navigation/Navigation.jsx";
import './remove.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import { Button, Modal } from "react-bootstrap";

const Remove = () => {
    const location = useLocation();
    const { isbn = '', title = '',volume ='',version = '', author = '' } = location.state || {};
    const [deleteBook, setDeleteBook] = useState({ isbn, title, volume, version, author });
    const [resMessage, setResMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isbn) {
            setDeleteBook({ isbn, title, volume,version, author });
        }
    }, [isbn, title,volume,version, author]);

    const deleteHandle = (e) => {
        const { name, value } = e.target;
        setDeleteBook({ ...deleteBook, [name]: value });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/Controllers/RemoveBookController.php',
                deleteBook,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data); // Check response from server
            alert(res.data.resultMessage);
        } catch (error) {
            console.error('error: ', error);
            alert('An error occurred while trying to delete the book.');
        } finally {
            setShowModal(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        handleDelete(e);
    };

    return (
        <div>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/logout"} Link4={"Log Out"}
            />
            <div className="remove_Ebook_form">
                <div className="formContainer_remove">
                    <h2 id="add" className="outlined-text">Remove E-Book</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={submit}>
                        <div className="col-md-8">
                            <label htmlFor="validationCustom01" className="form-label">ISBN</label>
                            <input type="text" className="form-control" id="validationCustom01" name="isbn"
                                   onChange={deleteHandle} value={deleteBook.isbn || ""} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid ISBN.
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationCustomUsername" className="form-label">Title</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustom03" name="title"
                                       onChange={deleteHandle} value={deleteBook.title || ""} required />
                                <div className="invalid-feedback">
                                    Please enter a Book Title.
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationCustomUsername" className="form-label">Volume</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustom03" name="volume"
                                       onChange={deleteHandle} value={deleteBook.volume || ""} required />
                                <div className="invalid-feedback">
                                    Please enter a Book Title.
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationCustomUsername" className="form-label">Version</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustom03" name="version"
                                       onChange={deleteHandle} value={deleteBook.version || ""}/>
                                {/*<div className="invalid-feedback">*/}
                                {/*    Please enter a Book Title.*/}
                                {/*</div>*/}
                                {/*<div className="valid-feedback">*/}
                                {/*    Looks good!*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationCustom03" className="form-label">Author(s)</label>
                            <input type="text" className="form-control" id="validationCustom03" name="author"
                                   onChange={deleteHandle} value={deleteBook.author || ""}  />
                            {/*<div className="invalid-feedback">*/}
                            {/*    Please provide an Author name.*/}
                            {/*</div>*/}
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                        </div>
                        <div className="remove-button-container">
                            <button className="btn btn-primary button" id="remove-button" type="submit">Delete E-Book</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this book?</p>
                    <div style={{ marginLeft: '15px' }}>
                        <p><strong>Book Title:</strong> {deleteBook.title}</p>
                        <p><strong>ISBN:</strong> {deleteBook.isbn}</p>
                        <p><strong>Author:</strong> {deleteBook.author}</p>
                        <p><strong>Volume:</strong> {deleteBook.volume}</p>
                        <p><strong>Version:</strong> {deleteBook.version}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <FooterComponent />
        </div>
    );
};

export default Remove;
