import React from 'react'
import styled from 'styled-components'; 
import './SubHeader.css'
function SubHeader() {
  return (
    <>
        <div className='subHeadeContainer'>
        <div className='headerTitle'>
            <h3>Ask From Community</h3>
        </div>
        <div className='subHeaderImageBtnPannel'>
            <img src='src\Images\message-white-heart.svg' alt="Reacted Posts"/>
            <img src='src\Images\message-line.svg' alt="My posts" />
        </div>       

    </div>
    </>
  )
}

export default SubHeader