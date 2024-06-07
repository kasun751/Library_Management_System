import React, { useState } from 'react'
import './ReportPost.css';
import ReportPage from '../ReportComponent/ReportPage';

function ReportPost({ post }) {
    const [showDescription, setShowDescription] = useState(false);
    const [openReportPage, setOpenReportPage] = useState(false);
  return (
    <>
        <div className='reportPost-container'>            
            <div>
              <button onClick={()=>setOpenReportPage(openReportPage?false:true)}>View Report Details</button>
              <h2>{post.title}</h2>
              <h4 onClick={()=>setShowDescription(showDescription?false:true)}>Description</h4>
              {showDescription && <p>{post.description}</p>}
            </div>
        </div>
        {openReportPage&&<ReportPage item={post}/>}
    </>    
  )
}

export default ReportPost