import React, { useState, useEffect, useContext, createContext } from 'react';
import './BodyPost.css';
import ReplyBox from '../ReplyBoxComponent/ReplyBox';
import axios from 'axios';
import SubmitPostForm from '../FormComponents/SubmitPostForm';
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import DescriptionBox from '../PostComponents/DescriptionBox'
import ReportComponent from '../ReportComponent/ReportComponent';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { userAuthentication } from '../../App';
import AlertBox from '../AlertComponent/AlertBox';
import ImageSlideEnlarger from '../ImageSliderComponent/ImageSlideEnlarger';

export const alertBoxActivity = createContext({});
export const imageEnlargerActivity = createContext({});

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
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openEnlarger, setOpenEnlarger] = useState(false);

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

  const handleDelete =()=>{
    setOpenAlertBox(true);
  }
  
  async function deletePost(){
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
    <div className='container col-lg-10 col-sm-12 col-12'>
    <AnimatePresence>
      {!isDelete && 
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=' postComponent col-lg-12 col-sm-12 col-12'>
        <div className='image-box'>
          <div className='post-btn-panel'>
              <label style={{color:'gray',fontStyle:'italic'}}>user_name</label>

              {!isAvailable && <img id = "reportBtn" src="src\Images\report-btn.svg" alt="report"  onClick={handleReport}/>}

              {isAvailable && <img id="editPostBtn" src="src\Images\edit-btn.svg" alt="edit" onClick={handleEdit}/>}

              {!isAvailable && <img id="savePostBtn" src={img} alt="post save button" onClick={handleSaveBtn} />}

              {isAvailable && <img id="deletePostBtn" src="src\Images\delete-btn.svg" alt="delete" onClick={handleDelete}/>}
          </div>
            <div className='imageSlider-container'>
              
          <img id="enlarge-btn" src="src\Images\view-in-body.svg" alt="view images" onClick={()=>setOpenEnlarger(true)} />
              
                  <ImageSlider post_id={post.post_id}/>
                                             
            </div>            
        </div>
        <div className='contentBox-outer'>
        <div className='contentBox'>
          <div className='title-box mb-2'>
              <h4 className='mt-2' id="post-title">{post.title}</h4>
              {/* <DescriptionBox description={post.description} /> */}
              <div className='description-container'>
                <p>{post.description}</p>
              </div>
                <input
                      type='text'
                      value={reply}
                      placeholder='enter your reply'
                      onChange={(e) => setReply(e.target.value)}
                  />
                  <div className='post-msg-btn mt-2'>
                    {/* <img src="src\Images\send-reply.svg" alt="" onClick={handleSendReply} />
                    <img src={visible ? "src/Images/not-see.svg" : "src/Images/look.svg"} alt="" onClick={handleVisibility} /> */}

                    <button className="btn btn-primary" disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Submit'}</button>
                  <button className="btn btn-primary ml-1" onClick={handleVisibility}>{visible ? 'Hide Comments' : 'Show Comments'}</button>
                  </div>
                  
        </div>
          <div className='replyBox'>
            {visible && replyBulk.map((item, index) => (
                <ReplyBox  key={index} post_id2={post.post_id} item = {item}/>
            ))}
          </div>
      </div>
      </div>
      </div>
      </motion.div>
      }
      </AnimatePresence>
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
      <alertBoxActivity.Provider value={{deletePost, setOpenAlertBox}}>
        {openAlertBox && <AlertBox/>}
      </alertBoxActivity.Provider>
      <imageEnlargerActivity.Provider value={{openEnlarger, setOpenEnlarger}}>
      <AnimatePresence>
        {openEnlarger &&
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ImageSlideEnlarger post_id={post.post_id} />
        </motion.div>
        }
        </AnimatePresence>
      </imageEnlargerActivity.Provider>
    </div>
  );
}

export default BodyPost;
