import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import './DeleteSomeBooks.css'
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function IssueBook() {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [bookIdDetails, setBookIdDetails] = useState({});
    const [data, setData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        if (e.target.name == "bookID") {
            getBookIdDetails({ [e.target.name]: e.target.value });
            setData(preValues => ({ ...preValues, [e.target.name]: e.target.value }));
        }

        const name = e.target.name;
        const value = e.target.value;

        setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        setInputs(preValues => ({ ...preValues, [name]: value }))
       
    }

    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);

    const getBookIdDetails = async (bookID) => {
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/BookIDDataController.php',
            bookID,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        const message = await res.data;
        if (message && message.Category && message.Category.length > 0) {
            setData(preValues => ({ ...preValues, ["category"]: message.Category }));
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
        console.log(message)
        setBookIdDetails(message);
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
                    console.log(inputs);
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
        console.log(data)
        const extendedData = {
            ...data,
            delete_parameter: 1
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
        console.log(res.data)
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
            <div id="singleBooksDelete" className="bookSectionCommonClass">
                {loading && <CircleSpinner />}
                <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""} />
                <div id="formDivSingleBooksDelete" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                        <h1>Delete Single Book</h1>
                        <p style={{
                            color: message === "Delete Successfully!" ? 'yellow' : 'red',
                        }}>{message}</p>
                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-md-6 col-sm-12">
                                <InputField label={"Book ID"} id={"validationBookID"} className={"form-control"}
                                            placeholder="Auto fill"
                                            name={"bookID"} type={"text"} handleChange={handleChange}
                                            feedback={"Book ID."} />
                                <CategoryList value={inputs.category || bookIdDetails.Category || ""}
                                              categoryList={categoryList}
                                              handleChange={handleChange} />
                            </div>
                            <div className="col-xl-4 col-md-6 col-sm-12">
                                <InputField label={"Reson for Delete"} id={"rForDelete"} className={"form-control"}
                                            name={"rForDelete"} type={"text"} handleChange={handleChange} feedback={"Reason"}
                                            />
                                <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                            name={"bookName"}
                                            placeholder={bookIdDetails.BookName} type={"text"}
                                            handleChange={handleChange} disabled={true}
                                            feedback={"Book Name."} />
                                
                            </div>
                            <div className="col-12 col-xl-8">
                                <Button id={"submit"} keyword2={"Delete Book"} submit={submit} />
                            </div>
                        </div>
                    </form>
                </div>
                <FooterComponent />
            </div>

            {/* Confirmation Modal */}
<div
  className="modal fade show"
  id="deleteConfirmationModal"
  tabIndex="-1"
  role="dialog"
  style={{ display: showModal ? 'block' : 'none' }}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <div className="modal-header" style={{ borderBottom: '1px solid #ccc' }}>
        <h5 className="modal-title" style={{ color: '#333' }}>Confirm Delete</h5>
        <button
          type="button"
          className="close"
          onClick={handleCloseModal}
          aria-label="Close"
          style={{ color: '#333' }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="bookDetailsConfirmation">
          <div className="row">
            <div className="col-sm-6">
              <p>
                <strong style={{ color: '#333' }}>Book ISBN:</strong> {bookIdDetails.ISBN_Number}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
              <strong style={{ color: '#333' }}>Book Category:</strong> {bookIdDetails.Category}
              </p>
            </div>
            <div className="col-sm-12">
              <p>
              <strong style={{ color: '#333' }}>Book Name:</strong> {bookIdDetails.BookName}
              </p>
            </div>
          </div>
        </div>
        <h6 className="text-danger">
          Are you sure you want to delete this book?
        </h6>
      </div>
      <div className="modal-footer" style={{ borderTop: '1px solid #ccc' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCloseModal}
          style={{ backgroundColor: '#6c757d', color: '#fff' }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleConfirmDelete}
          style={{ backgroundColor: '#dc3545', color: '#fff' }}
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

export default IssueBook;
