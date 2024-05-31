import React, { useState, useEffect } from 'react';
import './PanelPost.css';
import ReplyBox from '../ReplyBoxComponent/ReplyBox';
import axios from 'axios';
import SubmitPostForm from '../FormComponents/SubmitPostForm';

function PanelPost({ post,user_id }) {
  const [reply, setReply] = useState('');
  const [replyBulk, setReplyBulk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [isAvailable,setIsAvailable] = useState(false);
  const [isDelete,setIsDelete] = useState(false);

  useEffect(() => {
    getReplyMsgFromDB();
    setIsAvailable(post.user_id==user_id ? true:false);
  }, [post]);

  useEffect(()=>{
    handleLoadSavePost();
  },[savePost])

  async function getReplyMsgFromDB() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php?post_id=${post.post_id}`);
      setReplyBulk(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLoadSavePost(){
    try{
      const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php?user_id=${user_id}`)
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
    try{
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php`,{
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
    try{
      await axios.post(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php`,{
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
    try{
        await axios.put(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
            reply_id : post.reply_id,
            report_status : 1
        });
        
    }catch(err){
        console.error(err);
    }
  }

  async function setReplyMsgToDB() {
    try {
      setLoading(true);
      await axios.post(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`, {
        post_id: post.post_id,
        user_id: user_id,
        reply_msg: reply
      });
      setReplyBulk([...replyBulk, { post_id: post.post_id, reply_msg: reply }]);
      setReply('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(){
    try{
      const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?post_id=${post.post_id}`); 
      setEditedPost(response.data[0]);
    }catch(err){
      console.error(err);
    }
  }

  async function handleDelete(){
    try{
      await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
      data:{
        post_id:post.post_id
      }
    });
    setIsDelete(true);
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
      {!isDelete && <div className='sidePanelPostComponent'>
          <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>
          {!isAvailable && <label className='reportBtn'  onClick={handleReport}>Report</label>}
          {isAvailable && <label className='buttonPanel' onClick={handleEdit}>Edit</label>}
          {!isAvailable && <img id="savePostBtn" src={img} onClick={handleSaveBtn} />}
          {isAvailable && <label className='buttonPanel' onClick={handleDelete}>Delete</label>}
          <br />
          <img src='src\Images\message-line.svg' />
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div className='sidePanelPostComponent-postImageBtnPannel'>
          <input
            type='text'
            value={reply}
            placeholder='enter your reply'
            onChange={(e) => setReply(e.target.value)}
          />
          <br /><br />
          <button disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Send Reply'}</button>
          <button onClick={handleVisibility}>{visible ? 'Hide Replies' : 'Show Replies'}</button>
        </div>
        <div className='sidePanelPostComponent-replyBox'>
          {visible &&
            replyBulk.map((item, index) => (
              <ReplyBox  key={index} post_id2={post.post_id} item = {item}/>
            ))}
            {editedPost && (
          <SubmitPostForm
            category={editedPost.category}
            title={editedPost.title}
            description={editedPost.description}
            formAvailable={true}
            post_id={post.post_id}
            btn_value = "Edit Post"
          />
        )}
        </div>
      </div>}
    </>
  );
}

export default PanelPost;
