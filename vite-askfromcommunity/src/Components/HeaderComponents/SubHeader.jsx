import React, { useState, useEffect, useContext } from 'react';
import './SubHeader.css'
import SidePanel from '../SidePanelComponent/SidePanel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';

function SubHeader({ onChangeTitle}) {

  const [savePostVisible,setSavePostVisible] = useState(false);
  const [myPostVisible,setMyPostVisible] = useState(false);
  const [reportPostsVisible,setReportPostVisible] = useState(false);
  const [reportMsgVisible,setReportMsgVisible] = useState(false);
  const [titleField, setTitleField] = useState("");

  const {handleRefresh} = useContext(postRefresh);
  const {user_id, user_type} = useContext(userAuthentication)

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
                  <Nav.Link><img className='menu-btn' src='src\Images\refresh-btn.svg' alt="Reacted Posts" onClick={handleRefresh}/>
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

    {savePostVisible && <SidePanel onClickClose={()=>setSavePostVisible(savePostVisible? false:true)} state={"savePost"} />}
    {myPostVisible && <SidePanel onClickClose={()=>setMyPostVisible(myPostVisible? false:true)} state={"myPost"} />}
    {reportPostsVisible && <SidePanel onClickClose={()=>setReportPostVisible(reportPostsVisible? false:true)} state={"reportPost"} />}
    {reportMsgVisible && <SidePanel onClickClose={()=>setReportMsgVisible(reportMsgVisible? false:true)}  state={"reportMsg"} />}
    </>
  )
}

export default SubHeader