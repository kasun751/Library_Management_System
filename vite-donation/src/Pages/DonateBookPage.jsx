import React, {createContext, useEffect, useState } from 'react';
import './DonateBookPage.css';
import SubHeader from '../Components/SubHeader';
import FooterComponent from '../Components/FooterComponent';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import bookImg from '../Images/book-img.svg';
import DonateBookComponent from '../Components/DonateBookComponent';
import DonatePhysicalBookComponent from '../Components/DonatePhysicalBookComponent';
import DonateConformation from '../Components/DonateConformation';
import DonateBookPaymentConformation from '../Components/DonateBookPaymentConfirmation';

export const SearchDataContext = createContext();

function DonateBookPage() {

  const [searchData, setSearchData] = useState("");
  const [bookPrice, setBookPrice] = useState();
  const [record_id, setRecord_id] = useState();
  const [maxBooks, setMaxBooks] = useState();
  const [isbnNumber, setIsbnNumber] = useState();
  const [openPayment, setOpenPayment] = useState(false);
  const [openGetDetails, setOpenGetDetails] = useState(false);
  const [offSet, setOffSet] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openConfirmationBookPayment, setOpenConfirmationBookPayment] = useState(false);

  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showThankYouModal2, setShowThankYouModal2] = useState(false);

  const [bookDetails, setBookDetails] = useState([]);
  const [donatorData, setDonatorData] = useState({});

  useEffect(() => {
    loadBookDetails(searchData,offSet);
  }, [searchData,offSet]);

  useEffect(() => {
    loadBookDetails(searchData,offSet);
  }, [searchData]);

  const handleClickDonate=(record_id, price, isbn)=>{
    setBookPrice(price)
    setIsbnNumber(isbn)
    setRecord_id(record_id);
    setOpenPayment(true)
  }
  const handleClickBookDonate=(record_id, price, isbn)=>{
    console.log("hello")
    setBookPrice(price)
    setIsbnNumber(isbn)
    setRecord_id(record_id);
    setOpenGetDetails(true)
  }
  const onClickSetOffSet=(val)=>{
    if(offSet==0&&val<0){
    }else{
      if(bookDetails.length+25>offSet || val<0)
      setOffSet(offSet+val);
    }
  }

  const onClickConfirm=(data)=>{
    setOpenConfirmation(true);
    setDonatorData(data);
  }
  const onClickConfirmBookPayment=(data)=>{
    setOpenConfirmationBookPayment(true);
    setDonatorData(data);
  }

  const onClickDonate =()=>{
    saveDonator(donatorData);
    setShowThankYouModal(true);
    setOpenConfirmation(false);
  }
  const closeThankYouModal = () => {
    setShowThankYouModal(false);
  };
  const closeThankYouModal2 = () => {
    setShowThankYouModal2(false);
  };

  async function paymentGateway() {
    try {
      console.log("Fetching payment data...");
      const res = await axios.post('http://localhost:80/project_1/DonationHandling/Controller/payHereProcessController.php', donatorData);
      const obj = res.data;
      console.log("Payment data:", obj);

      payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:", orderId);
      };

      payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      payhere.onError = function onError(error) {
        console.log("Error:", error);
      };

      const payment = {
        sandbox: true,
        merchant_id: "1227349",
        return_url: "http://localhost:5173/",
        cancel_url: "http://localhost:5173/",
        notify_url: "",
        order_id: obj.order_id,
        items: obj.items,
        amount: obj.amount,
        currency: obj.currency,
        hash: obj.hash,
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
    }finally{      
      setOpenPayment(false);
      setShowThankYouModal2(true);
    }
  }

  async function saveDonator(data) {
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

  async function loadBookDetails(searchData,offSet) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/donateBookController.php?search=${searchData}&offset=${offSet}`);
      setBookDetails(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SearchDataContext.Provider value={{searchData, setSearchData}}>
        <SubHeader searchBar={true} />
        <div id='page-numbers'>
              <img src="src\Images\prev-page-btn.svg" onClick={()=>onClickSetOffSet(-25)} />
              <p>Page {offSet/25+1}</p>
              <img src="src\Images\next-page-btn.svg" onClick={()=>onClickSetOffSet(25)} />
        </div>
        {openConfirmation && <div id='Donation-con-div'><DonateConformation onClickConfirm={onClickDonate} onClickCloseConfirmation={()=>setOpenConfirmation(false)}/></div>}

        {openConfirmationBookPayment && <div id='Donation-con-div'><DonateBookPaymentConformation onClickConfirm={paymentGateway} onClickCloseConfirmation={()=>setOpenConfirmationBookPayment(false)}/></div>}

        <div className='donateBook-container'>
          {bookDetails?.map((item, index) => (
            <div key={index} className="card-outer">
              <Card style={{ width: '18rem' }} className='card_container'> 
                <Card.Body>
                  <Card.Title><h5 id='donate-book-title'>{item.bookName}</h5></Card.Title>
                  
                  {/* <Card.Img variant="top" src={bookImg} style={{ width: '40%',margin: '0 auto' }} /> */}
                  <Card.Text style={{display:'flex', justifyContent:'center' }}>
                  <span id='book-requied'><label>Requied: </label>&nbsp; {item.quantity}</span>
                  <span id= 'book-received'><label>Received: </label>&nbsp; {item.received_qty}</span>
                  </Card.Text>
                  <Card.Text>
                    <label>ISBN: </label>&nbsp; {item.ISBN_Number} 
                  </Card.Text>
                  <Card.Text>
                    <label>Author: </label>&nbsp; {item.authorName}
                  </Card.Text>
                  <Card.Text >
                    <label>Publisher:</label>&nbsp; {item.publisherName}
                  </Card.Text>
                  <Card.Text>
                    <label>Unit Price: </label>&nbsp; Rs.{item.bookPrice}
                  </Card.Text>
                  <div className='d-flex justify-content-center'>
                    <Button variant="primary" style={{margin:"0 5px 0 0",background:" rgb(6,46,95)",border:'none' }} onClick={()=>{handleClickBookDonate(item.record_id,item.bookPrice,item.ISBN_Number);setMaxBooks(item.quantity-item.received_qty)}} >Donate Book</Button>

                    <Button variant="secondary" style={{background:" rgb(127,182,247)",border:'none' }} onClick={()=>{handleClickDonate(item.record_id,item.bookPrice,item.ISBN_Number);setMaxBooks(item.quantity-item.received_qty)}}>Donate Money</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <FooterComponent />
        {openPayment && <DonateBookComponent onClickConfirmBookPayment={onClickConfirmBookPayment} onClickClose={()=>setOpenPayment(false)}  maxBook={maxBooks} record_id = {record_id} amount={bookPrice} purpose={isbnNumber}/>}
          
        {openGetDetails && <DonatePhysicalBookComponent onClickClose={()=>setOpenGetDetails(false)} maxBook={maxBooks} record_id = {record_id} amount={bookPrice} purpose={isbnNumber} onClickConfirm={onClickConfirm}/>}
        
          {/* Thank You Modal */}
      {showThankYouModal&&<div className='thankyou-outer-container'>
        <div className={`modal fade ${showThankYouModal ? 'show' : ''}`} style={{ display: showThankYouModal ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank You!</h5>
                <button type="button" className="btn-close" onClick={closeThankYouModal}></button>
              </div>
              <div className="modal-body">
                <p>Thank you for your donation, ! We truly appreciate your support.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeThankYouModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>    } 

      {showThankYouModal2&&<div className='thankyou-outer-container'>
        <div className={`modal fade ${showThankYouModal2 ? 'show' : ''}`} style={{ display: showThankYouModal2 ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank You!</h5>
                <button type="button" className="btn-close" onClick={closeThankYouModal2}></button>
              </div>
              <div className="modal-body">
                <p>Thank you for your donation, ! We truly appreciate your support.Book Payment</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeThankYouModal2}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>    } 
      </SearchDataContext.Provider>      
    </>
  );
}

export default DonateBookPage;
