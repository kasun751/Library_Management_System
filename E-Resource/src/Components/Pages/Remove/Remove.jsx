import Navigation from "../../Navigation/Navigation.jsx";
import './remove.css';
import { useState ,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";

const Remove = () => {
    const location = useLocation();
    const { isbn = '', title = '', author = '' } = location.state || {};
    const [deleteBook, setDeleteBook] = useState({ isbn, title, author });
    const [resMessage, setResMessage] = useState('');




    useEffect(() => {
        if (isbn) {
            setDeleteBook({ isbn, title, author });
        }
    }, [isbn, title, author]);


    const deleteHandle = (e) => {
        const { name, value } = e.target;
        setDeleteBook({ ...deleteBook, [name]: value });

    }

    const updateDatabase = async () => {

        try {
            const res = await axios.post(
                'http://localhost/Lbrary Management System/E-Resource_Php/Remove.php',
                deleteBook,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setResMessage(res.data.resultMessage) ;
        } catch (error) {
            console.error('error: ', error);
            setResMessage('error');
        }
    }


    function submit (){
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (async () => {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
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
                    console.log(deleteBook);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()

    }

    return (
        <div>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/logout"} Link4={"Log Out"}
            />
            <div className="remove_Ebook_form">
                <div className="formContainer_remove">
                    <h2 id="add" className="outlined-text ">Remove E-Book</h2>
                    <form className="row g-3 needs-validation" noValidate onSubmit={submit}>
                        <div className="col-md-8">
                            <label htmlFor="validationCustom01" className="form-label">ISBN</label>
                            <input type="text" className="form-control" id="validationCustom01" name="isbn"
                                   onChange={deleteHandle}  value={deleteBook.isbn || ""} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid ID.
                            </div>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationCustomUsername" className="form-label">Title</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustom03" name="author"
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
                            <label htmlFor="validationCustom03" className="form-label">Author</label>
                            <input type="text" className="form-control" id="validationCustom03" name="author"
                                   onChange={deleteHandle} value={deleteBook.author || ""}  required />
                            <div className="invalid-feedback">
                                Please provide a Author name.
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="remove-button-container">
                            <button className="btn btn-primary button" id="romove-button" type="submit" onClick={submit}>Delete E-Book</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default Remove;
