import {useState,useEffect} from "react";
import axios from "axios";

function DeleteBook(){

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [data, setData] = useState({});
    const [nextBookID, setNextBookID] = useState('');


    const handleChange = (e) => {
        if (e.target.name=="isbnNumber"){
            getISBNData({[e.target.name]:e.target.value});
            setData(preValues => ({...preValues, [e.target.name]:e.target.value }));
        }

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const updateDatabase = async () => {
        const res = await axios.post(
            'http://localhost:8081/project_01/QtyUpdate.php',
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
        const res = await axios.post(
            'http://localhost:8081/project_01/getBookID.php',
            data,
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
            'http://localhost:8081/project_01/ISBN_Data.php',
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

        const getBookID = async () => {
            const res = await axios.post(
                'http://localhost:8081/project_01/getBookID.php',
                inputs.isbnNumber,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            const message = await res.data.resultMessage;
            setNextBookID(message);
            //console.log(message.ISBN_Number)
        }



    return (
        <>
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">Next Book ID</label>
                    <div className="input-group has-validation">
                        {/*<span className="input-group-text" id="inputGroupPrepend">{CategoryID + " - "}</span>*/}
                        <input type="text" className="form-control" id="validationCustomUsername"
                               placeholder="Auto fill" aria-describedby="inputGroupPrepend" value={nextBookID || ""} disabled required />
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label" >ISBN Number</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername"
                               aria-describedby="inputGroupPrepend" name="isbnNumber"  onChange={handleChange}  required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please choose a valid ISBN Number.
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Book Name</label>
                    <input type="text" className="form-control " id="validationCustom01" name="bookName"
                           placeholder={isbnMessage.BookName} onChange={handleChange} disabled required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please choose a valid Book Name.
                    </div>
                </div>

                <button>Delete Book</button>

                <div className="col-12">
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={submit}>Submit form</button>
                </div>
            </form>
            <div>
                <p>Response from PHP script: {message}</p>
                <p>ISBN Response from PHP script: {isbnMessage.ISBN_Number}</p>
            </div>
        </>
    )
}

export default DeleteBook;