import React from 'react';
import './HeaderComponent.css';
import {Link} from "react-router-dom";
import LoginIcon from "../src/assests/LoginManIcon.svg";
import SLMSLogo from "../src/assests/image.png";
import { logoutFun } from '../../logoutFun';

function HeaderComponent({id,Link1,router1,Link2,router2, Link3,router3, Link4,router4,Link5,router5,Link6,router6,Link7,router7}) {
    return (
        <div id={id} className='header-container commonHeader m-0'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img id='slms-logo' src={SLMSLogo} className="navbar-brand" href="#" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {Link1 && (
                                <li className="nav-item mx-4 mt-3 ">
                                    <Link className="text-white" to={router1}>{Link1}</Link>
                                  </li>
                            )}
                            {Link2 && (
                                <li className="nav-item mx-4 mt-3 ">
                                    <Link className="text-white" to={router2}>{Link2}</Link>
                                </li>
                            )}
                            {Link3 && (
                                <li className="nav-item mx-3 mt-3 ">
                                    <Link className="text-white" to={router3}>{Link3}</Link>
                                </li>
                            )}
                            {Link4 && (
                                <li className="nav-item mx-3 mt-3 ">
                                    <Link className="text-white" to={router4}>{Link4}</Link>
                                </li>
                            )}
                            {Link5 && (
                                <li className="nav-item mx-3 mt-3 ">
                                    <Link className="text-white" to={router5}>{Link5}</Link>
                                </li>
                            )}
                            {Link6 && (
                                <li className="nav-item mx-3 mt-3 ">
                                    <Link className="text-white" to={router6}>{Link6}</Link>
                                </li>
                            )}

                            <li className="nav-item mx-3 mt-3 ">

                            </li>

                            {Link7 && (
                                <li className="nav-item mx-4 mt-3 " onClick={(e) => {
                                    e.preventDefault();
                                    logoutFun();
                                    setTimeout(() => {
                                      window.location.href = '/login'; 
                                    }, 100); 
                                  }}>
                                    <div><img className="mx-2" src={LoginIcon} alt=""/> <Link className="text-white" to={'/login'}>{Link7}</Link></div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;
