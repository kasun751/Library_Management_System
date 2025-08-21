import React from 'react';
import './BodyComponent.css';
import DonateBook from '../Images/book-donate.jpg';
import DonateFunds from '../Images/fund-donate.jpg';
import { Link } from 'react-router-dom';

function BodyComponent() {
  return (
    <div className='main-donationBody'>
      <div className='container-fluid bodyComponent-donation-outer'>
        <div className='row justify-content-center align-items-center bodyComponent-donation'>
          {/* Donate Books Section */}
          <Link to="/donatebooks" className='donate-link col-12 col-md-5 mb-4'>
            <div className='donate-books text-center'>
              <img src={DonateBook} className='img-fluid mb-3' alt="Donate Books" />
              <h2>Donate Books</h2>
            </div>
          </Link>

          {/* Donate Funds Section */}
          <Link to="/donatefunds" className='donate-link col-12 col-md-5 mb-4'>
            <div className='donate-funds text-center'>
              <img src={DonateFunds} className='img-fluid mb-3' alt="Donate Funds" />
              <h2>Donate Funds</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BodyComponent;
