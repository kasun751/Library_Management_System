import React, { useEffect, useState } from 'react'
import './ImageSlider.css'
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

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
            <button onClick={handleBack}>{"<"}</button>
            <img src={imageArray[count]?"src/postImages/"+imageArray[count].image_url:"" } alt={`image ${count}` }/>
            <button onClick={handleForword}>{">"}</button>
        </div>
    </div>
//     <Carousel data-bs-theme="dark">
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src={imageArray[0]?"src/postImages/"+imageArray[0].image_url:"" }
//         alt="First slide"
//       />
//       <Carousel.Caption>
//         <h5>First slide label</h5>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
    
//   </Carousel>
  );
}

export default ImageSlider