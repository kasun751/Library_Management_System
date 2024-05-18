import React, { useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import './BodyComponent.css';
import axios from 'axios';

function BodyComponent() {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)

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
    <div className='bodyComponent'>
      <button onClick={handleRefresh}>Refresh</button>
      {posts.map((item) => (
        <PostComponent key={item.post_id} post={item} />
      ))}
    </div>
  );
}

export default BodyComponent;
