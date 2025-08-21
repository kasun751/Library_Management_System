import React, { useContext } from 'react';
import './SubHeader.css';
import { SearchDataContext } from '../Pages/DonateBookPage';
import homeBtn from '../Images/home-btn.svg';

function SubHeader({ searchBar }) {
  const { searchData, setSearchData } = useContext(SearchDataContext);

  return (
    <div className='subHeader-donation'>
      <div className='row gy-2 gx-3 align-items-center'>
        <h3 className='col-4'>Donation Handler</h3>
        {searchBar && (
          <div className="col-3 mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search" 
              value={searchData} 
              onChange={(e) => setSearchData(e.target.value)} 
            />
          </div>
        )}
        {!searchBar && (
          <div className="col-3 mb-3">
          </div>
        )}
        <div className="col-5 mb-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container ">
              <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href='/'>
                      <img src={homeBtn} id="home-btn" alt="home-btn" />
                    </a>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <a className="nav-link" href="#">
                    <img src="src\Images\Vector.svg" id="logout-icon" alt="logout-icon" />
                      <label id='logout'> LogOut</label></a>
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
