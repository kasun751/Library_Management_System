import React, { useState, useEffect, useContext } from 'react';
import './SubHeader.css';
import SidePanel from '../SidePanelComponent/SidePanel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';
import { Link } from 'react-router-dom';

import SLMSlogo from '../../Images/SLMS-logo.svg';
import { logoutFun } from '../../../../logoutFun';

function SubHeader({ onChangeTitle }) {
  const [savePostVisible, setSavePostVisible] = useState(false);
  const [myPostVisible, setMyPostVisible] = useState(false);
  const [reportPostsVisible, setReportPostVisible] = useState(false);
  const [reportMsgVisible, setReportMsgVisible] = useState(false);
  const [titleField, setTitleField] = useState('');

  const { handleRefresh } = useContext(postRefresh);
  const { user_id, user_type } = useContext(userAuthentication);

  const mySavedPost = () => {
    setSavePostVisible(!savePostVisible);
    setReportPostVisible(false);
    setMyPostVisible(false);
    setReportMsgVisible(false);
  };

  const myPost = () => {
    setMyPostVisible(!myPostVisible);
    setSavePostVisible(false);
    setReportPostVisible(false);
    setReportMsgVisible(false);
  };

  const showReportedPost = () => {
    setReportPostVisible(!reportPostsVisible);
    setSavePostVisible(false);
    setMyPostVisible(false);
    setReportMsgVisible(false);
  };

  const showReportedMsg = () => {
    setReportMsgVisible(!reportMsgVisible);
    setSavePostVisible(false);
    setMyPostVisible(false);
    setReportPostVisible(false);
  }; 

  useEffect(() => {
    onChangeTitle(titleField);
  }, [titleField]);

  return (
    <div className='main-header'>
      <div className='subHeadeContainer'>
        <div className='headerTitle'>
          <img src={SLMSlogo} alt="Community" />
          <input
            type='text'
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
            placeholder='search by title'
          />
        </div>
        <div className='nav-bar'>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className="nav-link" onClick={handleRefresh} >
                        <label className="nav-btn refresh-btn">Refresh</label>
                  </Link>
                  <Link className="nav-link" to="/">
                        <label className="nav-btn">Home</label>
                  </Link>
                    <>
                      <NavDropdown title={<span style={{ fontSize: '15px' , fontWeight:'bold' }}>More Options</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/dashboard/" className='nav-drop-items'>DashBoard</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={mySavedPost}>Save Posts</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={myPost}>
                          My Posts
                        </NavDropdown.Item>
                        {user_type === "staff" && (
                        <NavDropdown.Divider />)}
                        {user_type === "staff" && (
                        <NavDropdown.Item onClick={showReportedPost} >Report Ports</NavDropdown.Item>)}
                        {user_type === "staff" && (
                        <NavDropdown.Divider />)}
                        {user_type === "staff" && (
                        <NavDropdown.Item onClick={showReportedMsg}>
                          Report Messages
                        </NavDropdown.Item>)}
                      </NavDropdown>
                      <Link className="nav-link" to="/login" onClick={logoutFun}>
                        <label className="nav-btn">Log Out</label>
                      </Link>
                    </>
                  {/* )} */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

      {savePostVisible && (
          <SidePanel onClickClose={() => setSavePostVisible(false)} state={"savePost"} show={savePostVisible} />
        )}
        {myPostVisible && (
           <SidePanel onClickClose={() => setMyPostVisible(false)} state={"myPost"} show={myPostVisible} />
        )}
        {reportPostsVisible && (
          <SidePanel onClickClose={() => setReportPostVisible(false)} state={"reportPost"} show={reportPostsVisible} />
        )}
        {reportMsgVisible && (
          <SidePanel onClickClose={() => setReportMsgVisible(false)} state={"reportMsg"} show={reportMsgVisible} />
        )}
    </div>
  );
}

export default SubHeader;
