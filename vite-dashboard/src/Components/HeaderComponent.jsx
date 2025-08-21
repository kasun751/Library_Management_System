import React from 'react';
import './HeaderComponent.css';

function HeaderComponent() {
  return (
    <div className='header-container'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img id='slms-logo' src='src\Images\SLMS_logo.jpg' className="navbar-brand" href="#" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Ask Forum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">E-Task</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-disabled="true">LogOut</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderComponent;
