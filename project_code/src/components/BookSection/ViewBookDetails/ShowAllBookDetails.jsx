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
                        <p className="h-auto">ISBN: {bookDetails.ISBN_Number}</p>
                        <p className="h-auto">Title: {bookDetails.BookName}</p>
                        <p className="h-auto">Author: {bookDetails.AuthorName}</p>
                        <p className="h-auto">PublisherName: {bookDetails.PublisherName}</p>
                    </div>
                    <div className="col-xl-5 col-md-5 col-sm-12 mx-auto">
                        <p className="h-auto">Category: {bookDetails.Category}</p>
                        <p className="h-auto">All Book Qty: {bookDetails.allBooksQty}</p>
                        <p className="h-auto">All available Book Qty: {bookDetails.availableBooksQty}</p>
                        <p className="h-auto">BookLocation: {bookDetails.BookLocation}</p>

                    </div>
                    <div className="col-sm-11 mx-auto">
                          <textarea id="displayDescription" className="w-100 h-auto" rows="5" disabled={true}
                                    name="description" value={bookDetails.Description || ""}/>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>

    )
}

export default ShowAllBookDetails;