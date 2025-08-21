import React, { useContext } from 'react';
import './SubHeader.css';
import { SearchDataContext } from '../Pages/DonateBookPage';
import homeBtn from '../Images/home-btn.svg';
import logOutIcon from '../Images/Vector.svg';
import { logoutFun } from '../../../logoutFun';
import SLMSLogo from '../Images/SLMS-mini-logo.png';

function SubHeader({ searchBar }) {
  const { searchData, setSearchData } = useContext(SearchDataContext);

  return (
    <div className='subHeader-donation container-fluid'>
      <div className='row align-items-center gy-3'>
        {/* Left section with logo and title */}
        <div className='col-12 col-md-4 d-flex align-items-center'>
          <img id='slms-logo' src={SLMSLogo} alt='SLMS Logo' />
          <h3 className='m-4'>Donation Handler</h3>
        </div>

        {/* Search Bar - Visible only when enabled */}
        {searchBar ? (
          <div className='col-12 col-md-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search'
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        ) : (
          <div className='col-12 col-md-3'></div>
        )}

        {/* Navigation Links */}
        <div className='col-12 col-md-5'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
              <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div
                className='collapse navbar-collapse justify-content-end'
                id='navbarNav'
              >
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <a className='nav-link' href='/'>
                      Home
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='/dashboard'>
                      DashBoard
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link'
                      href='/login'
                      id='logout'
                      onClick={(e) => {
                        e.preventDefault();
                        logoutFun();
                        setTimeout(() => {
                          window.location.href = '/login';
                        }, 100);
                      }}
                    >
                      <img
                        src={logOutIcon}
                        id='logout-icon'
                        alt='logout-icon'
                      />
                      LogOut
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SubHeader;
