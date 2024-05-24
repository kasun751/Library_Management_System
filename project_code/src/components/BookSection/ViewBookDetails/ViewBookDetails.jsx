import {useEffect,useState} from "react";
import axios from "axios";
import './ViewBookDetails.css'
function ViewBookDetails() {

    const [booksList, setBooksList] = useState([]);
    const [booksdetails, setBooksdetails] = useState([]);
    const [availableNum, setAvailableNum] = useState(0);
    // const [inputs, setInputs] = useState({});

    const handleChange = (e) => {

        if (e.target.name) {
            getBookDetails({[e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:8081/project_01/viewBookListAndDetails.php')
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
            'http://localhost:8081/project_01/viewBookListAndDetails.php',
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

            <div className="col-md-3">
                <label htmlFor="validationCustom05" className="form-label ">Publisher Name</label>
                <input type="text" className="form-control feildDisabled" id="validationCustom05" required name="bookDetails"
                      onChange={handleChange}/>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    Please provide a valid Publisher Name.
                </div>
            </div>

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
                                    <button type="button" className="btn btn-success">Availability {book.AllBookQty}</button>
                                    <button type="button" className="btn btn-danger">View Details</button>
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
                                    <button type="button" className="btn btn-success">Availability {book.AllBookQty}</button>
                                    <button type="button" className="btn btn-danger">View Details</button>
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