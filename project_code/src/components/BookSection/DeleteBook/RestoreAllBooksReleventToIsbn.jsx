import {useState, useEffect} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import Button from "../../SubComponents/Button.jsx";
import ShowDeletedBooksReleventToIsbn from "./ShowDeletedBooksReleventToIsbn.jsx";


function RestoreAllBooksReleventToIsbn() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [bookNameID, setNextBookID] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const handleChange = (e) => {
        if (e.target.name == "isbnNumber") {
            getISBNData({
                [e.target.name]: e.target.value,
                id:e.target.id}
            );
            setData(preValues => ({...preValues, [e.target.name]: e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }
// get ID
    const getBookID = async () => {
        const extendedData = {
            ...data,
            dataGetting_parameter: 1
        };
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/GetBookIDController.php',
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
            'http://localhost:8081/project_01/controllers/GetIsbnDataController.php',
            isbnNumber,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data;
        console.log(message)
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
        axios.get('http://localhost:8081/project_01/controllers/CategoryController.php')
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

    function submit(restorePara,BookIDForrestoreOnce) {
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
                    restore(restorePara,BookIDForrestoreOnce);
                    //location.reload();
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }


    const restore = async (restorePara,BookIDForrestoreOnce) => {
        const extendedData = {
            ...data,
            restorePara: restorePara,
            BookIDForrestoreOnce:BookIDForrestoreOnce,
            delete_parameter: 2
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/DeleteBookController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        const message = await res.data.resultMessage;
        setMessage(message);
        //console.log(message.ISBN_Number)
    }


    return (
        <>
            <div id="allBooksDelete">
                <div id="progress">
                    <img src="" alt=""/>
                    <h1>restore Book Details</h1>

                </div>
                <form className="row g-3 needs-validation" noValidate>
                    <InputField label={"ISBN Number"} id={"restoreBook"} className={"form-control"}
                                name={"isbnNumber"} type={"text"} handleChange={handleChange} feedback={"ISBN Number."}/>
                    <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"} name={"bookName"}
                                placeholder={isbnMessage.BookName} type={"text"} handleChange={handleChange} disabled={true}
                                feedback={"Book Name."}/>
                    <CategoryList value={inputs.category || isbnMessage.Category || ""} categoryList={categoryList}
                                  disabled={true} handleChange={handleChange}/>
                    <ShowDeletedBooksReleventToIsbn value={inputs.isbnNumber} category={isbnMessage.Category} submit={submit}/>
                </form>
                <div>
                    <p>Response from PHP script: {message}</p>
                    <p>ISBN Response from PHP script: {isbnMessage.successMessage !== undefined ? isbnMessage.successMessage : ''}
                        {isbnMessage.ISBN_Number !== undefined ? "Have Book": ''}</p>
                </div>
            </div>
        </>
    )
}
export default RestoreAllBooksReleventToIsbn;
