import axios from "axios";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import './ShowAllBookDetails.css';

function ShowAllBookDetails() {

    const {id} = useParams();
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        console.log(id);
        fetchBookDetails(id);
    }, [id]);

    const fetchBookDetails = async (id) => {
        await axios.get(`http://localhost:8081/project_01/controllers/ShowBookAllDetailsController.php?id=${id}`)
            .then(response => {
                console.log(response.data)
                setBookDetails(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    return (

        <div id="AllBookDetails">
            <h1>Book Details</h1>
            <div id="details">
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12">
                <p>ISBN: {bookDetails.ISBN_Number}</p>
                <p>Title: {bookDetails.BookName}</p>
                <p>Author: {bookDetails.AuthorName}</p>
                <p>PublisherName: {bookDetails.PublisherName}</p>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12">
                <p>Category: {bookDetails.Category}</p>
                <p>AllBookQty: {bookDetails.AllBookQty}</p>
                <p>BookLocation: {bookDetails.BookLocation}</p>
                <p>Description: {bookDetails.Description}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShowAllBookDetails;