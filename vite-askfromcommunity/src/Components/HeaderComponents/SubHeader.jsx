import React, { useState, useEffect } from 'react';
import './SubHeader.css'
import SidePanel from '../SidePanelComponent/SidePanel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SubHeader({onClickRefresh, onChangeTitle, user_id, user_type}) {

  const [savePostVisible,setSavePostVisible] = useState(false);
  const [myPostVisible,setMyPostVisible] = useState(false);
  const [reportPostsVisible,setReportPostVisible] = useState(false);
  const [reportMsgVisible,setReportMsgVisible] = useState(false);
  const [titleField, setTitleField] = useState("");
const mySavedPost = () =>{
  setSavePostVisible(savePostVisible? false:true);
  setReportPostVisible(false);
  setMyPostVisible(false);
  setReportMsgVisible(false);
}
const myPost =()=>{
  setMyPostVisible(myPostVisible? false:true);
  setSavePostVisible(false);
  setReportPostVisible(false);
  setReportMsgVisible(false);
}

const showReportedPost=()=>{
  setReportPostVisible(reportPostsVisible? false:true);
  setSavePostVisible(false);
  setMyPostVisible(false);
  setReportMsgVisible(false);
}
const showReportedMsg=()=>{
  setReportMsgVisible(reportMsgVisible? false:true);
  setSavePostVisible(false);
  setMyPostVisible(false);
  setReportPostVisible(false);
}

useEffect(() => {
  onChangeTitle(titleField);
}, [titleField]);

  return (
    <>
        <div className='subHeadeContainer'>
          <div className='headerTitle'>
            <img src='src\Images\community.svg' />
            <h3>Ask From Community</h3>
            <input type='text' value={titleField} onChange={(e)=>setTitleField(e.target.value)} placeholder='search by title'/>
          </div>
          <div className='nav-bar '>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link><img className='menu-btn' src='src\Images\refresh-btn.svg' alt="Reacted Posts" onClick={onClickRefresh}/>
                  </Nav.Link>
                  <Nav.Link>
                      <img className='menu-btn' src='src\Images\message-white-heart.svg' alt="Reacted Posts" onClick={mySavedPost}/>
                  </Nav.Link>
                  <Nav.Link href="#link">
                    <img className='menu-btn' src='src\Images\message-line.svg' alt="My posts" onClick={myPost}/>
                  </Nav.Link>
                  <Nav.Link>
                    <img className='menu-btn' src='src\Images\report-post.svg' alt='Reported Post' onClick={showReportedPost} />
                  </Nav.Link>
                  <Nav.Link>
                  <img className='menu-btn' src='src\Images\reported-msg.svg' alt='Reported Msg' onClick={showReportedMsg} />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          </div>       
        </div>

    {savePostVisible && <SidePanel user_id={user_id} user_type={"reg"} state={"savePost"} />}
    {myPostVisible && <SidePanel user_id={user_id} user_type={"reg"} state={"myPost"} />}
    {reportPostsVisible && <SidePanel user_id={user_id} user_type={"staff"} state={"reportPost"} />}
    {reportMsgVisible && <SidePanel user_id={user_id} user_type={"staff"} state={"reportMsg"} />}
    </>
  )
}

export default SubHeader