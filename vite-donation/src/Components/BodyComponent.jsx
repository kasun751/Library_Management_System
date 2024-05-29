import React from 'react'
import './BodyComponent.css'
import DonateBook from '../Images/book-donate.jpg';
import DonateFunds from '../Images/fund-donate.jpg';
import { Link } from 'react-router-dom';

function BodyComponent() {
  return (
    <>
        <div className='bodyComponent-donation'>
            <Link to="/donatebooks">
                <div className='donate-books'>
                    <img src={DonateBook} />
                    <h2>Donate Books</h2>
                </div>
            </Link>
            
            <Link to="/donatefunds">
                <div className='donate-funds'>
                <img src={DonateFunds} />
                    <h2>Donate Funds</h2>
                </div>  
            </Link>
        </div>
    </>
  )
}

export default BodyComponent