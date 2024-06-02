// SidePanel.jsx
import React, { useState, useEffect } from 'react';
import './SidePanel.css';
import axios from 'axios';
import PanelPost from '../PostComponents/PanelPost';

function SidePanel(props) {
    const [mySaveposts, setmySaveposts] = useState([]);
    const [myposts, setmyPosts] = useState([]);
    const [reportPosts, setReportPosts] = useState([]);

    useEffect(() => {
        if(props.state=="myPost"){
          getmyPost(props.user_id);
          console.log("mypost");
        }
        if(props.state=="savePost"){
          getmySavePost(props.user_id);
          console.log("savePost");
        }      
        
        if(props.user_type=="staff"){
          getReportedPost(props.$user_id);
        }
      }, []);
    
      async function getmySavePost($user_id) {
        try {
          const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?user_id=${$user_id}`);
          setmySaveposts(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      async function getmyPost($user_id) {
        try {
          const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?user_id1=${$user_id}`);
          setmyPosts(res.data);
        } catch (err) {
          console.error(err);
        }
      }

      async function getReportedPost($user_id) {
        try {
          const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?user_id2=${$user_id}`);
          setReportPosts(res.data);
          console.log(res.data)
        } catch (err) {
          console.error(err);
        }
      }

  return (
    <div className='sidePanel_container'>
        {(props.state=="savePost"? true:false) && <h2>Save Posts</h2>}
        {(props.state=="myPost"? true:false) && <h2>My Posts</h2>}
        {(props.user_type=="staff"? true:false) && <h2>Report Posts</h2>}
      {(props.state=="savePost"? true:false) && mySaveposts?.map((item) => (
          <PanelPost key={item.post_id} post={item} user_id={props.user_id} />
        ))}

        {(props.state=="myPost"? true:false) && myposts?.map((item) => (
          <PanelPost key={item.post_id} post={item} user_id={props.user_id} />
        ))}

        {(props.user_type=="staff"? true:false) && reportPosts?.map((item) => (
          <PanelPost key={item.post_id} post={item} user_id={props.user_id} />
        ))}
    </div>
  );
}

export default SidePanel;
