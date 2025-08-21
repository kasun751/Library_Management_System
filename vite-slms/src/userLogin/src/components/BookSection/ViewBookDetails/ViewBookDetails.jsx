import {useEffect, useState} from "react";
import axios from "axios";
import './ViewBookDetails.css'
import {Link} from "react-router-dom";
import InputField from "../../SubComponents/InputFields.jsx";
import './ViewBookDetails.css';
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";

function ViewBookDetails() {

    const [booksList, setBooksList] = useState([]);
    const [booksdetails, setBooksdetails] = useState([]);

    const handleChange = (e) => {

        if (e.target.name) {
            getBookDetails({[e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:80/project_1/UserLogin/controllers/ViewBookListAndDetailsController.php')
                .then(response => {
                    console.log(response.data)
                    setBooksList(response.data);
                })
                .catch(error => {
                    console.log(error.message);
                });
        };
        fetchBooks();
    }, []);


    const getBookDetails = async (bookDetails) => {
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/ViewBookListAndDetailsController.php',
            bookDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        setBooksdetails(res.data);
    }

    return (
        <div id="ViewBookDetails" className="bookSectionCommonClass bookSectionCommonTableClass">
            <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={"/login"}/>
            <div className="container">
                <br/>
                <h1>View Book</h1>
                <hr/>
                <InputField label={"Search Book Name"} id={"validationCustom01"} className={"form-control"}
                            name={"bookDetails"} placeholder={"EX:Madolduwa"}
                            type={"text"} handleChange={handleChange} feedback={"Book Name."}/>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">AuthorName</th>
                        <th scope="col">Check Available Books</th>
                        <th scope="col">View details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {booksdetails.length !== 0 ? (
                        booksdetails.map((book, index) => (
                            <tr key={index}>
                                <td>Result {index + 1}</td>
                                <td >{book.BookName}</td>
                                <td>{book.AuthorName}</td>
                                <td>
                                    <button id="availabilityDetails" className="btn btn-success"><Link className="style"
                                        to={`/viewBook/bookAvailabilityDetails/${book.ISBN_Number}`}>Available
                                        Books </Link></button>
                                </td>
                                <td className="booDetails">
                                        <button id="viewDetails" className="btn btn-danger"><Link className="style"
                                        to={`/viewBook/showAllBookDetails/${book.ISBN_Number}`}>View Details</Link>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        Array.isArray(booksList) && booksList.length > 0 ? (
                        booksList.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails">{index + 1}</td>
                                <td className="booDetails">{book.BookName}</td>
                                <td className="booDetails">{book.AuthorName}</td>
                                <td className="booDetails">
                                    <button id="availabilityDetails" className="btn btn-success"><Link className="style"
                                        to={`/viewBook/bookAvailabilityDetails/${book.ISBN_Number}`}>Available
                                        Books </Link></button>
                                </td>
                                <td className="booDetails">
                                    <button id="viewDetails" className="btn btn-danger"><Link className="style"
                                        to={`/viewBook/showAllBookDetails/${book.ISBN_Number}`}>View Details</Link>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan="5">No books found.</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ViewBookDetails;