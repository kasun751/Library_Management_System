import React, { useState, useEffect } from 'react';
import './PostComponent.css';
import ReplyBoxComponent from './ReplyBoxComponent';
import axios from 'axios';

function PostComponent({ post }) {
  const [reply, setReply] = useState('');
  const [replyBulk, setReplyBulk] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function setReplyMsgToDB() {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`, {
        post_id: post.post_id,
        member_id: "A12",
        reply_msg: reply
      });
      console.log(response.data);
      getReplyMsgFromDB();
      setReply('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  return (
    <div className='postComponent'>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className='postImageBtnPannel'>
        <input
          type='text'
          value={reply}
          placeholder='enter your reply'
          onChange={(e) => setReply(e.target.value)}
        />
        <button disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Send Reply'}</button>
        <button onClick={handleVisibility}>{visible ? 'Hide Replies' : 'Show Replies'}</button>
      </div>
      <div className='replyBox'>
        {visible &&
          replyBulk.map((item, index) => (
            <ReplyBoxComponent key={index} post_id={item.post_id} post_id2={post.post_id} msg={item.reply_msg} />
          ))}
      </div>
    </div>
  );
}

export default PostComponent;
