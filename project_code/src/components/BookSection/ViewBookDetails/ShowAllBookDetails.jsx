import axios from "axios";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import './ShowAllBookDetails.css';
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";

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

        <div id="AllBookDetails" className="bookSectionCommonClass">
            <HeaderComponent Link1={"Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""}/>
            <div id="details" className="bookSectionCommonFormClass">
                <h1>Book Details</h1>
                <br/>
                <div className="row">
                    <div className="col-xl-5 col-md-5 col-sm-12 mx-auto">
                        <p>ISBN: {bookDetails.ISBN_Number}</p>
                        <p>Title: {bookDetails.BookName}</p>
                        <p>Author: {bookDetails.AuthorName}</p>
                        <p>PublisherName: {bookDetails.PublisherName}</p>
                    </div>
                    <div className="col-xl-5 col-md-5 col-sm-12 mx-auto">
                        <p>Category: {bookDetails.Category}</p>
                        <p>AllBookQty: {bookDetails.AllBookQty}</p>
                        <p>BookLocation: {bookDetails.BookLocation}</p>
                        <p>Description: {bookDetails.Description}</p>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>

    )
}

export default ShowAllBookDetails;