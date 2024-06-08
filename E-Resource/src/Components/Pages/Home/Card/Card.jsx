import './Card.css';
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Card({ title, isbn, author, price, description, image_path ,category}) {
    const [buyBookDetails, setBuyBookDetails] = useState(null);
    const navigate = useNavigate();

    const buyNow = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/buy.php',
                { isbn },
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
            const { isbn, title, price, hash } = buyBookDetails;

            payhere.onCompleted = function onCompleted(orderId) {
                alert("Payment completed");
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
                "return_url": undefined,
                "cancel_url": undefined,
                "notify_url": "http://sample.com/notify",
                "order_id": isbn,
                "items": title,
                "amount": price,
                "currency": "LKR",
                "hash": hash,
                "first_name": "Saman",
                "last_name": "Perera",
                "email": "samanp@gmail.com",
                "phone": "0771234567",
                "address": "No.1, Galle Road",
                "city": "Colombo",
                "country": "Sri Lanka",
                "delivery_address": "No. 46, Galle road, Kalutara South",
                "delivery_city": "Kalutara",
                "delivery_country": "Sri Lanka",
                "custom_1": "",
                "custom_2": ""
            };

            payhere.startPayment(payment);
        }
    }, [buyBookDetails]);

    const handleDelete = () => {
        navigate('/remove', { state: { isbn, title, author } });
        navigate('/update', { state: { isbn, title, author,price,description,category } });
    };

    return (
        <div className="card">
            <img src={image_path} className="card-img-top" alt="Book Cover" />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <h6 className="card-title">ISBN: {isbn}</h6>
                <h5 className="card-title">Author: {author}</h5>
                <h6 className="card-title">Rs: {price}</h6>
                <p className="card-text">{description}</p>
                <Button onClick={buyNow} className="btn btn-primary">Buy Now</Button>&nbsp;
                <Button onClick={handleDelete} className="btn btn-primary">Delete Book</Button>&nbsp;
                <Button onClick={handleDelete} className="btn btn-primary">Update Book</Button>
            </div>
        </div>
    );
}

export default Card;
