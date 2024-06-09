import React, { useState, useEffect } from 'react';
import './BodyPost.css';
import ReplyBox from '../ReplyBoxComponent/ReplyBox';
import axios from 'axios';
import SubmitPostForm from '../FormComponents/SubmitPostForm';
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import DescriptionBox from '../PostComponents/DescriptionBox'
import ReportComponent from '../ReportComponent/ReportComponent';

function BodyPost({ post,user_id }) {
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
    setIsReportOpen(isReportOpen?false:true);
    // try{
    //     await axios.put(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
    //         post_id : post.post_id,
    //         report_status : 1
    //     });
        
    // }catch(err){
    //     console.error(err);
    // }
  }

  async function setReplyMsgToDB() {
    try {
      setLoading(true);
      await axios.post(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`, {
        post_id: post.post_id,
        user_id: user_id,
        reply_msg: reply
      });
      console.log(post.post_id)
      console.log(user_id)
      console.log(reply)
      setReplyBulk([...replyBulk, { post_id: post.post_id, reply_msg: reply, user_id:user_id }]);
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
      const res = await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
      data:{
        post_id:post.post_id,
        status:"deletePost"
      }
    });
    console.log(res);
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
            <div >
                <table>
                    <tbody>
                        <tr className='button-set'>
                            <td><label style={{color:'gray',fontStyle:'italic'}}>user_name</label></td>
                            <td>{!isAvailable && <label className='reportBtn'  onClick={handleReport}>Report</label>}</td>
                            <td>{isAvailable && <label className='buttonPanel' onClick={handleEdit}>Edit</label>}</td>
                            <td>{!isAvailable && <img id="savePostBtn" src={img} onClick={handleSaveBtn} />}</td>
                            <td>{isAvailable && <label className='buttonPanel' onClick={handleDelete}>Delete</label>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
              <table className='image-box'>
                <tbody>
                  <tr>
                      <td colSpan={2}>
                        <ImageSlider post_id={post.post_id}/>
                      </td>
                      <td colSpan={2}>
                        <h1>{post.title}</h1>
                        <DescriptionBox description={post.description} />
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
                      </td>
                  </tr>
                </tbody>
              </table>
        </div>
        <div className='replyBox'>
            {visible && replyBulk.map((item, index) => (
                <ReplyBox  key={index} post_id2={post.post_id} user_id={user_id} item = {item}/>
            ))}
        </div>
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
      </div>}
      {isReportOpen &&
          <ReportComponent onClose={() => setIsReportOpen(isReportOpen?false:true)} openFeild1={isReportOpen} user_id={user_id} post_id={post.post_id} reportType={"post"} reply_id={""}/>
      }

    </>
  );
}

export default BodyPost;
