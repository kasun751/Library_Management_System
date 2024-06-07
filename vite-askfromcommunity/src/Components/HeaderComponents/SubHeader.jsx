import React, { useState } from 'react';
import './SubHeader.css'
import SidePanel from '../SidePanelComponent/SidePanel';
function SubHeader(props) {

  const [savePostVisible,setSavePostVisible] = useState(false);
  const [myPostVisible,setMyPostVisible] = useState(false);
  const [reportPostsVisible,setReportPostVisible] = useState(false);
const mySavedPost = () =>{
  setSavePostVisible(savePostVisible? false:true);
  setReportPostVisible(false);
  setMyPostVisible(false);
}
const myPost =()=>{
  setMyPostVisible(myPostVisible? false:true);
  setSavePostVisible(false);
  setReportPostVisible(false);
}

const showReportedPost=()=>{
  setReportPostVisible(reportPostsVisible? false:true);
  setSavePostVisible(false);
  setMyPostVisible(false);
}

  return (
    <>
        <div className='subHeadeContainer'>
        <div className='headerTitle'>
            <img src='src\Images\community.svg' />
            <h3>Ask From Community</h3>
        </div>
        <div className='subHeaderImageBtnPannel'>
            <img src='src\Images\message-white-heart.svg' alt="Reacted Posts" onClick={mySavedPost}/>
            <img src='src\Images\message-line.svg' alt="My posts" onClick={myPost}/>
            <img src='src\Images\reported-msg.svg' alt='Reported Post' onClick={showReportedPost} />
        </div>       

    </div>
    {savePostVisible && <SidePanel user_id={props.user_id} user_type={"reg"} state={"savePost"} />}
    {myPostVisible && <SidePanel user_id={props.user_id} user_type={"reg"} state={"myPost"} />}
    {reportPostsVisible && <SidePanel user_id={props.user_id} user_type={"staff"} state={false} />}
    </>
  )
}

export default SubHeader