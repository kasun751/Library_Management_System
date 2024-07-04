import React, { useContext, useEffect, useState } from 'react'
import './ImageSlider.css'
import axios from 'axios';
import { postRefresh } from '../BodyComponents/BodyComponent';
import Carousel from 'react-bootstrap/Carousel';
//import { AnimatePresence, motion } from 'framer-motion';

function ImageSlider({post_id}) {
    const [imageArray, setImageArray]=useState([]);
    //const [count,setCount] = useState(0);

    const {refresh} = useContext(postRefresh);
    
    useEffect(()=>{
        getPostImages(post_id)
        
    },[])
    useEffect(()=>{
        getPostImages(post_id)
        
    },[refresh])

    // const handleBack=()=>{
    //     if(count>0){
    //         setCount(count-1);
    //     }
    // }
    // const handleForword=()=>{
    //     if(count<imageArray.length-1){
    //         setCount(count+1);
    //     }
    // }
    async function getPostImages($post_id){
        try {
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postImageController.php?post_id=${$post_id}`); //ok
            setImageArray(res.data);
          } catch (err) {
            console.error(err);
          }
          
    }
  return (
    <div className='imageSlider'>
        {/* <div className='imageSlider'>
            <img id='next-img' src="src\Images\pre-img-btn.svg" alt="previous-image" onClick={handleBack} />
                    <img id='slide-img' src={imageArray[count]?"src/postImages/"+imageArray[count].image_url:"src/Images/default-img.svg" } alt={`image ${count}` }/>
            <img id='prev-img' src="src\Images\next-img-btn.svg" alt="next-image" onClick={handleForword}/>
        </div> */}
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={imageArray[0]?"src/postImages/"+imageArray[0].image_url:"src/Images/default-img.svg" }
                alt="First slide"
                />
            </Carousel.Item>
            {imageArray[1] &&<Carousel.Item>
                <img
                className="d-block w-100"
                src={imageArray[1]?"src/postImages/"+imageArray[1].image_url:"src/Images/default-img.svg" }
                alt="Second slide"
                />
            </Carousel.Item>}
            {imageArray[2] &&<Carousel.Item>
                <img
                className="d-block w-100"
                src={imageArray[2]?"src/postImages/"+imageArray[2].image_url:"src/Images/default-img.svg" }
                alt="Third slide"
                />
            </Carousel.Item>}
        </Carousel>
    </div>
  );
}

export default ImageSlider