import React, { useContext, useEffect, useState } from 'react';
import './ImageSlider.css';
import axios from 'axios';
import { postRefresh } from '../BodyComponents/BodyComponent';
import Carousel from 'react-bootstrap/Carousel';

function ImageSlider({ post_id }) {
  const [imageArray, setImageArray] = useState([]);
  const { refresh } = useContext(postRefresh);
  // Load image from public folder
  const loadImage = (para) => {
    try {
      const img = new URL(`http://localhost:80/project_1/AskFromCommunity/postImages/${para}`).href;
    return img;
    } catch (err) {
        return new URL(`../../Images/default-img.svg`, import.meta.url).href;
    }
  };

  // Fetch post images on component mount and when `refresh` changes
  useEffect(() => {
    getPostImages(post_id);
  }, [post_id, refresh]);

  // Function to fetch post images
  async function getPostImages(post_id) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/postImageController.php?post_id=${post_id}`);
      setImageArray(res.data); // Expecting res.data to be an array of image names
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  }

  return (
    <div className='imageSlider'>
      <Carousel data-bs-theme="dark">
        {imageArray.length > 0 ? (
          imageArray.map((imageName, index) => (
            <Carousel.Item key={index} className='test'>
              <img
                className="d-block w-100"
                src={loadImage(imageName.image_url)} // Dynamically load each image
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item className='test'>
            <img
              className="d-block w-100"
              src={loadImage('default-img.svg')} // Show default image if no images are available
              alt="Default slide"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
