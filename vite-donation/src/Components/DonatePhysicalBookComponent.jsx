import React, { useState } from 'react';
import axios from 'axios';
import './DonateBookComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DonatePhysicalBookComponent({ onClickClose, purpose, record_id, maxBook, onClickConfirm }) {
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
    amount: -1,
    record_id: record_id,
  });
//   const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckFeilds = () => {
    return !(data.fname !== "" && data.lname !== "" && data.email !== "");
  }

  async function saveDonator() {
    try {
      console.log("Fetching payment data...");
      const res = await axios.post('http://localhost:80/project_1/DonationHandling/Controller/payHereProcessController.php', data);
      const obj = res.data;
      console.log("Payment data:", obj);
      // Show thank you modal after successful donation
      setShowThankYouModal(true);
    } catch (err) {
      console.error("Error fetching payment data:", err);
    }
  }

//   const closeThankYouModal = () => {
//     setShowThankYouModal(false);
//     onClickClose();  // Close the parent component when thank you modal is closed
//   };

  return (
    <div id='donate-book' className='donate-books-outer-container'>
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
        <input type='submit' className="btn btn-primary"  value="Donate" onClick={()=>{onClickConfirm(data),onClickClose()}} disabled={handleCheckFeilds()} />
        <button className="btn btn-danger" onClick={onClickClose}>Cancel</button>
      </div> 

      {/* Thank You Modal */}
      {/* <div className={`modal fade ${showThankYouModal ? 'show' : ''}`} style={{ display: showThankYouModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thank You!</h5>
              <button type="button" className="btn-close" onClick={closeThankYouModal}></button>
            </div>
            <div className="modal-body">
              <p>Thank you for your donation, {data.fname} {data.lname}! We truly appreciate your support.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeThankYouModal}>Close</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DonatePhysicalBookComponent;
