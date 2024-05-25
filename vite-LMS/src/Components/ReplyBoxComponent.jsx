import React from 'react';
import './ReplyBoxComponent.css';
import axios from 'axios';

function ReplyBoxComponent({post_id2,item }) {

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

  return (
    <>
    <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>
    <div className='replyBoxComponent'>
      <label className='reportBtn'  onClick={handleReport}>Report</label>
      {item.post_id === post_id2 && <p>{item.reply_msg}</p>}
    </div>
    </>
  );
}

export default ReplyBoxComponent;
