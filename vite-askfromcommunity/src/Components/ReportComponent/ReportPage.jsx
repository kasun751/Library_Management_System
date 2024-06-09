import React, { useState, useEffect } from 'react';
import ReportTable from './ReportTable';
import './ReportPage.css'
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import axios from 'axios';

function ReportPage({item, status}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(status=="reply"){
      getPost(item.post_id);
    }
  }, []);

  async function handleDelete(){
    setIsDelete(true);
      try{
        if(status=="post"){          
        alert("Post deleted!!!");
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
          data:{
            post_id:item.post_id,
            status:"deletePost"
          }
        });
        }else{
          alert("Reply deleted!!!");
          await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
          data:{
            post_id:item.post_id,
            status:"deletePost"
          }
        });
        }
        
      }catch(err){
        console.error(err);
      }
  }
    
  async function getPost($post_id) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?post_id=${$post_id}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveReports(){
    setIsRemove(true);
    alert("Romoved All Reports!!!")
    try{
      if(status=="post"){
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
          data:{
            post_id:item.post_id,
            status:"removeReports"
          }
        });
      }else{
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
          data:{
            post_id:item.post_id,
            status:"removeReports"
          }
        });
      }
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
          <ImageSlider post_id={item.post_id}/>
          </div>
          {(status=="post"?true:false)&&<h2>{item.title}</h2>}
          {(status=="post"?true:false)&&<p>{item.description}</p>}
          {(status=="reply"?true:false)&& posts.map((item) => (
            <div key ={item.post_id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div >            
          ))}
        </div>
        <hr />
        <br />
        <div className='report-details-container'>
        {(status=="post"?true:false)&&<ReportTable status={status} post_id={item.post_id} reply_id={""} />}

        {(status=="reply"?true:false)&&<ReportTable status={status} post_id={item.post_id} reply_id={item.reply_id} />}
        </div>
      </div>
    </>
  );
}

export default ReportPage;
