import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './BookAvailabilityDetails.css';

function BookAvailabilityDetails() {
    const { id } = useParams();
    const [availableBookList, setAvailableBookList] = useState([]);
    const [message, setMessage] = useState('');
    const userID="SLMS/24/2";  //getting this from session storage
    useEffect(() => {
        console.log(id);
        fetchBookDetails(id);
    }, [id]);

    const fetchBookDetails = async (id) => {
        await axios.get(`http://localhost:8081/project_01/controllers/BookAvailabilityDetailsController.php?id=${id}`)
            .then(response => {
                console.log(response.data)
                setAvailableBookList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const requestBook = async (bookID,category) => {
        const extendedData = {
            bookID:bookID,
            userID:userID,
            category:category
        };
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/HandleRequestController.php?id=0',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        setMessage(res.data);
    }
    return (
        <div id="BookAvailabilityDetails">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Book ID</th>
                    <th scope="col">Request This</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(availableBookList) && availableBookList.length > 0 ? (
                availableBookList.map((book, index) => (
                    <tr key={index}>
                        <td className="booDetails">Result {index + 1}</td>
                        <td className="booDetails">{book.Final_ID}</td>
                        <td id="requestThis" className="booDetails">
                            <button id="request" className="btn btn-success"
                                    onClick={() => requestBook(book.Final_ID, book.category
                                    )}>Request This
                            </button>
                        </td>

                    </tr>
                ))): (
                    <tr>
                        <td colSpan="3" className="booDetails">No books available</td>
                    </tr>
                )}
             <p>response:  {message.resultMessage}</p>
                </tbody>
            </table>
            <div>

            </div>
        </div>
    )
}

export default BookAvailabilityDetails;
