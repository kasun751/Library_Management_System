import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './AddNewBook.css'
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import SetAvailability from "../../SubComponents/SetAvailability.jsx";
import Button from "../../SubComponents/Button.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

function AddNewBook() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [isbnMessage, setIsbnMessage] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);

    const handleChange = (e) => {
        if (e.target.name == "isbnNumber") {
            getISBNData({
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            );
        }

        const name = e.target.name;
        const value = e.target.value;
        const trimmedValue = value.trim();
        setInputs(preValues => ({...preValues, [name]: trimmedValue}))
    }

    const updateDatabase = async () => {
        setLoading(true);
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/AddNewBookController.php',
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = await res.data.resultMessage;
        setLoading(false);
        console.log(res.data)
        if (message === "true") {
            localStorage.setItem("message", "Book Added successfully.");
        } else {
            localStorage.setItem("message", "Book Not Added!");
        }
        location.reload();
    }

    //check isbn exists or not
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
        const API_KEY = 'AIzaSyAUk7JTH0g498iUlTTBnCTWCY1npOsidrU';
        switch (message.ISBN_Number) {
            case undefined:
                inputEnable_disable(false, "#dee2e6");
                console.log(isbnNumber.isbnNumber)
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber.isbnNumber}&key=AIzaSyAUk7JTH0g498iUlTTBnCTWCY1npOsidrU`)
                    .then(response => {
                        if (response.data && response.data.items && response.data.items.length > 0) {
                            let foundWord = null;
                            let data = response.data.items[0].volumeInfo;

                            // Handle categories data
                            let categories = data.categories ? (data.categories[0].includes(' ') ? data.categories[0].split(' ') : [data.categories[0]]) : [];

                            // Find matching category
                            for (const word of categories) {
                                if (categoryList.some(category => category.Category_Name === word)) {
                                    foundWord = word;
                                    break;
                                }
                            }

                            // Set state values
                            setBookData(data);
                            setInputs(prevValues => ({
                                ...prevValues,
                                bookName: data.title.replace(/\([^()]*\)/g, '').trim() || "",
                                authorName: data.authors?.[0] || "",
                                publisherName: data.publisher || "",
                                category: foundWord || "",
                                description: data.description || ""
                            }));
                        } else {
                            console.error('Error fetching book data: Response or items array is empty or undefined');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching book data:', error);
                    });

                break;
            case (message.ISBN_Number).length > 0:
                inputEnable_disable(true, "red");
                break;
            default:
                inputEnable_disable(true, "red");
        }
        setIsbnMessage(message);
        //console.log(message.ISBN_Number)
    }

    function inputEnable_disable(feedback, color) {
        let inputFields = document.querySelectorAll(".feildDisabled");
        let isbnInputField = document.querySelectorAll('input');
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].disabled = feedback;
            isbnInputField[1].style.borderColor = color;
            isbnInputField[1].style.boxShadow = `2px 2px 2px ${color} `;
        }
        //inputFields.disabled=feedback;

    }

    useEffect(() => {
        axios.get('http://localhost:80/project_1/UserLogin/controllers/CategoryController.php')
            .then(response => {
                console.log(response.data)
                setCategoryList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);


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

        <div id="addNewBook" className="bookSectionCommonClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent  Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
            <div id="formDivAddNewBook" className="bookSectionCommonFormClass " >
                <form className="row g-3 needs-validation" noValidate>
                    <h1>Add New Book</h1>
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
                    <div className="row">
                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"ISBN Number"} id={"normalBook"} className={"form-control"}
                                        name={"isbnNumber"} type={"text"} handleChange={handleChange}
                                        feedback={"ISBN Number."}/>
                            <InputField label={"Publisher Name"} id={"validationCustom05"} className={"form-control"}
                                        name={"publisherName"} value={inputs.publisherName || ""}
                                        placeholder={isbnMessage.PublisherName} type={"text"}
                                        handleChange={handleChange}
                                        feedback={"Publisher Name."}/>
                            <InputField label={"Book Location"} id={"validationLocation"} className={"form-control"}
                                        name={"bookLocation"}
                                        placeholder={isbnMessage.BookLocation} type={"text"} handleChange={handleChange}
                                        feedback={"Book Location."}/>
                             <InputField label={"Version"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"version"} placeholder={isbnMessage.AllBookQty} id={"version"}
                                        feedback={"version."}/>
                            
                        </div>


                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"}
                                        name={"bookName"} value={inputs.bookName || ''}
                                        placeholder={isbnMessage.BookName} type={"text"} handleChange={handleChange}
                                        feedback={"Book Name."}/>
                            <InputField label={"Book Price"} id={"price"} className={"form-control"}
                                        name={"bookPrice"} value={inputs.bookPrice || ''}
                                        placeholder={isbnMessage.BookName} type={"number"} handleChange={handleChange}
                                        feedback={"Book Price."}/>
                                        
                            <CategoryList value={inputs.category || isbnMessage.Category || ""}
                                          categoryList={categoryList}
                                          handleChange={handleChange}/>

                            <InputField label={"Acquisition Method"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"acquisitionMethod"} placeholder={isbnMessage.AllBookQty} id={"acquisitionMethod"}
                                        feedback={"Acquisition Method."}/>
                                
                        </div>

                        <div className="col-xl-4 col-md-6 col-sm-12">
                            <InputField label={"Author Names"} id={"validationCustom02"} className={"form-control"}
                                        name={"authorName"} value={inputs.authorName || ''}
                                        placeholder={isbnMessage.AuthorName} type={"text"} handleChange={handleChange}
                                        feedback={"Author Name."}/>


                            <InputField label={"QTY"} type={"number"} className={"form-control feildDisabled"}
                                        handleChange={handleChange}
                                        name={"qty"} placeholder={isbnMessage.AllBookQty} id={"validationQty"}
                                        feedback={"quantity."}/>

                            <SetAvailability handleChange={handleChange} parameter="addBook" keyword1={"Available Now"}
                                             keyword2={"Still Not Added To Library"}/>
                                               <InputField label={"Volume"} type={"text"} className={"form-control "}
                                        handleChange={handleChange}
                                        name={"volume"} placeholder={isbnMessage.AllBookQty} id={"volume"}
                                        feedback={"Volume."}/>
                           

                           
                        </div>

                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                          
                            <label htmlFor="validationCustom03" className="form-label ">Description</label>
                            <textarea className="form-control feildDisabled" id="validationCustom03" rows="3" cols="50"
                                      name="description" value={inputs.description || ''}
                                      placeholder={isbnMessage.Description} onChange={handleChange} required/>
                           <label htmlFor="validationCustom04" className="form-label ">Citations</label>
                            <textarea className="form-control feildDisabled" id="citation2" rows="3"
                                          cols="50" name="citation"
                                          value={inputs.citation !== undefined ? inputs.citation : isbnMessage.citation || ""}
                                          onChange={handleChange} required/>
                             
                        </div>

                        <Button id={"submit"} keyword2={"Add Book"} submit={submit}/>

                    </div>
                </form>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default AddNewBook;