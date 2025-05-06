import React, { useState, useEffect, useContext } from 'react';
import './PanelPost.css';
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import Accordion from 'react-bootstrap/Accordion';
import { loadPanelPost } from '../BodyComponents/BodyComponent';

import viewPost from '../../Images/view-in-body.svg'; 

function PanelPost({ post, onclickClose}) {
  const {setPost_id, showPanelPost, setShowPanelPost} = useContext(loadPanelPost)
  const handleOnClick = () =>{
    setPost_id(post.post_id)    
    setShowPanelPost(showPanelPost?false:true)
    onclickClose();
  }

  return (
    <div className='main-sidePanel'>
      {<div className='sidePanelPostComponent'>
        <Accordion defaultActiveKey="1" >
        <Accordion.Item eventKey="0" >
          <Accordion.Header ><h3>{post.title}</h3></Accordion.Header>
          <Accordion.Body>
          <div id="view-post-btn"><img src={viewPost} alt="view post" onClick={handleOnClick} /></div>
          {post.description}
          <ImageSlider post_id={post.post_id}/>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
      </div>} 
    </div>
  );
}

export default PanelPost;
