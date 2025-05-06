import {useEffect, useState} from "react";
import axios from "axios";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import InputField from "../../SubComponents/InputFields.jsx";
import CategoryList from "../../SubComponents/CategoryList.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";
import './SearchDeletedBooks.css';

function SearchDeletedBooks(){

    const [inputs, setInputs] = useState({});
    const [bookIdDetails, setBookIdDetails] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name == "bookID") {
            getBookIdDetails( e.target.value);
        }
        const name = e.target.name;
        const value = e.target.value;

        setInputs(preValues => ({...preValues, [name]: value}))
    }


    const getBookIdDetails = async (bookID) => {
        setLoading(true)
        const response = await axios.get('http://localhost:80/project_1/UserLogin/controllers/BookIDDataController.php', {
            params: {
                ID:bookID,
                barcodeParameter: 2
            }
        })
        const message = await response.data;
        console.log(message)
        setBookIdDetails(message)
        setLoading(false);
           
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


    return (
            <div id="searchDeletedBooks" className="bookSectionCommonClass">
                {loading && <CircleSpinner/>}
                <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
                <div id="formDivSearchDeletedBooks" className="bookSectionCommonFormClass">
                    <form className="row g-3 needs-validation" noValidate>
                       
                        <div className="row justify-content-center text-center">
                            <h3 className=" checkoutTitles mb-4">Search Deleted Book Details</h3>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <InputField label={"Book ID"} id={"validationBookID1"} className={"form-control"}
                                            name={"bookID"} type={"text"} handleChange={handleChange}
                                            feedback={"Book ID."}/>
                                <InputField label={"Book Name"} id={"validationBookName1"} className={"form-control"}
                                            handleChange={handleChange}
                                            name={"bookName"} value={bookIdDetails.BookName || ""} type={"text"}
                                            feedback={"Book Name."} disabled={true}/>

                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <InputField label={"Reason for Delete"} id={"validationBookName2"} className={"form-control"}
                                            handleChange={handleChange}  feedback={"reason."} disabled={true}
                                            name={"reason"} placeholder={bookIdDetails.BookName} type={"text"}
                                            value={bookIdDetails.rForDelete || ""}
                                           />
                                <CategoryList value={inputs.category || bookIdDetails.Category || ""}
                                              categoryList={categoryList} handleChange={handleChange} disabled1={true}/>
                                
                            </div>
                        </div>
                    </form>
                </div>
                <FooterComponent/>
            </div>
    )
}

export default SearchDeletedBooks;