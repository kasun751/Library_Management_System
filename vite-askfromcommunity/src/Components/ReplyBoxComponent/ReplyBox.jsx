import React, { useState } from 'react';
import './ReplyBox.css';
import axios from 'axios';
import ReportComponent from '../ReportComponent/ReportComponent';

function ReplyBox({post_id2, user_id, item }) {

  const [isDelete, setIsDelete] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

console.log(item);
  async function handleReport(){
    setIsReportOpen(isReportOpen?false:true);
    // try{
    //     const response = await axios.put(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
    //         reply_id :item.reply_id,
    //         report_status : 1
    //     });        
    // }catch(err){
    //     console.error(err);
    // }
  }

  async function handleDelete(){
    try{
      const res = await axios.delete(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
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
    <>
    {!isDelete && <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>}
   {!isDelete && <div className='replyBoxComponent'>
      {(item.user_id==user_id?true:false) && <label className='reportBtn'  onClick={handleDelete}>Delete</label>}
      {(item.user_id==user_id?false:true) && <label className='reportBtn'  onClick={handleReport}>Report</label>}
      {item.post_id === post_id2 && <p>{item.reply_msg}</p>}
    </div>}
    {isReportOpen &&
          <ReportComponent onClose={() => setIsReportOpen(isReportOpen?false:true)} openFeild1={isReportOpen} user_id={user_id} post_id={item.post_id} reportType={"reply"} reply_id={item.reply_id}/>
      }
    </>
  );
}

export default ReplyBox;
