import React, { useState } from 'react';
import './ReportReplyBox.css';
import axios from 'axios';
import ReportPage from '../ReportComponent/ReportPage';


function ReportReplyBox({post_id2, user_id, item }) {

    const [openReportPage, setOpenReportPage] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  return (
    <>
   <div className='replyBoxComponent'>
      {(item.user_id==user_id?false:true) && <label className='reportBtn'  onClick={()=>setOpenReportPage(openReportPage?false:true)}>View Report Details</label>}
      {item.post_id === post_id2 && <p>{item.reply_msg}</p>}
    </div>
    {openReportPage&&<ReportPage item={item} status={"reply"} />}
    </>
  );
}

export default ReportReplyBox;
