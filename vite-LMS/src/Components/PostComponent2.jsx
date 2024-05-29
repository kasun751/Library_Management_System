import React, { useState, useEffect } from 'react';
import './PostComponent2.css';
import ReplyBoxComponent from './ReplyBoxComponent';
import axios from 'axios';
import SubmitPost from './SubmitPost';

function PostComponent2({ post,user_id }) {
  const [reply, setReply] = useState('');
  const [replyBulk, setReplyBulk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [editForm, setEditForm] = useState(false);
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
    setEditForm(editForm? false:true);
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
      {!isDelete && <div className='postComponent'>
        <div className='contentBox'>
            <table>
                <tbody>
                    <tr>
                        <td><label style={{color:'gray',fontStyle:'italic'}}>user_name</label></td>
                        <td>{!isAvailable && <label className='reportBtn'  onClick={handleReport}>Report</label>}</td>
                        <td>{isAvailable && <label className='buttonPanel' onClick={handleEdit}>Edit</label>}</td>
                        <td>{!isAvailable && <img id="savePostBtn" src={img} onClick={handleSaveBtn} />}</td>
                        <td>{isAvailable && <label className='buttonPanel' onClick={handleDelete}>Delete</label>}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <img src='src\Images\message-line.svg' />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                        <h2>{post.title}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                        <p>{post.description}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className='postImageBtnPannel' colSpan={5}>
                            <input
                                type='text'
                                value={reply}
                                placeholder='enter your reply'
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <button disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Send Reply'}</button>
                            <button onClick={handleVisibility}>{visible ? 'Hide Replies' : 'Show Replies'}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='replyBox'>
            {visible && replyBulk.map((item, index) => (
                <ReplyBoxComponent  key={index} post_id2={post.post_id} item = {item}/>
            ))}
            {editedPost && editForm && (
                <SubmitPost
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

export default PostComponent2;
