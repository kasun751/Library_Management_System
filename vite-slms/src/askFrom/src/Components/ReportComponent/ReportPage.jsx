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
  const [isFade, setIsFade] = useState(false);
  const [isModelOn, setIsMOdelOn] = useState(false);
  const [posts, setPosts] = useState([]);

  const {handleRefresh} = useContext(postRefresh);

  useEffect(() => {
    if(status=="reply"){
      getPost(item.post_id);
    }
  }, []);
  function confirmHandleDelete(para){
     
  }
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
    <div className='main-reportPage'>
      {isVisible&&<div className='container col-lg-10 report-page-container'>
        <div className=' post-container'>
          <div className='btn-panel'>
            <button id='rejectBtn' disabled={isRemove} data-bs-toggle="modal" data-bs-target="#rejectConfirm" onClick={()=>setIsFade(true)}>Reject All Reports</button>

            <button id='deleteBtn'  disabled={isDelete} data-bs-toggle="modal" data-bs-target="#deleteConfirm" onClick={()=>{setIsMOdelOn(true),setIsFade(true)}}>{status=="post"?"Delete Post":"Delete Reply"}</button>
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
        {isFade&&<div id='back-fade'></div>}
      </div>}
      {
        <div className="modal fade" id="deleteConfirm" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" id='testing'>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "black" }}>Confirmation...!!!</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h3>Do you want to Delete Post...!</h3>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setIsMOdelOn(false),setIsFade(false)}}>No</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{handleDelete(),setIsFade(false)}}>Yes</button>
            </div>
          </div>
        </div>
      </div>
      }
      {
        <div className="modal fade" id="rejectConfirm" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Confirmation...!!!</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h3>Do you want to Reject Post Reports...!</h3>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setIsFade(false)}>No</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{handleRemoveReports(),setIsFade(false)}}>Yes</button>
            </div>
          </div> 
        </div>
      </div>
      }
    </div>
  );
}

export default ReportPage;
