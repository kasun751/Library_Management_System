import React from 'react';
import './ReplyBoxComponent.css';

function ReplyBoxComponent({ post_id, post_id2, msg }) {
  return (
    <div className='replyBoxComponent'>
      {post_id === post_id2 && <p>{msg}</p>}
    </div>
  );
}

export default ReplyBoxComponent;
