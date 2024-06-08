import './Card.css';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Card({ title, isbn, author, price, description, image_path }) {
    const [buyBookDetails, setBuyBookDetails] = useState(null);

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
            const { isbn,title, price,hash} = buyBookDetails;

            // Payment completed. It can be a successful failure.
            payhere.onCompleted = function onCompleted(orderId) {
                alert("Payment completed");
            };

            // Payment window closed
            payhere.onDismissed = function onDismissed() {
                alert("Payment dismissed");
            };

            // Error occurred
            payhere.onError = function onError(error) {
                alert("Invalid details");
            };

            // Put the payment variables here
            var payment = {
                "sandbox": true,
                "merchant_id": "1227044", // Replace your Merchant ID
                "return_url": undefined, // Important
                "cancel_url": undefined, // Important
                "notify_url": "http://sample.com/notify",
                "order_id": isbn,
                "items": title,
                "amount": price,
                "currency": "LKR",
                "hash": hash, // Replace with generated hash retrieved from backend
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

            // Show the payhere.js popup, when "PayHere Pay" is clicked
            payhere.startPayment(payment);
        }
    }, [buyBookDetails]);

    return (
        <>
            <div className="card">
                <img src={image_path} className="card-img-top" alt="Book Cover" />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <h6 className="card-title">ISBN: {isbn}</h6>
                    <h5 className="card-title">Author: {author}</h5>
                    <h6 className="card-title">Rs: {price}</h6>
                    <p className="card-text">{description}</p>
                    <Button onClick={buyNow} className="btn btn-primary">Buy Now</Button>
                </div>
            </div>
        </>
    );
}

export default Card;
