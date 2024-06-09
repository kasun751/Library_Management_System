import React, { useState, useEffect } from 'react';
import './SubHeader.css'
import SidePanel from '../SidePanelComponent/SidePanel';
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
            <table>
              <tbody>
                <tr>
                  <td><img src='src\Images\community.svg' /></td>
                  <td><h3>Ask From Community</h3></td>
                  <td><input type='text' value={titleField} onChange={(e)=>setTitleField(e.target.value)} placeholder='search by title'/></td>
                  <td>
                    <img id="searchBtn" src='src\Images\search-btn.svg' alt="Reacted Posts" onClick={()=>{onClickRefresh}}/>
                  </td>
                </tr>
              </tbody>
            </table>
            
            
        </div>
        <div className='subHeaderImageBtnPannel'>
            <img src='src\Images\refresh-btn.svg' alt="Reacted Posts" onClick={onClickRefresh}/>
            <img src='src\Images\message-white-heart.svg' alt="Reacted Posts" onClick={mySavedPost}/>
            <img src='src\Images\message-line.svg' alt="My posts" onClick={myPost}/>
            <img src='src\Images\report-post.svg' alt='Reported Post' onClick={showReportedPost} />
            <img src='src\Images\reported-msg.svg' alt='Reported Msg' onClick={showReportedMsg} />
            
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