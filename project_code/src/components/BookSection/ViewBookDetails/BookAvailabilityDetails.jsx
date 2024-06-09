import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

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
        console.log(res.data.resultMessage)
        setMessage(res.data.resultMessage);
    }
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Book ID</th>
                </tr>
                </thead>
                <tbody>
                {availableBookList.map((book, index) => (
                    <tr key={index}>
                        <td className="booDetails">Result {index + 1}</td>
                        <td className="booDetails">{book.Final_ID}</td>
                        <td><button id="request" className="btn btn-success"
                                    onClick={()=>requestBook(book.Final_ID,book.category
                                    )}>Request This </button></td>
                    </tr>
                ))}
                </tbody>
            </table>
<div>
    <p>Response message:{message}</p>
</div>
        </>
    )
}

export default BookAvailabilityDetails;
