import React from 'react'
import './ReplyBoxComponent.css'

function ReplyBoxComponent({msg}) {
  return (
    <>
        <div className='replyBoxComponent'>
        <p>{msg}</p>
    </div>
    </>
  )
}

export default ReplyBoxComponent