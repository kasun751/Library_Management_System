import React, { useEffect, useState } from 'react';
import BodyPost from '../PostComponents/BodyPost';
import './BodyComponent.css';
import axios from 'axios';

function BodyComponent(props) {
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(true)

  const handleRefresh=()=>{
    setRefresh(refresh? false:true)
  }

  useEffect(() => {
    getPost('');
  }, [refresh]);

  async function getPost($category) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/PostManager.php?category=${$category}`);
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
          <BodyPost key={item.post_id} post={item} user_id={props.user_id} />
        ))}
      </div>
    </>
  );
}

export default BodyComponent;
