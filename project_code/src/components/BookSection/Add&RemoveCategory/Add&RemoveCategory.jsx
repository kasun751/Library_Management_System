import {useState} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";

function AddRemoveCategory(){

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }

    const updateDatabase = async (access) => {
        const extendedData = {
            ... inputs,
            access_parameter:access
        };
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/CategoryController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setMessage(message);
    }


    function submit(access) {
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
                    updateDatabase(access);
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

                <InputField type={"text"} className={"form-control"} label="Add Category" id="validationCustomUsername" name="addCategory"
                            value={inputs.addCategory || ""} handleChange={handleChange} required={true}
                            feedback="Please choose a valid ISBN Number."/>
                <div className="col-12">
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={() => submit("add")}>Add Category</button>
                    <button className="btn btn-primary feildDisabled" type="submit" onClick={() => submit("remove")}>Remove Category</button>
                </div>
            </form>
            <div>
                <p>Response from PHP script: {message}</p>
            </div>
        </>
    )
}
export default AddRemoveCategory;