import React, { useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import './BodyComponent.css';
import axios from 'axios';

function BodyComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    try {
      const res = await axios.get('http://localhost:80/project_1/AskFromCommunity/PostManager.php');
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className='bodyComponent'>
      {posts.map((item, index) => (
        <PostComponent title={item.title} description={item.description} key={index} />
      ))}
    </div>
  );
}

export default BodyComponent;
