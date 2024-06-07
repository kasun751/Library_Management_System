import React, { useState } from 'react';
import './ReplyBox.css';
import axios from 'axios';

function ReplyBox({post_id2,item }) {

  const [isDelete, setIsDelete] = useState(false);

  async function handleReport(){
    try{
        const response = await axios.put(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
            reply_id :item.reply_id,
            report_status : 1
        });        
    }catch(err){
        console.error(err);
    }
  }

  async function handleDelete(){
    try{
      const res = await axios.delete(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
      data:{
        reply_id :item.reply_id
      }
    });
    console.log(item.reply_id);
    setIsDelete(true);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
    {!isDelete && <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>}
   {!isDelete && <div className='replyBoxComponent'>
      <label className='reportBtn'  onClick={handleDelete}>Delete</label>
      <label className='reportBtn'  onClick={handleReport}>Report</label>
      {item.post_id === post_id2 && <p>{item.reply_msg}</p>}
    </div>}
    </>
  );
}

export default ReplyBox;
