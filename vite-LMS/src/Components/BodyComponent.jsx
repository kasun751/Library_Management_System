import React, { useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import './BodyComponent.css';
import axios from 'axios';

function BodyComponent(props) {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)

  const member_id = props.member_id //member id
  const user_type = props.user_type //user type

  const handleRefresh=()=>{
    setRefresh(refresh? false:true)
  }

  useEffect(() => {
    console.log("kasun")
    getPost();
  }, [refresh]);

  async function getPost() {
    try {
      const res = await axios.get('http://localhost:80/project_1/AskFromCommunity/PostManager.php');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <button id='btnRefresh' onClick={handleRefresh}>Refresh</button>
      <div className='bodyComponent'>
      
        {posts.map((item) => (
          <PostComponent key={item.post_id} post={item} />
        ))}
      </div>
    </>
  );
}

export default BodyComponent;
