import {useState, useEffect} from "react";
import axios from "axios";
import "./AddExistingBookQty.css"
import Button from "../../SubComponents/Button.jsx";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import SetAvailability from "../../SubComponents/SetAvailability.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function AddExistingBookQty() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [nextBookID, setNextBookID] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name == "isbnNumber") {
            getISBNData({
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            );
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }
        if (e.target.name == "category") {
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }
    useEffect(() => {
        const storedMessage = localStorage.getItem("message");
        if (storedMessage) {
            setMessage(storedMessage);
        }
        localStorage.removeItem("message");

    }, []);

    const updateDatabase = async () => {
        setLoading(true);
        const extendData={
            ...inputs,
            parameter:0
        }
        console.log(extendData)
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/UpdateExistingBookQtyController.php',
            extendData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setLoading(false);
        if(message==="true"){
            localStorage.setItem("message","Book Added successfully.");
        }else {
            localStorage.setItem("message","Book Not Added!");
        }
        location.reload();
    }
// get ID
    const getBookID = async () => {
        const extendedData = {
            ...data,
            dataGetting_parameter: 0
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
        //console.log(message.ISBN_Number)
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
                    //location.reload();
                    console.log(inputs);
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    return (
        <>
        <div id="addExistingBook" className="bookSectionCommonClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
            <div id="formDivAddExistingBook" className="bookSectionCommonFormClass">
                <form className="row g-3 needs-validation" noValidate>
                    <h1>Add Existing Book</h1>
                    <div>
                        {message && (
                            <p id="categoryAddingResponse" style={{
                                display: 'initial',
                                color: message === "Book Added successfully." ? 'yellow' : 'red',
                            }}>
                                {message}
                            </p>
                        )}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-md-6">
                            <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                        name={"isbnNumber"} type={"text"} feedback={"ISBN Number."}
                                        handleChange={handleChange}/>

                            <InputField label={"Add More QTY"} type={"number"} className={"form-control "}
                                        name={"addNewQty"} placeholder={isbnMessage.Qty} id={"validationCustomUsername"}
                                        handleChange={handleChange} feedback={"quantity."}/>
                            <SetAvailability handleChange={handleChange} parameter="addBook" keyword1={"Available Now"}
                                             keyword2={"Still Not Added To Library"}/>
                        </div>
                        <div className="col-xl-4 col-md-6">

                            <InputField label={"Next Book ID"} type={"text"} id={"validationCustomUsername"}
                                        className={"form-control"}
                                        value={nextBookID || ""} placeholder={"Auto fill"} disabled={true}/>
                            <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                        name={"bookName"}
                                        placeholder={isbnMessage.BookName} type={"text"} disabled={true}
                                        handleChange={handleChange}
                                        feedback={"Book Name."}/>
                            <CategoryList value={inputs.category || isbnMessage.Category || ""}
                                          categoryList={categoryList}
                                          handleChange={handleChange} disabled1={true}/>
                        </div>
                        <div className="col-12 col-xl-8">
                            <Button id={"submit"} keyword2={"Add Qty"} submit={submit} className="w-100"/>
                        </div>
                    </div>
                   
                </form>
            </div>
<FooterComponent/>
        </div>
        </>
    )
}

export default AddExistingBookQty;