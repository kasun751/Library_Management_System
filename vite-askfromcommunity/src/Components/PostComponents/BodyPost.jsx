import React, { useState, useEffect, useContext } from 'react';
import './BodyPost.css';
import ReplyBox from '../ReplyBoxComponent/ReplyBox';
import axios from 'axios';
import SubmitPostForm from '../FormComponents/SubmitPostForm';
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import DescriptionBox from '../PostComponents/DescriptionBox'
import ReportComponent from '../ReportComponent/ReportComponent';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { userAuthentication } from '../../App';

function BodyPost({ post}) {
  const [reply, setReply] = useState('');
  const [replyBulk, setReplyBulk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [isAvailable,setIsAvailable] = useState(false);
  const [isDelete,setIsDelete] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const {handleRefresh} = useContext(postRefresh);
  const {user_id, user_type} = useContext(userAuthentication)


  useEffect(() => {
    getReplyMsgFromDB();
    setIsAvailable(post.user_id==user_id ? true:false);
  }, [post]);

  useEffect(()=>{
    handleLoadSavePost();
  },[savePost])

  async function getReplyMsgFromDB() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/replyMsgController.php?post_id=${post.post_id}`);//ok
      setReplyBulk(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLoadSavePost(){
    try{
      const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/userSavedPostController.php?user_id=${user_id}`)//ok
      response.data.map((item)=>{
          if(item.post_id==post.post_id){
            setSavePost(true);
          }
        })
    }catch(err){
      console.error(err);
    }
  }

  async function handleRemoveSavePost(){
    try{ //ok
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/userSavedPostController.php`,{
        data:{
          user_id:user_id,
          post_id:post.post_id
        }
      })
    }catch(err){
      console.error(err);
    }
  }

  async function handleSetSavePost(){
    try{ //ok
      const res = await axios.post(`http://localhost:80/project_1/AskFromCommunity/Controller/userSavedPostController.php`,{
        user_id:user_id,
        post_id:post.post_id
      });
    }catch(err){
      console.error(err);
    }
  }

  const handleSaveBtn = () =>{
    savePost? handleRemoveSavePost():handleSetSavePost();
    setSavePost(savePost? false:true);
  }

  async function handleReport(){
    setIsReportOpen(isReportOpen?false:true);
  }

  async function setReplyMsgToDB() {
    try {
      setLoading(true);
      await axios.post(`http://localhost:80/project_1/AskFromCommunity/Controller/replyMsgController.php`, {
        post_id: post.post_id,
        user_id: user_id,
        reply_msg: reply
      }); //ok
      getReplyMsgFromDB()
      //setReplyBulk([...replyBulk, { post_id: post.post_id, reply_msg: reply, user_id:user_id }]);
      setReply('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(){
    setEditForm(editForm? false:true);
    try{ //ok
      const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php?post_id=${post.post_id}`); 
      setEditedPost(response.data[0]);
    }catch(err){
      console.error(err);
    }
    
  }
  
  async function handleDelete(){    
    try{ //ok
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/Controller/postController.php`,{
      data:{
        post_id:post.post_id
      }
    });
    setIsDelete(true);
    handleRefresh();
    }catch(err){
      console.error(err);
    }
  }

  const handleSendReply = () => {
    if (reply.trim().length !== 0) {
      setReplyMsgToDB();
    }
  };

  const handleVisibility = () => {
    setVisible(prevVisible => !prevVisible);
  };

  const img = savePost? 'src/Images/save.svg':'src/Images/unSave.svg';

  return (
    <>
      {!isDelete && <div className='container  postComponent col-lg-12 col-sm-12'>
        <div className='image-box'>
          <div className='post-btn-panel'>
              <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>
              {!isAvailable && <label className='reportBtn'  onClick={handleReport}>Report</label>}
              {isAvailable && <label className='buttonPanel' onClick={handleEdit}>Edit</label>}
              {!isAvailable && <img id="savePostBtn" src={img} onClick={handleSaveBtn} />}
              {isAvailable && <label className='buttonPanel' onClick={handleDelete}>Delete</label>}
          </div> 
            <div className='imageSlider-container'>
              <div >
                  <ImageSlider post_id={post.post_id}/>
              </div>                               
            </div>            
        </div>
        <div className='contentBox col-lg-10'>
          <div className='title-box'>
              <h1>{post.title}</h1>
              <DescriptionBox description={post.description} />
                <input
                      type='text'
                      value={reply}
                      placeholder='enter your reply'
                      onChange={(e) => setReply(e.target.value)}
                  />
                  <div className='post-msg-btn'>
                    <img src="src\Images\send-reply.svg" alt="" onClick={handleSendReply} />
                    <img src={visible ? "src/Images/not-see.svg" : "src/Images/look.svg"} alt="" onClick={handleVisibility} />
                  </div>
                  {/* <button disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Send Reply'}</button>
                  <button onClick={handleVisibility}>{visible ? 'Hide Replies' : 'Show Replies'}</button> */}
          </div>
          <div className='replyBox'>
            {visible && replyBulk.map((item, index) => (
                <ReplyBox  key={index} post_id2={post.post_id} item = {item}/>
            ))}
          </div>
        </div>
      </div>
      }
      {editedPost && editForm && (
                <SubmitPostForm
                    category={editedPost.category}
                    title={editedPost.title}
                    description={editedPost.description}
                    formAvailable={true}
                    post_id={post.post_id}
                    btn_value = "Edit Post"
                    user_id = {user_id}
                />
            )}
      {isReportOpen &&
          <ReportComponent onClose={() => setIsReportOpen(isReportOpen?false:true)} openFeild1={isReportOpen} post_id={post.post_id} reportType={"post"} reply_id={""}/>
      }

    </>
  );
}

export default BodyPost;
