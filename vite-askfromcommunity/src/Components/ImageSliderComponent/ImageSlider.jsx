import React, { useContext, useEffect, useState } from 'react'
import './ImageSlider.css'
import axios from 'axios';
import { postRefresh } from '../BodyComponents/BodyComponent';
import { AnimatePresence, motion } from 'framer-motion';

function ImageSlider({post_id}) {
    const [imageArray, setImageArray]=useState([]);
    const [count,setCount] = useState(0);

    const {refresh} = useContext(postRefresh);
    
    useEffect(()=>{
        getPostImages(post_id)
        
    },[])
    useEffect(()=>{
        getPostImages(post_id)
        
    },[refresh])

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
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postImageController.php?post_id=${$post_id}`); //ok
            setImageArray(res.data);
          } catch (err) {
            console.error(err);
          }
          
    }
  return (
    <div>
        <div className='imageSlider'>
            <img id='next-img' src="src\Images\pre-img-btn.svg" alt="previous-image" onClick={handleBack} />
                    <img id='slide-img' src={imageArray[count]?"src/postImages/"+imageArray[count].image_url:"src/Images/default-img.svg" } alt={`image ${count}` }/>
            <img id='prev-img' src="src\Images\next-img-btn.svg" alt="next-image" onClick={handleForword}/>
        </div>
    </div>
  );
}

export default ImageSlider