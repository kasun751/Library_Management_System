import React, { useContext, useEffect, useState } from 'react';
import './ReplyBox.css';
import axios from 'axios';
import ReportComponent from '../ReportComponent/ReportComponent';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';

function ReplyBox({post_id2, item }) {

  const [isDelete, setIsDelete] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isfade,setIsFade] = useState(false);
  const {handleRefresh} = useContext(postRefresh)

  const {user_id, user_type} = useContext(userAuthentication)

  async function handleReport(){
    setIsReportOpen(isReportOpen?false:true);
  }

  async function handleDelete(){
    try{ //ok
      const res = await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/replyMsgController.php`,{
      data:{
        reply_id :item.reply_id
      }
    }); 
    setIsDelete(true);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className='main-replyBox'>
    {!isDelete && <label style={{color:'gray',fontStyle:'italic'}}>{item.FirstName+" "+item.LastName}</label>}
   {!isDelete && <div className='replyBoxComponent'>
      {(item.user_id==user_id?true:false) && <label className='reportBtn'  onClick={handleDelete}>Delete</label>}
      {(item.user_id==user_id?false:true) && <label className='reportBtn'  onClick={()=>handleReport()}>Report</label>}
      {item.post_id === post_id2 && <p>{item.reply_msg}</p>}
    </div>}
    {isReportOpen &&
          <ReportComponent onClose={()=>setIsReportOpen(isReportOpen?false:true)} openFeild1={isReportOpen} post_id={item.post_id} reportType={"reply"} reply_id={item.reply_id}/>
      }
    </div>
  );
}
 
export default ReplyBox;
