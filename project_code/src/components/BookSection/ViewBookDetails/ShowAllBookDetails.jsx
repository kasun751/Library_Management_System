import axios from "axios";
import { useParams } from 'react-router-dom';
import {useEffect,useState} from "react";
function ShowAllBookDetails() {

        const { id } = useParams();
        const [bookDetails, setBookDetails] = useState({});

        useEffect(() => {
            console.log(id);
            fetchBookDetails(id);
        }, [id]);

        const fetchBookDetails = async (id) => {
                await axios.get(`http://localhost:8081/project_01/showBookAllDetails.php?id=${id}`)
                    .then(response => {
                        setBookDetails(response.data);
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
        }
    return (
        <>
            <div>
                <h1>Book Details</h1>
                <p>ISBN: {bookDetails.ISBN_Number}</p>
                <p>Title: {bookDetails.BookName}</p>
                <p>Author: {bookDetails.AuthorName}</p>
                <p>PublisherName: {bookDetails.PublisherName}</p>
                <p>Category: {bookDetails.Category}</p>
                <p>AllBookQty: {bookDetails.AllBookQty}</p>
                <p>BookLocation: {bookDetails.BookLocation}</p>
                <p>Description: {bookDetails.Description}</p>
                {/* Add more details as needed */}
            </div>

        </>
    )
}

export default ShowAllBookDetails;