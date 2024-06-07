import {useState,useEffect} from "react";
import axios from "axios";
import Button from "../../SubComponents/Button.jsx";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import SetAvailability from "../../SubComponents/SetAvailability.jsx";

function AddExistingBookQty(){

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [nextBookID, setNextBookID] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const handleChange = (e) => {
        if (e.target.name=="isbnNumber"){
            getISBNData({[e.target.name]:e.target.value});
            setData(preValues => ({...preValues, [e.target.name]:e.target.value }));
        }
        if (e.target.name=="category" ){
            setData(preValues => ({...preValues, [e.target.name]:e.target.value}));
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/UpdateExistingBookQtyController.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setMessage(message);
    }
// get ID
    const getBookID = async () => {
        const extendedData = {
            ...data,
            dataGetting_parameter:0
        };
        console.log(extendedData)
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
        if(message && message.Category && message.Category.length >0){
            setData(preValues => ({...preValues, ["category"]:message.Category}));
        }
        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false,"#dee2e6");
                break;
            case (message.ISBN_Number).length>0:
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
    function inputEnable_disable(feedback){
        let inputFields = document.querySelector(".feildDisabled");
            inputFields.disabled=feedback;


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
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <form className="row g-3 needs-validation" noValidate>
                <InputField label={"Next Book ID"} type={"text"} id={"validationCustomUsername"} className={"form-control"}
                            value={nextBookID || ""} placeholder={"Auto fill"} disabled={true}/>
                <CategoryList value={inputs.category || isbnMessage.Category || ""} categoryList={categoryList}
                              handleChange={handleChange}/>
                <InputField label={"ISBN Number"} id={"validationCustomUsername"} className={"form-control"}
                            name={"isbnNumber"} type={"text"} feedback={"ISBN Number."} handleChange={handleChange}/>
               <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"} name={"bookName"}
                           placeholder={isbnMessage.BookName} type={"text"} disabled={true} handleChange={handleChange}
                           feedback={"Book Name."}/>

                <InputField label={"Add More QTY"} type={"number"} className={"form-control feildDisabled"}
                            name={"addNewQty"} placeholder={isbnMessage.Qty} id={"validationCustomUsername"}
                            handleChange={handleChange} feedback={"quantity."}/>
                <SetAvailability handleChange={handleChange}/>
                <Button keyword={"Add Qty"} submit={submit}/>
            </form>
            <div>
                <p>Response from PHP script: {message}</p>
                <p>ISBN Response from PHP script: {isbnMessage.ISBN_Number}</p>
            </div>
        </>
    )
}

export default AddExistingBookQty;