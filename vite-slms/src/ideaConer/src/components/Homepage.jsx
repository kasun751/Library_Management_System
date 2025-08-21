import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from './FooterComponent';

const Homepage = ({ userType }) => {
  const navigate = useNavigate();

  return (
    <div className="homepage-wrapper">
      <HeaderComponent
        id="homePageHeader"
        className="header-container"
        router1="/"
        Link1="Home"
        //text="Idea Corner"
        router2="/dashboard"
        Link2="DashBoard"
        router7="/logout"
        Link7="Log Out"
      />
      <div className='idea-corner'>
      <main className="homepage-container">
        <h1 className="display-1 fw-bold text-white text-center mb-5 " style={{textShadow: '3px 3px 0 #000'}}>
          SHOW <br /> YOUR <br /> <span className="head-col">CREATIVITY</span>
        </h1>
        <div className="buttons-container">
          <button 
            className={`btn_button ${userType === 'adult' ? 'btn_gray' : ''}`} 
            onClick={() => navigate('/kid')}
          >
            Kid Section
          </button>
          {userType === 'adult' && (
            <button 
              className="btn_button" 
              onClick={() => navigate('/adult')}
            >
              Adult Section
            </button>
          )} 
        </div>
      </main>
      </div>
      <FooterComponent />
    </div>
  );
}

export default Homepage;