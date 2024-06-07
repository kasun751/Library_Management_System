import {useEffect,useState} from "react";
import axios from "axios";
import './ViewBookDetails.css'
import {Link} from "react-router-dom";
import InputField from "../../SubComponents/InputFields.jsx";
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
            await axios.get('http://localhost:8081/project_01/controllers/ViewBookListAndDetailsController.php')
                .then(response => {
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
            'http://localhost:8081/project_01/controllers/ViewBookListAndDetailsController.php',
            bookDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        setBooksdetails(res.data);
    }

    return (
        <>
            <InputField label={"Book Name"} id={"validationCustom01"} className={"form-control"} name={"bookDetails"}
                        type={"text"} handleChange={handleChange} feedback={"Book Name."}/>

            <div className="container">
                <br/>
                <h4>Customer Form</h4>
                <hr/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">AuthorName</th>
                        <th scope="col">PublisherName</th>
                    </tr>
                    </thead>
                    <tbody>
                    {booksdetails.length !== 0 ? (
                        booksdetails.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails">Result {index + 1}</td>
                                <td className="booDetails">{book.BookName}</td>
                                <td className="booDetails">{book.AuthorName}</td>
                                <td className="booDetails">{book.PublisherName}</td>
                                <td className="booDetails">
                                    <button id="availabilityDetails" className="btn btn-success"><Link to={`/viewBook/bookAvailabilityDetails/${book.ISBN_Number}`}>Available Books </Link></button>
                                    <button id="availabilityDetails" className="btn btn-danger"><Link to={`/viewBook/showAllBookDetails/${book.ISBN_Number}`}>View Details</Link></button>
                                </td>
                            </tr>
                        ))
                    ): (
                        booksList.map((book, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{book.BookName}</td>
                                <td>{book.AuthorName}</td>
                                <td>{book.PublisherName}</td>
                                <td >
                                    <button id="availabilityDetails" className="btn btn-success"><Link to={`/viewBook/bookAvailabilityDetails/${book.ISBN_Number}`}>Available Books </Link></button>
                                    <button id="availabilityDetails" className="btn btn-danger"><Link to={`/viewBook/showAllBookDetails/${book.ISBN_Number}`}>View Details</Link></button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default ViewBookDetails;