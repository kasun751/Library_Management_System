import React, { useState } from 'react';
import axios from 'axios';
import './DonateBookComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DonateBookComponent({ onClickConfirmBookPayment, onClickClose,  amount, purpose, record_id, maxBook }) {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    phoneNum: "",
    email: "",
    country: "",
    city: "",
    address: "",
    item: purpose,
    numberInput: "1",
    amount: amount,
    record_id: record_id,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "numberInput") {
      setData((prevData) => ({
        ...prevData,
        amount: amount * value,
      }));
    }
  };
 
  const handleCheckFeilds = () => {
    return !(data.fname !== "" && data.lname !== "" && data.email !== "");
  }

  return (
    <div className='main-donateBookComponent'>
    <div className='donate-books-outer-container'>
      <div className='container donate-books-container col-lg-6'>
        <form className="row g-3 needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-6">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              onChange={handleChange}
              value={data.fname}
              placeholder='John'
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
              placeholder='Perera'
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Phone Number</label>
            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                id="phoneNum"
                onChange={handleChange}
                value={data.phoneNum}
                placeholder='07xxxxxxx'
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
              placeholder='John@example.com'
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
              placeholder='Srilanka'
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
              placeholder='Kurunegala'
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
              placeholder='No.42/2 Kandy Road, Mawathagama'
              required
            />
            <div className="invalid-feedback">Please provide an address.</div>
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
              min="0"
              max={maxBook}
              step="1"
            />
            {data.numberInput==maxBook && <p style={{fontSize:'12px',color:'red'}}>Maxium {maxBook} Books</p>}
            <div className="invalid-feedback">Please enter a quantity.</div>
          </div>
        </form>
        <input type='submit' className="btn btn-primary" onClick={()=>onClickConfirmBookPayment(data)} value="Donate" disabled={handleCheckFeilds()} />
        <button className="btn btn-danger" onClick={onClickClose}>Cancel</button>
      </div>          
    </div>
    </div>
  );
}

export default DonateBookComponent;
