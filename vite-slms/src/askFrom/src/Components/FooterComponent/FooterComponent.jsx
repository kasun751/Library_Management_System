import React from 'react';
import './FooterComponent.css';
import { Link } from 'react-router-dom';

import ideaConer from '../../Images/mdi_art.svg';
import miniLogo from '../../Images/SLMS-mini-logo.svg';
import askFromLogo from '../../Images/askForum-logo.svg';

function FooterComponent() {
  return (
    <div className='footer-container'>
      <div className='row mb-4 justify-content-center'>
        <div className='col-4 col-md-1 mb-2 icon-div'>
          <a href='/ideaConer'>
            <img src={ideaConer} alt='idea coner' />
            <label>Idea Coner</label>
          </a>
        </div>
        <div className='col-4 col-md-1 mb-2 icon-div'>
          <a href='/'>
            <img src={miniLogo} alt='SLMS' />
            <label>SLMS</label>
          </a>          
        </div>
        <div className='col-4 col-md-1 mb-2 icon-div'>
          <a href='/askfromcommunity'><img src={askFromLogo} alt='ask forum' />
          <label>Ask Forum</label></a>
        </div>
      </div>
      <div className='row mb-4 justify-content-center'>
        <Link to='/' className='col-6 col-md-1 mb-2 footer-link'>Home</Link>
        <Link to='/' className='col-6 col-md-1 mb-2 footer-link'>About Us</Link>
        <Link to='/' className='col-6 col-md-1 mb-2 footer-link'>Services</Link>
        <Link to='/' className='col-6 col-md-1 mb-2 footer-link'>Contact Us</Link>
      </div>
      <div className='row justify-content-center'>
        <p className='footer-text'>© All Rights Reserved</p>
      </div>
    </div>
  )
}

export default FooterComponent;
