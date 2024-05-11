import React from 'react'
import './PostComponent.css'
import { useState } from 'react'
import ReplyBoxComponent from './ReplyBoxComponent';


function PostComponent(props) {
    const[reply,setReply]=useState("");
    const[replyBulk,setReplyBulk] = useState([]);

    const[visible,setVisible]=useState(true);

    const viewImage = visible? "src/Images/look.svg":"src/Images/not-see.svg";

    const handleSendReply = () => {
        if(reply.length!=0){
            setReplyBulk(pre =>[...pre, { msg: reply }]);
            setReply("");
        }        
    };  
    const handleVisibility=()=>{
        setVisible((visible? false:true));
    }
  return (
    <div>
        <div className='postComponent'>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            
            <div className='postImageBtnPannel'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" 
                                value={reply} 
                                placeholder='enter your reply' onChange={(e)=>{
                                    setReply(e.target.value)
                                }}/>
                            </td>
                            <td>
                                <img src="src\Images\send-reply.svg" alt="Reply" onClick={handleSendReply}/>
                            </td>
                            <td>
                                <img src={viewImage} alt="show replies" onClick={handleVisibility}/>
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </div>
            <div className='replyBox'>
            {visible&&replyBulk.map((item, index) => (
                        <ReplyBoxComponent key={index} msg={item.msg} />
                    ))}
            </div>
        </div>
    </div>
  )
}

export default PostComponent