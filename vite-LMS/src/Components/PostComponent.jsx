import React, { useState, useEffect } from 'react';
import './PostComponent.css';
import ReplyBoxComponent from './ReplyBoxComponent';
import axios from 'axios';
import SubmitPost from './SubmitPost';

function PostComponent({ post }) {
  const [reply, setReply] = useState('');
  const [replyBulk, setReplyBulk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    getReplyMsgFromDB();
  }, [post]);

  async function getReplyMsgFromDB() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php?post_id=${post.post_id}`);
      setReplyBulk(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleReport(){
    try{
        const response = await axios.put(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
            reply_id : post.reply_id,
            report_status : 1
        });
        console.log(post);
        console.log(response);
        
    }catch(err){
        console.error(err);
    }
  }

  async function setReplyMsgToDB() {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`, {
        post_id: post.post_id,
        user_id: "A12",
        reply_msg: reply
      });
      console.log(response.data);
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

  // const handleEditPost = ($data) => {
  //   console.log($data.title);
  //   console.log($data.description);
  //   console.log($data.category);
  //   return (
  //     <SubmitPost 
  //       category={$data.category} 
  //       title={$data.title} 
  //       description={$data.description} 
  //       formAvailable={false} 
  //     />
  //   );
  // }

  const handleSendReply = () => {
    if (reply.trim().length !== 0) {
      setReplyMsgToDB();
    }
  };

  const handleVisibility = () => {
    setVisible(prevVisible => !prevVisible);
  };

  const handleSaveBtn = () =>{
    setSavePost(savePost? false:true);
  }

  const img = savePost? 'src/Images/save.svg':'src/Images/unSave.svg';

  return (
    <div className='postComponent'>
        <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>
        <label className='reportBtn'  onClick={handleReport}>Report</label>
        <label className='editBtn' onClick={handleEdit}>Edit</label>
        <img id="savePostBtn" src={img} onClick={handleSaveBtn} />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className='postImageBtnPannel'>
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
      <div className='replyBox'>
        {visible &&
          replyBulk.map((item, index) => (
            <ReplyBoxComponent  key={index} post_id2={post.post_id} item = {item}/>
          ))}
          {editedPost && (
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
    </div>
  );
}

export default PostComponent;
