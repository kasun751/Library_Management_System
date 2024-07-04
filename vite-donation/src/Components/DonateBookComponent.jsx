import React, { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import axios from 'axios';
import './DonateBookComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import closeBtn from '../Images/close-btn.svg'

function DonateBookComponent({onClickClose,amount, purpose}) {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    phoneNum: "",
    email: "",
    country: "",
    city: "",
    address:"",
    item: purpose,
    numberInput:"1",
    amount: amount,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if(id=="numberInput"){
        setData((prevData) => ({
            ...prevData,
            amount: (amount*value),
          }));
    }
  };

  async function paymentGateway() {
    try {
      console.log("Fetching payment data...");
      const res = await axios.post('http://localhost:80/project_1/DonationHandling/Controller/payHereProcessController.php',data);
      const obj = res.data;
      console.log("Payment data:", obj);

      // Configure PayHere callbacks
      payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:", orderId);      
      };

      payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      payhere.onError = function onError(error) {
        console.log("Error:", error);
      };

      // Prepare the payment object
      const payment = {
        sandbox: true,
        merchant_id: "1227349",    // Replace with your Merchant ID
        return_url: "http://localhost:5173/",     // Important
        cancel_url: "http://localhost:5173/",     // Important
        notify_url: "",
        order_id: obj.order_id,
        items: obj.items,
        amount: obj.amount,
        currency: obj.currency,
        hash: obj.hash, // Replace with generated hash retrieved from backend
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        phone: obj.phone,
        address: obj.address,
        city: obj.city,
        country: obj.country,
        delivery_address: "No. 46, Galle road, Kalutara South",
        delivery_city: "Kalutara",
        delivery_country: "Sri Lanka",
        custom_1: "",
        custom_2: ""
      };

      payhere.startPayment(payment);
    } catch (err) {
      console.error("Error fetching payment data:", err);
    }
  }

  return (
    <>
      <div className='donate-books-outer-container'>
        <div className='container donate-books-container col-lg-5'>
            <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
                <label className="form-label">First name</label>
                <input
                type="text"
                className="form-control"
                id="fname"
                onChange={handleChange}
                value={data.fname}
                required
                />
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input
                type="text"
                className="form-control"
                id="lname"
                onChange={handleChange}
                value={data.lname}
                required
                />
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
                <label className="form-label">Phone Number</label>
                <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">#</span>
                <input
                    type="text"
                    className="form-control"
                    id="phoneNum"
                    onChange={handleChange}
                    value={data.phoneNum}
                    aria-describedby="inputGroupPrepend"
                    required
                />
                <div className="invalid-feedback">Please enter phone number.</div>
                </div>
            </div>
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                value={data.email}
                required
                />
                <div className="invalid-feedback">Please enter your email address.</div>
            </div>
            <div className="col-md-4">
                <label className="form-label">Country</label>
                <input
                type="text"
                className="form-control"
                id="country"
                onChange={handleChange}
                value={data.country}
                required
                />
                <div className="invalid-feedback">Please provide a country.</div>
            </div>
            <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                type="text"
                className="form-control"
                id="city"
                onChange={handleChange}
                value={data.city}
                required
                />
                <div className="invalid-feedback">Please provide a city.</div>
            </div>
            <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                type="text"
                className="form-control"
                id="address"
                onChange={handleChange}
                value={data.address}
                required
                />
                <div className="invalid-feedback">Please provide a Address.</div>
            </div>
            <div className="col-md-6">
                <label className="form-label">ISBN Number</label>
                <input
                type="text"
                className="form-control"
                id="item"
                value={data.item}
                disabled
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Amount</label>
                <input
                type="text"
                className="form-control"
                id="amount"
                value={data.amount}
                disabled
                />
            </div>
            <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control no-direct-input"
                    id="numberInput"
                    value={data.numberInput}
                    onChange={handleChange}
                    min="0" // Optional: set minimum value
                    max="10000" // Optional: set maximum value
                    step="1" // Optional: set step value
                />
                <div className="invalid-feedback">Please enter an amount.</div>
            </div>
            </form>
            <button className="btn btn-primary" onClick={paymentGateway}>Donate</button>
            <button className="btn btn-danger" onClick={onClickClose}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default DonateBookComponent;
