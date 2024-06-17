import React, { useState, useEffect, useContext } from 'react';
import './PanelPost.css';
import ImageSlider from '../ImageSliderComponent/ImageSlider';
import Accordion from 'react-bootstrap/Accordion';

function PanelPost({ post}) {
  return (
    <>
      {<div className='sidePanelPostComponent'>
        <Accordion defaultActiveKey="1" >
        <Accordion.Item eventKey="0" >
          <Accordion.Header ><h3>{post.title}</h3></Accordion.Header>
          <Accordion.Body>
          {post.description}
          <ImageSlider post_id={post.post_id}/>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
      </div>}
    </>
  );
}

export default PanelPost;
