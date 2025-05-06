import React from 'react';
import './BodyComponent.css';
import DonateBook from '../Images/book-donate.jpg';
import DonateFunds from '../Images/fund-donate.jpg';
import { Link } from 'react-router-dom';

function BodyComponent() { 
  return (
    <div className='main-donationBody'>
    <div className='container bodyComponent-donation-outer col-12'>
      <div className='row bodyComponent-donation col-12'>
        <Link to="/donatebooks" className='donate-link col-sm-12 col-lg-5'>
          <div className='donate-books col-10'>
            <img src={DonateBook} alt="Donate Books" />
            <h2>Donate Books</h2>
          </div>
        </Link>
        
        <Link to="/donatefunds" className='donate-link col-sm-12 col-lg-5'>
          <div className='donate-funds col-10'>
            <img src={DonateFunds} alt="Donate Funds" />
            <h2>Donate Funds</h2>
          </div>  
        </Link>
      </div>
    </div>
    </div>
  );
}

export default BodyComponent;
