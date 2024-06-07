import React, { useState } from 'react';
import ReportTable from './ReportTable';
import './ReportPage.css'
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import axios from 'axios';

function ReportPage({item}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  async function handleDelete(){
    setIsDelete(true);
    alert("Post deleted!!!")
    try{
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
      data:{
        post_id:item.post_id,
        status:"deletePost"
      }
    });
    }catch(err){
      console.error(err);
    }
  }

  async function handleRemoveReports(){
    setIsRemove(true);
    alert("Romoved All Reports!!!")
    try{
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
      data:{
        post_id:item.post_id,
        status:"removeReports"
      }
    });
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <div className='report-page-container'>
        <div className='post-container'>
          <button id='rejectBtn' onClick={handleRemoveReports} disabled={isRemove}>Reject All Reports</button>
          <button id='deleteBtn' onClick={handleDelete} disabled={isDelete}>Delete Post</button>
          <div id='imageSlider-container'>
            <ImageSlider />
          </div>
          
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <hr />
        <br />
        <div className='report-details-container'>
        <ReportTable post_id={item.post_id} />
        </div>
      </div>
    </>
  );
}

export default ReportPage;
