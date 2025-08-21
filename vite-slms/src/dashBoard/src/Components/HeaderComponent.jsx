import React, { useEffect, useState } from 'react';
import './HeaderComponent.css';

import slmsLogo from '../Images/SLMS-logo.svg';
import { logoutFun } from '../../../logoutFun';
import { isGuest } from '../../../userAuthFun';

function HeaderComponent() {
  const [guest, setGuest] = useState(true);
 
  useEffect(() => {
    const checkGuestStatus = async () => {
      try {
        const result = await isGuest();
        setGuest(result); // Update state with guest status
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkGuestStatus();
  }, []); 

 
  return (
    <div className='header-container'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img id='slms-logo' src={slmsLogo} className="navbar-brand" href="#" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/askfromcommunity">Ask Forum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ideaconer">Idea Corner</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/eresource">E-Resourses</a>
              </li>
              {!guest && <li className="nav-item" onClick={logoutFun}>
                <a className="nav-link" href='/login' id='logoutBtn' onClick={(e) => {
                            e.preventDefault();
                            logoutFun();
                            setTimeout(() => {
                              window.location.href = '/login'; 
                            }, 100); 
                          }} aria-disabled="true">LogOut</a>
              </li>}
              {guest && <li className="nav-item">
                <a className="nav-link" href='/login' id='logoutBtn' aria-disabled="true">Sign In</a>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderComponent;
