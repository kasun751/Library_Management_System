import React, { useEffect, useState } from 'react'
import './ImageSlider.css'

function ImageSlider() {
    const [imageArray, setImageArray]=useState(["src/Images/black-heart.svg","src/Images/community.svg","src/Images/read-white-book.svg"]);
    const [count,setCount] = useState(0);
    
    // useEffect(()=>{
    //     setImageArray(prevImageArray => [
    //         ...prevImageArray,
    //         "../Images/black-heart.svg",
    //         "../Images/community.svg",
    //         "../Images/read-white-book.svg"
    //     ]);
        
    // },[])

    const handleBack=()=>{
        if(count>0){
            setCount(count-1);
        }
    }
    const handleForword=()=>{
        if(count<imageArray.length-1){
            setCount(count+1);
        }
    }
    
  return (
    <div>
        <div className='imageSlider'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={imageArray[count] } alt={`image ${count}` }/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={handleBack}>{"<"}</button>
                            <button onClick={handleForword}>{">"}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ImageSlider