// SidePanel.jsx
import React, { useState, useEffect } from 'react';
import './SidePanel.css';
import axios from 'axios';
import SidePanelPostComponent from './SidePanelPostComponent';
//ok
function SidePanel(props) {
    const [mySaveposts, setmySaveposts] = useState([]);
    const [myposts, setmyPosts] = useState([]);

    useEffect(() => {
        getmySavePost(props.user_id);
        getmyPost(props.user_id);
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
  return (
    <div className='sidePanel_container'>
        {props.state && <h2>Save Posts</h2>}
        {!props.state && <h2>My Posts</h2>}
      {props.state && mySaveposts.map((item) => (
          <SidePanelPostComponent key={item.post_id} post={item} user_id={props.user_id} />
        ))}

        {!props.state && myposts.map((item) => (
          <SidePanelPostComponent key={item.post_id} post={item} user_id={props.user_id} />
        ))}
    </div>
  );
}

export default SidePanel;
