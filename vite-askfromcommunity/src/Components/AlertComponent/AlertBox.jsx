import React, { useState, useContext } from 'react';
import './AlertBox.css';
import closeBtn from '../../Images/close-btn.svg';
import { alertBoxActivity } from '../PostComponents/BodyPost';

function AlertBox() {
  const [submit, setSubmit] = useState(false);
  const {deletePost, setOpenAlertBox} = useContext(alertBoxActivity)

  const handleSubmit = (val) => {    
    if (val=="yes") {
      deletePost();
      setOpenAlertBox(false)
      setSubmit(true);     
      } else {
      setSubmit(false);
      setOpenAlertBox(false)
    }
  };

  return (
    <>
      <div className={submit ? 'alert-containerOuter click' : 'alert-containerOuter'}>
      <div className={submit ? 'container alert-container click col-md-5' : 'container alert-container col-md-5 col-lg-3'}>
        <img src={closeBtn} onClick={()=>setOpenAlertBox(false)} alt='close' />
        <h4>Are you Want to Delete</h4>
        <button onClick={()=>handleSubmit("yes")}>Yes</button>
        <button onClick={()=>handleSubmit("no")}>No</button>
      </div>
    </div>
    </>
  );
}

export default AlertBox;
