import React, { useEffect, useState } from 'react'
import './ImageSlider.css'
import axios from 'axios';

function ImageSlider({post_id}) {
    const [imageArray, setImageArray]=useState([]);
    const [count,setCount] = useState(0);
    
    useEffect(()=>{
        getPostImages(post_id)
        
    },[])

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

    async function getPostImages($post_id){
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/UploadHandler.php?post_id=${$post_id}`);
            setImageArray(res.data);
          } catch (err) {
            console.error(err);
          }
    }
  return (
    <div>
        <div className='imageSlider'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={imageArray[count]?"src/postImages/"+imageArray[count].image_url:"" } alt={`image ${count}` }/>
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