import {useState,useEffect} from "react";
import axios from "axios";
import InputField from "../../SubComponents/InputFields.jsx";
import './Add&RemoveCategory.css';
import CategoryList from "../../SubComponents/CategoryList.jsx";

function AddRemoveCategory(){

    const [inputs, setInputs] = useState({});
    const [addMessage, setAddMessage] = useState('');
    const [removeMessage, setRemoveMessage] = useState('');
    const [categoryList, setCategoryList] = useState([]);

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }
    useEffect(() => {
        axios.get('http://localhost:8081/project_01/controllers/CategoryController.php')
            .then(response => {
                console.log(response.data)
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
        }else if(storedRemoveMessage){
            setRemoveMessage(storedRemoveMessage);
            localStorage.removeItem("categoryRemoveMessage");
        }
    }, []);

    const updateDatabase = async (access) => {
        const extendedData = {
            ... inputs,
            access_parameter:access
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/CategoryController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;

        if(message==="add"){
            localStorage.setItem("categoryAddMessage","Category Added Successfully.");
        }else if(message==="notAdd"){
            localStorage.setItem("categoryAddMessage","Category Not Added!");
        }else if(message==="remove"){
            localStorage.setItem("categoryRemoveMessage","Category remove Successfully.")
        }else if (message==="notRemove"){
            localStorage.setItem("categoryRemoveMessage","category Not Removed");
        }else if(message==='tableNotEmpty'){

        }
        console.log(res.data)
        location.reload();
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
                } else {
                    console.log('validateError');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });

        })()
    }

    return (
        <div id="categoryAddAndRemove">
            <div id="progress">
                <img src="" alt=""/>
            </div>
            <div id="formDivCategoryAddAndRemove">
                <form className="row g-3 needs-validation" noValidate>

                    <InputField type={"text"} className={"form-control"} label="Add Category"
                                id="validationCustomUsername" name="addCategory"
                                value={inputs.addCategory || ""} handleChange={handleChange} required={true}
                                feedback="Please choose a valid ISBN Number."/>

                    <button id={"submit"} className="btn btn-primary feildDisabled" type="submit"
                            onClick={() => submit("add")}>Add Category
                    </button>
                    <div>
                        {addMessage && (
                            <p id="categoryAddingResponse" style={{
                                display: 'initial',
                                color: addMessage === "Category Added Successfully." ? 'green' : 'red',
                            }}>
                                {addMessage}
                            </p>
                        )}
                    </div>
                </form>
                <hr/>
                <form className="row g-3 needs-validation" noValidate>

                    <CategoryList value={inputs.category || ""} categoryList={categoryList}
                                  handleChange={handleChange}/>
                    <button id={"submit"} className="btn btn-primary feildDisabled" type="submit"
                            onClick={() => submit("remove")}>Remove Category
                    </button>
                    <div>
                        {removeMessage && (
                            <p id="categoryRemoveResponse" style={{
                                display: 'initial',
                                color: removeMessage === "Category remove Successfully." ? 'green' : 'red',
                            }}>
                                {removeMessage}
                            </p>
                        )}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddRemoveCategory;