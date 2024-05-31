import React, { useState } from 'react';
import './SubHeader.css'
import SidePanel from '../SidePanelComponent/SidePanel';
function SubHeader(props) {

  const [savePostVisible,setSavePostVisible] = useState(false);
  const [myPostVisible,setMyPostVisible] = useState(false);
const mySavedPost = () =>{
  setSavePostVisible(savePostVisible? false:true);
  setMyPostVisible(false);
}
const myPost =()=>{
  setMyPostVisible(myPostVisible? false:true);
  setSavePostVisible(false);
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
        </div>       

    </div>
    {savePostVisible && <SidePanel user_id={props.user_id} state={true} />}
    {myPostVisible && <SidePanel user_id={props.user_id} state={false} />}
    </>
  )
}

export default SubHeader