import React from 'react'
import styled from 'styled-components'; 
import './SubHeader.css'
function SubHeader() {

const mySavedPost = () =>{

}
const myPost =()=>{

}

  return (
    <>
        <div className='subHeadeContainer'>
        <div className='headerTitle'>
            <img src='src\Images\community.svg' />
            <h3>Ask From Community</h3>
        </div>
        <div className='subHeaderImageBtnPannel'>
            <img src='src\Images\message-white-heart.svg' alt="Reacted Posts" onClick={mySavedPost}/>
            <img src='src\Images\message-line.svg' alt="My posts" onClick={myPost}/>
        </div>       

    </div>
    </>
  )
}

export default SubHeader