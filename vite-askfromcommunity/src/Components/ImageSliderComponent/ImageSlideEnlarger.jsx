import React, { useState, useContext } from 'react';
import './ImageSlideEnlarger.css';
import closeBtn from '../../Images/close-btn.svg';
import ImageSlider from './ImageSlider';
import { imageEnlargerActivity } from '../PostComponents/BodyPost';

function ImageSlideEnlarger({post_id}) {  

  const [submit, setSubmit] = useState(false);
  const {openEnlarger, setOpenEnlarger} = useContext(imageEnlargerActivity)
  return (
    <div className='main-ise'>
      <div className={submit ? 'ise-containerOuter click' : 'ise-containerOuter'}>
      <div className={submit ? 'container ise-container click col-md-12' : 'container ise-container col-md-12 col-lg-12'}>
        <img id="ise-close-btn" src={closeBtn} onClick={()=>setOpenEnlarger(false)} alt='close' />
        <div id='imgSlider-container'>
          <ImageSlider post_id={post_id} />
        </div>
      </div> 
    </div>
    </div>
  );
}

export default ImageSlideEnlarger;
