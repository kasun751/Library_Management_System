// import React, { useEffect, useState } from 'react';
// import './SubmitPost.css';
// import axios from 'axios';

// function SubmitPost({ category: initialCategory = 'none', title: initialTitle = '', description: initialDescription = '', formAvailable: initialformAvailable = false, btn_value: initialbtn_value= 'Send Post' ,post_id }) {
//     const [formAvailable, setFormAvailable] = useState(initialformAvailable);
//     const [option, setOption] = useState(false);
//     const [category, setCategory] = useState(initialCategory);
//     const [title, setTitle] = useState(initialTitle);
//     const [description, setDescription] = useState(initialDescription);

//     const handleToCreatePost = () => {
//         setFormAvailable(true);
//     };

//     const handleToHideCreatePostForm = () => {
//         setFormAvailable(false);
//     };

//     const handleOnOption = (e) => {
//         setOption(e.target.value === "true");
//     };

//     async function savePostonDB(){
//         try{
//             const response = await axios.post(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
//                 category:category,
//                 title:title,
//                 description:description,
//                 user_id : "A12"
//             });
//             setCategory("none");
//             setTitle("");
//             setDescription("");
//             setFormAvailable(false);
//         }catch(err){
//             console.error(err);
//         }
//     }

//     async function editPostfromDB(){
//         try{
//             const response = await axios.put(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
//                 category:category,
//                 title:title,
//                 description:description,
//                 post_id: post_id
//             });
//             setCategory("none");
//             setTitle("");
//             setDescription("");
//             setFormAvailable(false);
//         }catch(err){
//             console.error(err);
//         }
//     }

//     const[focusCategory,setFocusCategory]=useState(false)
//     const[focusTitle,setfocusTitle]=useState(false)
//     const[focusDescription,setfocusDescription]=useState(false)

//     const setFocus=(input)=>{
//         switch(input){
            
//             case "c":
//                 setFocusCategory(true);
//                 setfocusTitle(false)
//                 setfocusDescription(false)
//                 console.log(input);
//                 break;
//             case "t":
//                 setFocusCategory(false);
//                 setfocusTitle(true)
//                 setfocusDescription(false)
//                 console.log(input);
//                 break;
//             case "d":
//                 setFocusCategory(false);
//                 setfocusTitle(false)
//                 setfocusDescription(true)
//                 console.log(input);
//                 break;
//         }
//     }

//     function FormPart() {
//         return (
//             <div className='submitPostBox'>
                
//                     <table style={{width:'100%'}}>
//                         <tbody>
//                             <tr>
//                                 <td colSpan={3}>
//                                     <img src='src/Images/arrow-right.svg' style={{ width: '50px', float: 'right', cursor: 'pointer' }} onClick={handleToHideCreatePostForm} alt="Arrow" />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <b>Belong to any unique category?</b>
//                                     <input type="radio" name="category" value="true" onChange={handleOnOption} /> Yes
//                                     <input type="radio" name="category" value="false" onChange={handleOnOption} /> NO
//                                 </td>
//                                 <td>
                                    
//                                 </td>
//                                 <td>
                                    
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan={3}>
//                                     {option && <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='enter category' onClick={() => setFocus("c")}  autoFocus={focusCategory}/>}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan={3}>
//                                     <input type="text" value={title} placeholder='enter post title' onChange={(e) => setTitle(e.target.value)} onClick={() => setFocus("t")}  autoFocus={focusTitle} />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan={3}>
//                                     <input
//                                         type="text"
//                                         value={description}
//                                         placeholder="Enter your description"
//                                         onChange={(e) => setDescription(e.target.value)} onClick={() => setFocus("d")}  autoFocus={focusDescription}
//                                     />
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <input type='submit' value={initialbtn_value} onClick={
//                        initialbtn_value==="Send Post" ? savePostonDB : editPostfromDB
//                     } />
                
//             </div>
//         );
//     }

//     return (
//         <>
//             {formAvailable && <FormPart />}

//             <div className='submitPostBtn'>
//                 {!formAvailable && (initialbtn_value=='Send Post'? true:false) && <img src="src/Images/submit-post.svg" alt="submit Post" onClick={handleToCreatePost} />}
//             </div>
//         </>
//     );
// }

// export default SubmitPost;


// import React, { useState, useEffect } from 'react';
// import './PostComponent2.css';
// import ReplyBoxComponent from './ReplyBoxComponent';
// import axios from 'axios';
// import SubmitPost from './SubmitPost';
// import ImageSlider from './ImageSlider';
// import DescriptionBoxComponent from './DescriptionBoxComponent';

// function PostComponent2({ post,user_id }) {
//   const [reply, setReply] = useState('');
//   const [replyBulk, setReplyBulk] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [savePost, setSavePost] = useState(false);
//   const [editedPost, setEditedPost] = useState(null);
//   const [editForm, setEditForm] = useState(false);
//   const [isAvailable,setIsAvailable] = useState(false);
//   const [isDelete,setIsDelete] = useState(false);

//   useEffect(() => {
//     getReplyMsgFromDB();
//     setIsAvailable(post.user_id==user_id ? true:false);
//   }, [post]);

//   useEffect(()=>{
//     handleLoadSavePost();
//   },[savePost])

//   async function getReplyMsgFromDB() {
//     try {
//       const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php?post_id=${post.post_id}`);
//       setReplyBulk(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function handleLoadSavePost(){
//     try{
//       const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php?user_id=${user_id}`)
//       response.data.map((item)=>{
//           if(item.post_id==post.post_id){
//             setSavePost(true);
//           }
//         })
//     }catch(err){
//       console.error(err);
//     }
//   }

//   async function handleRemoveSavePost(){
//     try{
//       await axios.delete(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php`,{
//         data:{
//           user_id:user_id,
//           post_id:post.post_id
//         }
//       })
//     }catch(err){
//       console.error(err);
//     }
//   }

//   async function handleSetSavePost(){
//     try{
//       await axios.post(`http://localhost:80/project_1/AskFromCommunity/User-postManager.php`,{
//         user_id:user_id,
//         post_id:post.post_id
//       });
//     }catch(err){
//       console.error(err);
//     }
//   }

//   const handleSaveBtn = () =>{
//     savePost? handleRemoveSavePost():handleSetSavePost();
//     setSavePost(savePost? false:true);
//   }

//   async function handleReport(){
//     try{
//         await axios.put(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`,{
//             reply_id : post.reply_id,
//             report_status : 1
//         });
        
//     }catch(err){
//         console.error(err);
//     }
//   }

//   async function setReplyMsgToDB() {
//     try {
//       setLoading(true);
//       await axios.post(`http://localhost:80/project_1/AskFromCommunity/ReplyMsgManager.php`, {
//         post_id: post.post_id,
//         user_id: user_id,
//         reply_msg: reply
//       });
//       setReplyBulk([...replyBulk, { post_id: post.post_id, reply_msg: reply }]);
//       setReply('');
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }
//   async function handleEdit(){
//     setEditForm(editForm? false:true);
//     try{
//       const response = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?post_id=${post.post_id}`); 
//       setEditedPost(response.data[0]);
//     }catch(err){
//       console.error(err);
//     }
//   }

//   async function handleDelete(){
//     try{
//       await axios.delete(`http://localhost:80/project_1/AskFromCommunity/PostManager.php`,{
//       data:{
//         post_id:post.post_id
//       }
//     });
//     setIsDelete(true);
//     }catch(err){
//       console.error(err);
//     }
//   }

//   const handleSendReply = () => {
//     if (reply.trim().length !== 0) {
//       setReplyMsgToDB();
//     }
//   };

//   const handleVisibility = () => {
//     setVisible(prevVisible => !prevVisible);
//   };

//   const img = savePost? 'src/Images/save.svg':'src/Images/unSave.svg';

//   return (
//     <>
//       {!isDelete && <div className='postComponent'>
//         <div className='contentBox'>
//             <table>
//                 <tbody>
//                     <tr>
//                         <td><label style={{color:'gray',fontStyle:'italic'}}>user_name</label></td>
//                         <td>{!isAvailable && <label className='reportBtn'  onClick={handleReport}>Report</label>}</td>
//                         <td>{isAvailable && <label className='buttonPanel' onClick={handleEdit}>Edit</label>}</td>
//                         <td>{!isAvailable && <img id="savePostBtn" src={img} onClick={handleSaveBtn} />}</td>
//                         <td>{isAvailable && <label className='buttonPanel' onClick={handleDelete}>Delete</label>}</td>
//                     </tr>
//                     <tr>
//                         <td colSpan={5}>
//                         <h2>{post.title}</h2>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan={2} className='image-box'>
//                            { /*<img src='src\Images\message-line.svg' />*/}
//                             <ImageSlider />
//                         </td>
//                         <td className='description-box' colSpan={2}>
//                         {/*<p>{post.description}</p>*/}
//                         <DescriptionBoxComponent description={post.description} />
//                         </td>
//                     </tr>
                    
//                     <tr>
                        
//                     </tr>
//                     <tr>
//                       <td colSpan={2}></td>
//                         <td className='postImageBtnPannel' colSpan={2}>
//                             <input
//                                 type='text'
//                                 value={reply}
//                                 placeholder='enter your reply'
//                                 onChange={(e) => setReply(e.target.value)}
//                             />
//                             <button disabled={loading} onClick={handleSendReply}>{loading ? 'Sending...' : 'Send Reply'}</button>
//                             <button onClick={handleVisibility}>{visible ? 'Hide Replies' : 'Show Replies'}</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         <div className='replyBox'>
//             {visible && replyBulk.map((item, index) => (
//                 <ReplyBoxComponent  key={index} post_id2={post.post_id} item = {item}/>
//             ))}
//             {editedPost && editForm && (
//                 <SubmitPost
//                     category={editedPost.category}
//                     title={editedPost.title}
//                     description={editedPost.description}
//                     formAvailable={true}
//                     post_id={post.post_id}
//                     btn_value = "Edit Post"
//                 />
//             )}
//         </div>
//       </div>}
//     </>
//   );
// }

// export default PostComponent2;

