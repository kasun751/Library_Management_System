import React from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

function DashBoard() {
  return (
    <>
      <HeaderComponent />
      <div className='container dashboard-outer'>
        <div className='row dashboard'>
          <div className="col-12 header">
            <h1>Control Panel</h1>
          </div>
          <div className="col-12 dashboard-btn-panel">
            <div className='row mb-4'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/bookconer' className='btn btn-primary w-100'>Book Coner</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/memberportal' className='btn btn-primary w-100'>Member Portal</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/fundmanager' className='btn btn-primary w-100'>Fund Manager</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/userapproval' className='btn btn-primary w-100'>User Approval</Link>
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/viewinventory' className='btn btn-primary w-100'>View Inventory</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-primary w-100'>Idea Approval</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/checkin' className='btn btn-primary w-100'>Check In</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/checkout' className='btn btn-primary w-100'>Check Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default DashBoard;
