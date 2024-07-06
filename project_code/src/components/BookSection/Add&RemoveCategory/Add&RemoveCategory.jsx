import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import './Add&RemoveCategory.css';
import CategoryList from "../../SubComponents/CategoryList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Link} from "react-router-dom";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function AddRemoveCategory() {
    const [inputs, setInputs] = useState({});
    const [addMessage, setAddMessage] = useState('');
    const [removeMessage, setRemoveMessage] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    useEffect(() => {
        axios.get('http://localhost:8081/project_01/controllers/CategoryController.php')
            .then(response => {
                console.log(response.data);
                setCategoryList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    useEffect(() => {
        const storedAddMessage = localStorage.getItem("categoryAddMessage");
        const storedRemoveMessage = localStorage.getItem("categoryRemoveMessage");
        if (storedAddMessage) {
            setAddMessage(storedAddMessage);
            localStorage.removeItem("categoryAddMessage");
        } else if (storedRemoveMessage) {
            setRemoveMessage(storedRemoveMessage);
            localStorage.removeItem("categoryRemoveMessage");
            if (storedRemoveMessage === 'tableNotEmpty') {
                setShowModal(true);
                setShowOverlay(true); // Show overlay when modal is shown
            }
        }
    }, []);

    const updateDatabase = async (access) => {
        setLoading(true);
        const extendedData = {
            ...inputs,
            access_parameter: access
        };
        console.log(extendedData);
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/CategoryController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const message = await res.data.resultMessage;
        setLoading(false);
        console.log(res.data.resultMessage);
        if (message === "add") {
            localStorage.setItem("categoryAddMessage", "Category Added Successfully.");
        } else if (message === "notAdd") {
            localStorage.setItem("categoryAddMessage", "Category Not Added!");
        } else if (message === "remove") {
            localStorage.setItem("categoryRemoveMessage", "Category remove Successfully.");
        } else if (message === "notRemove") {
            localStorage.setItem("categoryRemoveMessage", "Category Not Removed");
        } else if (message === 'tableNotEmpty') {
            localStorage.setItem("categoryRemoveMessage", "tableNotEmpty");
        }
        console.log(res.data);
        window.location.reload(); // This reloads the page
    };

    const submit = (access) => {
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                form.classList.add('was-validated');
                if (form.checkValidity()) {
                    updateDatabase(access);
                } else {
                    console.log("Form validation failed");
                }
            });
        });
    };

    return (
        <div id="categoryAddAndRemove" className="bookSectionCommonClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""}/>
            <div id="formDivCategoryAddAndRemove" className="bookSectionCommonFormClass">
                <form className="row g-3 needs-validation" noValidate>
                    <h1>Add </h1>
                    <InputField
                        type={"text"}
                        className={"form-control"}
                        label="Enter Category"
                        id="validationCustomUsername"
                        name="addCategory"
                        value={inputs.addCategory || ""}
                        handleChange={handleChange}
                        required={true}
                        feedback="Please choose a valid ISBN Number."
                    />
                    <div className="d-flex justify-content-end w-100">
                        <button
                            id={"submit"}
                            className="btn btn-primary feildDisabled add"
                            type="submit"
                            onClick={() => submit("add")}
                        >
                            Add Category
                        </button>
                    </div>
                    <div>
                        {addMessage && (
                            <p
                                id="categoryAddingResponse"
                                style={{
                                    display: 'initial',
                                    color: addMessage === "Category Added Successfully." ? 'green' : 'red',
                                }}
                            >
                                {addMessage}
                            </p>
                        )}
                    </div>
                </form>
                <hr/>
                <form className="row g-3 needs-validation">
                    <h1>Remove</h1>
                    <CategoryList
                        value={inputs.category || ""}
                        categoryList={categoryList}
                        handleChange={handleChange}
                    />
                    <div className="d-flex justify-content-end w-100">
                        <button
                            id={"submit"}
                            className="btn btn-primary feildDisabled remove"
                            type="submit"
                            onClick={() => submit("add")}
                        >
                            Remove Category
                        </button>
                    </div>
                    <div>
                        {removeMessage && removeMessage !== 'tableNotEmpty' && (
                            <p
                                id="categoryRemoveResponse"
                                style={{
                                    display: 'initial',
                                    color: removeMessage === "Category remove Successfully." ? 'green' : 'red',
                                }}
                            >
                                {removeMessage}
                            </p>
                        )}
                    </div>
                </form>
            </div>
            {showOverlay && (
                <div className={`category-dark-overlay ${showOverlay ? 'show' : ''}`}
                     onClick={() => setShowOverlay(false)}></div>
            )}
            {removeMessage && removeMessage === 'tableNotEmpty' && (
                <div id="categoryModel" style={{display: 'initial'}}>
                {showModal && (
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-dark text-white">
                                    <div className="modal-header border-secondary">
                                        <h5 className="modal-title">Cannot Delete!!!</h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            aria-label="Close"
                                            onClick={() => {
                                                setShowModal(false);
                                                setShowOverlay(false);
                                            }}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            This Category Has Many Books. Then You Cannot Directly Delete These Books. If You Want To Delete This Category, Firstly Delete Books. After You Can Delete This Category.
                                        </p>
                                    </div>
                                    <div className="modal-footer border-secondary">
                                        <button type="button" className="btn btn-primary">
                                            <Link id="goToDelete" to="/deleteBook" className="text-white">Go To Delete Book Section</Link>
                                        </button>
                                        <button id="understood"
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setShowModal(false);
                                                    setShowOverlay(false);
                                                }}
                                        >
                                            Understood
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <FooterComponent/>
        </div>
    );
}

export default AddRemoveCategory;
