import {useState, useEffect} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import ShowDeletedBooksReleventToIsbn from "./ShowDeletedBooksReleventToIsbn.jsx";
import './RestoreAllBooksRelevantToIsbn.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function submit(restorePara, BookIDForrestoreOnce) {
        restore(restorePara, BookIDForrestoreOnce);
    }


    const restore = async (restorePara, BookIDForrestoreOnce) => {

        const extendedData = {
            ...data,
            restorePara: restorePara,
            BookIDForrestoreOnce: BookIDForrestoreOnce,
            delete_parameter: 2,
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
        if (message === "true") {
            localStorage.setItem("message", "Restored Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }


    return (
        <>
            <div id="restoreAllBook">
                <div id="progress">
                    <img src="" alt=""/>

                </div>
                <div id="formDivRestoreAllBook">
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <h1>Restore Book</h1>
                        <p style={{
                            color: message === "Restored Successfully!" ? 'green' : 'red',
                        }}>{message}</p>
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-md-8 col-sm-12">
                                <InputField label={"ISBN Number"} id={"restoreBook"} className={"form-control"}
                                            name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                            feedback={"ISBN Number."}/>
                                <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                            name={"bookName"}
                                            placeholder={isbnMessage.BookName} type={"text"} handleChange={handleChange}
                                            disabled={true}
                                            feedback={"Book Name."}/>
                                <CategoryList value={inputs.category || isbnMessage.Category || ""}
                                              categoryList={categoryList}
                                              disabled={true} handleChange={handleChange}/>
                            </div>
                        </div>
                        <ShowDeletedBooksReleventToIsbn value={inputs.isbnNumber}
                                                        category={isbnMessage.Category} submit={submit}/>
                    </form>
                </div>

                {/*<div>*/}
                {/*    <p>Response from PHP script: {message}</p>*/}
                {/*    <p>ISBN Response from PHP*/}
                {/*        script: {isbnMessage.successMessage !== undefined ? isbnMessage.successMessage : ''}*/}
                {/*        {isbnMessage.ISBN_Number !== undefined ? "Have Book" : ''}</p>*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default RestoreAllBooksReleventToIsbn;
