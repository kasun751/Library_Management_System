import React from 'react';
import ReportTable from './ReportTable';
import './ReportPage.css'

function ReportPage({item}) {

  return (
    <>
      <div className='report-page-container'>
        <div className='post-container'>
          <button id='rejectBtn'>Reject All Reports</button>
          <button id='deleteBtn'>Delete Post</button>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div className='report-details-container'>
        <ReportTable post_id={item.post_id} />
        </div>
      </div>
    </>
  );
}

export default ReportPage;
