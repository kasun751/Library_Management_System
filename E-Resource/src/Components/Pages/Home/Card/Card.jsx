import './Card.css';
import {Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Card({title, isbn, author, price, description, image_path, category, pdf_path}) {
    const [buyBookDetails, setBuyBookDetails] = useState(null);
    const navigate = useNavigate();
    const userId = 'SLMS/24/2'; // getting from session storage

    const buyNow = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/buy.php',
                {isbn, userId},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.data.status === 'success') {
                setBuyBookDetails(res.data.data);
            } else {
                console.error(res.data.message);
            }

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        if (buyBookDetails) {
            const {isbn, title, price, hash} = buyBookDetails;

            payhere.onCompleted = function onCompleted(isbn) {
                // alert("Payment completed");
                navigate('/my_books');
            };

            payhere.onDismissed = function onDismissed() {
                alert("Payment dismissed");
            };

            payhere.onError = function onError(error) {
                alert("Invalid details");
            };

            var payment = {
                "sandbox": true,
                "merchant_id": "1227044",
                "return_url": 'http://localhost/Lbrary Management System/E-Resource/src/Components/Pages/MyBooks/MyBooks.jsx',
                "cancel_url": 'http://localhost/Lbrary Management System/E-Resource/src/Components/Pages/E_Book_Home/E_Book_Home.jsx',
                "notify_url": "http://sample.com/notify",
                "order_id": isbn,
                "items": title,
                "amount": price,
                "currency": "LKR",
                "hash": hash,
                "first_name": "ishini",
                "last_name": "dewamiththa",
                "email": "ishini@gmail.com",
                "phone": "740138590",
                "address": "",
                "city": "kandy",
                "country": "",
                "delivery_address": "",
                "delivery_city": "",
                "delivery_country": "",
                "custom_1": userId,
                "custom_2": ""
            };

            payhere.startPayment(payment);
        }
    }, [buyBookDetails]);

    const handleDelete = () => {
        navigate('/remove', {state: {isbn, title, author}});

    };

    const handleUpdate = () => {

        navigate('/update', {state: {isbn, title, author, price, description, category, image_path, pdf_path}});
    };

    return (


        <div className="card rounded-4" id="card">
            <div className=" col-12 col-sm-8 col-lg-11 col-md-11 mx-auto">
                <img src={image_path} className="card-img-top rounded-4 " alt="Book Cover"/>
            </div>

            <div className="card-body col-12" id="card-body">
                <h4 className="card-title" id="card-title">Name:<span> {title}</span></h4>
                <h5 className="card-title" id="card-title">Author:<span> {author}</span></h5>
                <h6 className="card-title" id="card-title">Rs: <span>{price}</span></h6>

                <p className="card-text text-justify" id="card-text">{description}</p>


                <div className="home-center-button col-12">
                    <Button onClick={buyNow} className="btn btn-primary" id="buy-button">Buy Book</Button>

                </div>
                <div className="home-center-button col-12">
                    <Button onClick={handleUpdate} className="btn btn-primary" id="home-update-button">Update</Button>
                    <Button onClick={handleDelete} className="btn btn-danger" id="home-delete-button">Delete</Button>
                </div>
            </div>
        </div>


    );
}

export default Card;
