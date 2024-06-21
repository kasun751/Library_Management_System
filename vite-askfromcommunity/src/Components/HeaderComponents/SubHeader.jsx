import React, { useState, useEffect, useContext } from 'react';
import './SubHeader.css';
import SidePanel from '../SidePanelComponent/SidePanel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';
import { AnimatePresence, motion } from 'framer-motion';

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

  const variants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  return (
    <>
      <div className='subHeadeContainer'>
        <div className='headerTitle'>
          <img src='src/Images/community.svg' alt="Community" />
          <h3>Ask From Community</h3>
          <input
            type='text'
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
            placeholder='search by title'
          />
        </div>
        <div className='nav-bar '>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>
                    <img
                      className='menu-btn'
                      src='src/Images/refresh-btn.svg'
                      alt="Refresh Posts"
                      onClick={handleRefresh}
                    />
                  </Nav.Link>
                  <Nav.Link>
                    <img
                      className='menu-btn'
                      src='src/Images/message-white-heart.svg'
                      alt="Saved Posts"
                      onClick={mySavedPost}
                    />
                  </Nav.Link>
                  <Nav.Link>
                    <img
                      className='menu-btn'
                      src='src/Images/message-line.svg'
                      alt="My posts"
                      onClick={myPost}
                    />
                  </Nav.Link>
                  <Nav.Link>
                    {(user_type=="staff")&&<img
                      className='menu-btn'
                      src='src/Images/report-post.svg'
                      alt='Reported Post'
                      onClick={showReportedPost}
                    />}
                  </Nav.Link>
                  <Nav.Link>
                    {(user_type=="staff")&&<img
                      className='menu-btn'
                      src='src/Images/reported-msg.svg'
                      alt='Reported Msg'
                      onClick={showReportedMsg}
                    />}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

      <AnimatePresence>
        {savePostVisible && (
          <motion.div
            key="savePost"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SidePanel onClickClose={() => setSavePostVisible(false)} state={"savePost"} />
          </motion.div>
        )}
        {myPostVisible && (
          <motion.div
            key="myPost"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SidePanel onClickClose={() => setMyPostVisible(false)} state={"myPost"} />
          </motion.div>
        )}
        {reportPostsVisible && (
          <motion.div
            key="reportPosts"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SidePanel onClickClose={() => setReportPostVisible(false)} state={"reportPost"} />
          </motion.div>
        )}
        {reportMsgVisible && (
          <motion.div
            key="reportMsg"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SidePanel onClickClose={() => setReportMsgVisible(false)} state={"reportMsg"} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SubHeader;
