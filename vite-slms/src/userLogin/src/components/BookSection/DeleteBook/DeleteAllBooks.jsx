import {useState, useEffect} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import './DeleteAllBooks.css';
import FooterComponent from "../../Footer/FooterComponent.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";

function DeleteAllBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [bookNameID, setNextBookID] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        if (e.target.name == "isbnNumber") {
            getISBNData({
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            );
        }
        setData(preValues => ({...preValues, [e.target.name]: e.target.value}));

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))

    }
    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);
// get ID
    const getBookID = async () => {
        const extendedData = {
            ...data,
            dataGetting_parameter: 1
        };
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/GetBookIDController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        const message = await res.data.resultMessage;
        setNextBookID(message);
        //console.log(message.ISBN_Number)
    }
    useEffect(() => {
        getBookID();
    }, [data]);

    //check isbn exists or not        check this
    const getISBNData = async (isbnNumber) => {
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/GetIsbnDataController.php',
            isbnNumber,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        if (message && message.Category && message.Category.length > 0) {
            setData(preValues => ({...preValues, ["category"]: message.Category}));
        }
        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false, "#dee2e6");
                break;
            case (message.ISBN_Number).length > 0:
                inputEnable_disable(true);
                break;
            default:
                inputEnable_disable(true);
        }
        setIsbnMessage(message);
        console.log(message)
    }
    useEffect(() => {
        axios.get('http://localhost:80/project_1/UserLogin/controllers/CategoryController.php')
            .then(response => {
                setCategoryList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    function inputEnable_disable(feedback) {
        let inputFields = document.querySelector(".feildDisabled");
        inputFields.disabled = feedback;
    }

    function submit() {
        (async () => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')


            await new Promise((resolve, reject) => {
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', event => {
                        form.classList.add('was-validated');

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
                    handleDeleteClick();
                    //location.reload();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }


    const deleteBook = async () => {
        setLoading(true);
        const extendedData = {
            ...data,
            delete_parameter: 0
        };
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/DeleteBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        const message = await res.data.resultMessage;
        setLoading(false);
        if (message === "true") {
            localStorage.setItem("message", "Delete Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }
    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        deleteBook();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div id="allBooksDelete " className="bookSectionCommonClass">
                {loading && <CircleSpinner/>}
                <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
                <div id="formDivAllBookDelete" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                        <h1>Delete All Books Relevant To ISBN</h1>
                        <p style={{
                            color: message === "Delete Successfully!" ? 'yellow' : 'red',
                        }}>{message}</p>
                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-md-6 col-sm-12">
                                <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                            name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                            feedback={"ISBN Number."}/>


                                <CategoryList value={inputs.category || isbnMessage.Category || ""}
                                              categoryList={categoryList}
                                              handleChange={handleChange}/>
                            </div>
                            <div className="col-xl-4 col-md-6 col-sm-12">
                                <InputField label={"Reson for Delete"} id={"rForDelete"} className={"form-control"}
                                            name={"rForDelete"} type={"text"} handleChange={handleChange}
                                            feedback={"Reason"}
                                />
                                <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                            name={"bookName"}
                                            placeholder={isbnMessage.BookName} type={"text"} handleChange={handleChange}
                                            disabled={true}
                                            feedback={"Book Name."}/>
                            </div>
                            <div className="col-12 col-xl-8">
                                <Button id={"submit"} keyword2={"Delete Book"} submit={submit} className="w-100"/>
                            </div>
                        </div>
                    </form>
                </div>
                <FooterComponent/>
            </div>


            {/* Confirmation Modal */}
            <div
                className="modal fade show"
                id="deleteConfirmationModal"
                tabIndex="-1"
                role="dialog"
                style={{display: showModal ? "block" : "none"}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                        <div className="modal-header" style={{borderBottom: '1px solid #ccc'}}>
                            <button
                                type="button"
                                className="close"
                                onClick={handleCloseModal}
                                aria-label="Close"
                                style={{color: '#333'}}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" style={{color: '#333'}}>Confirm Delete</h5>
                        </div>
                        <div className="modal-body">
                            <div className="bookDetailsConfirmation">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p>
                                            <strong style={{color: '#333'}}>Book
                                                ISBN:</strong> {isbnMessage.ISBN_Number}
                                        </p>
                                        <p>
                                            <strong style={{color: '#333'}}>Book Name:</strong> {isbnMessage.BookName}
                                        </p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>
                                            <strong style={{color: '#333'}}>Deleting Book
                                                Quantity:</strong> {isbnMessage.allBooksQty}
                                        </p>
                                        <p>
                                            <strong style={{color: '#333'}}>Book
                                                Category:</strong> {isbnMessage.Category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-danger">
                                Are you sure you want to delete all books?
                            </h6>
                        </div>
                        <div className="modal-footer" style={{borderTop: '1px solid #ccc'}}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseModal}
                                style={{backgroundColor: '#6c757d', color: '#fff'}}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleConfirmDelete}
                                style={{backgroundColor: '#dc3545', color: '#fff'}}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteAllBook;