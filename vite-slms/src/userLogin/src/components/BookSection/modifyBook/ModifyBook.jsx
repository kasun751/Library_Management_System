import {useEffect, useState} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import Button from "../../SubComponents/Button.jsx";
import './ModifyBook.css'
import FooterComponent from "../../Footer/FooterComponent.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";

function ModifyBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [bookNameID, setNextBookID] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "isbnNumber") {
            getISBNData({
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            );
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

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
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/GetBookIDController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
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
            setData(preValues => ({
                ...preValues,
                ["bookName"]: message.BookName,
                ["authorName"]: message.AuthorName,
                ["publisherName"]: message.PublisherName,
                ["bookLocation"]: message.BookLocation,
                ["description"]: message.Description,
                ["category"]: message.Category,
                ["citations"]: message.citation,
                ["version"]: message.version,
                ["volume"]: message.volume,
                ["acquisitionMethod"]: message.acquisitionMethod,
            }));
        }
        setIsbnMessage(message);
        //console.log(message.ISBN_Number)
    }

    function submit() {
        (async () => {
            'use strict'


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
                    updateBookDetails();
                    //location.reload();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    const updateBookDetails = async () => {
        setLoading(true);
        const extendedData = {
            ...data, ...inputs
        };
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/UpdateBookDetailsController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        const message = await res.data.resultMessage;
        setLoading(false);
        if (message === "true") {
            localStorage.setItem("message", "Update Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }

    return (
        <>
            <div id="modifyBook" className="bookSectionCommonClass">
                {loading && <CircleSpinner/>}
                <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
                <div id="formDivModifyBook" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                        <h1>Update Book Details</h1>
                        <p style={{
                            color: message === "Update Successfully!" ? 'yellow' : 'red',
                        }}>{message}</p>
                        <div className="row justify-content-center" >
                            <div className="col-xl-5 col-md-6 col-sm-12" >
                                <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                            name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                            feedback={"ISBN Number."}/>

                                <InputField label={"Author Name"} id={"validationCustom02"} className={"form-control"}
                                            name={"authorName"}
                                            value={inputs.authorName !== undefined ? inputs.authorName : isbnMessage.AuthorName || ""}
                                            type={"text"} handleChange={handleChange} feedback={"Author Name."}/>
                               <InputField label={"Version"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"version"} value={inputs.version !== undefined ? inputs.version :isbnMessage.version} id={"version"}
                                        feedback={"version."}/>
                                <InputField label={"Volume"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"volume"} value={inputs.volume !== undefined ? inputs.volume :isbnMessage.volume} id={"volume"}
                                        feedback={"Volume."}/>
                                <label htmlFor="validationCustom03" className="form-label ">Description</label>
                                <textarea className="form-control feildDisabled" id="validationCustom03" rows="4"
                                          cols="50" name="description"
                                          value={inputs.description !== undefined ? inputs.description : isbnMessage.Description || ""}
                                          onChange={handleChange} required/>
                                
                            </div>
                            <div className="col-xl-5 col-md-6 col-sm-12" >
                                <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                            name={"bookName"}
                                            value={inputs.bookName !== undefined ? inputs.bookName : isbnMessage.BookName || ""}
                                            type={"text"} handleChange={handleChange} feedback={"Book Name."}/>


                                <InputField label={"Publisher Name"} id={"validationCustom05"}
                                            className={"form-control"} name={"publisherName"}
                                            value={inputs.publisherName !== undefined ? inputs.publisherName : isbnMessage.PublisherName || ""}
                                            type={"text"} handleChange={handleChange}
                                            feedback={"Publisher Name."}/>

                                <InputField label={"Book Location"} id={"validationLocation"} className={"form-control"}
                                            name={"bookLocation"}
                                            value={inputs.bookLocation !== undefined ? inputs.bookLocation : isbnMessage.BookLocation || ""}
                                            type={"text"} handleChange={handleChange} feedback={"Book Location."}/>
                                
                                <InputField label={"Acquisition Method"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"acquisitionMethod"} value={inputs.acquisitionMethod !== undefined ? inputs.acquisitionMethod :isbnMessage.acquisitionMethod} id={"acquisitionMethod"}
                                        feedback={"Acquisition Method."}/>

                                <label htmlFor="validationCustom04" className="form-label ">Citations</label>
                                <textarea className="form-control feildDisabled" id="citation1" rows="4"
                                          cols="50" name="citation"
                                          value={inputs.citation !== undefined ? inputs.citation : isbnMessage.citation || ""}
                                          onChange={handleChange} required/>
                                
                                <div className=" col-sm-2 mt-3 buttonEnd">
                                <Button id={"submit"} keyword2={"Modify Book"} submit={submit} className="w-25"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <FooterComponent/>
            </div>

        </>
    )
}

export default ModifyBook;