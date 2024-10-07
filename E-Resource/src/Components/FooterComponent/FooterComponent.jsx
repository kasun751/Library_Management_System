import React from 'react';
import './FooterComponent.css';
import { Link } from 'react-router-dom';
import AskForum from "../../assets/images/askForum-logo.svg"
import SLMSLogo from "../../assets/images/SLMS-mini-logo.png";
import IdeaCorner from "../../assets/images/mdi_art.svg"
function FooterComponent() {
    return (
        <div className='footer-container'>
            <div className='row mb-4 justify-content-center'>
                <div className='col-4 col-md-1 mb-2 icon-div'>
                    <img src={IdeaCorner} alt='idea coner' />
                    <label>Idea Coner</label>
                </div>
                <div className='col-4 col-md-1 mb-2 icon-div'>
                    <img src={SLMSLogo} alt='SLMS' />
                    <label>SLMS</label>
                </div>
                <div className='col-4 col-md-1 mb-2 icon-div'>
                    <img src={AskForum} alt='ask forum' />
                    <label>Ask Forum</label>
                </div>
            </div>
            <div className='row mb-4 justify-content-center'>
                <Link to='/bookconer' className='col-6 col-md-1 mb-2 footer-link'>Home</Link>
                <Link to='/memberportal' className='col-6 col-md-1 mb-2 footer-link'>About Us</Link>
                <Link to='/fundmanager' className='col-6 col-md-1 mb-2 footer-link'>Services</Link>
                <Link to='/userapproval' className='col-6 col-md-1 mb-2 footer-link'>Contact Us</Link>
            </div>
            <div className='row justify-content-center'>
                <p className='footer-text'>© All Rights Reserved</p>
            </div>
        </div>
    )
}

export default FooterComponent;
