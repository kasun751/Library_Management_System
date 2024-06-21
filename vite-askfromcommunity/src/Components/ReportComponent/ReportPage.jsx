import React, { useState, useEffect, useContext } from 'react';
import ReportTable from './ReportTable';
import './ReportPage.css'
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import axios from 'axios';
import { postRefresh } from '../BodyComponents/BodyComponent';

function ReportPage({item, status}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [posts, setPosts] = useState([]);

  const {handleRefresh} = useContext(postRefresh);

  useEffect(() => {
    if(status=="reply"){
      getPost(item.post_id);
    }
  }, []);
  async function handleDelete(){
    setIsDelete(true);
      try{ //ok
        if(status=="post"){          
        alert("Post deleted!!!");
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php`,{
          data:{
            post_id:item.post_id
          }
        });
        }else{ //ok
          alert("Reply deleted!!!");
          await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/replyMsgController.php`,{
          data:{
            reply_id:item.reply_id
          }
        });
        }
        handleRefresh();
        
      }catch(err){
        console.error(err);
      }
  }
    
  async function getPost($post_id) {
    try { //ok
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php?post_id=${$post_id}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveReports(){
    setIsRemove(true);
    alert("Romoved All Reports!!!")
    try{ //ok
      if(status=="post"){
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/reportPostController.php`,{
          data:{
            post_id:item.post_id,
            status:"removeReports"
          }
        });
      }else{ //ok
        await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/reportReplyMsgController.php`,{
          data:{
            reply_id:item.reply_id,
            status:"removeReports"
          }
        });
      }
      handleRefresh();
      setIsVisible(isVisible?false:true)
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      {isVisible&&<div className='container col-lg-10 report-page-container'>
        <div className=' post-container'>
          <div className='btn-panel'>
            <button id='rejectBtn' onClick={handleRemoveReports} disabled={isRemove}>Reject All Reports</button>

            <button id='deleteBtn' onClick={handleDelete} disabled={isDelete}>{status=="post"?"Delete Post":"Delete Reply"}</button>
            <button id='rejectBtn' onClick={()=>setIsVisible(isVisible?false:true)}>Close</button>
          </div>
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
        <div className=' report-details-container'>
        {(status=="post"?true:false)&&<ReportTable status={status} post_id={item.post_id} reply_id={""} user_id={item.user_id} />}

        {(status=="reply"?true:false)&&<ReportTable status={status} post_id={item.post_id} reply_id={item.reply_id} user_id={item.user_id} />}
        </div>
      </div>}
    </>
  );
}

export default ReportPage;
