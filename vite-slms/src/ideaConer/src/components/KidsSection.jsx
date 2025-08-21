import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import './Section.css';
import FooterComponent from './FooterComponent';
import HeaderComponent from "./HeaderComponent";

const KidsSection = ({ userType }) => {
  const [creations, setCreations] = useState([]);
  const [name, setName] = useState('');
  const [userId] = useState(2); // Assuming a fixed user ID of 2
  const [showModal, setShowModal] = useState(false);
  const [selectedCreation, setSelectedCreation] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      const response = await axios.get('http://localhost:80/project_1/IdeaConer/Controller/KidSectionController.php');
      console.log('Fetched creations:', response.data);
      // Sort creations by id in descending order to show newest first
      const sortedCreations = response.data.sort((a, b) => b.id - a.id);
      setCreations(sortedCreations);
    } catch (error) {
      console.error('Error fetching creations:', error);
    }
  };
  
  const handleAddImage = async (e) => {
    if (!name.trim()) {
      alert("Please enter your name before adding an image.");
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('user_id', userId);
    try {
      const response = await axios.post('http://localhost:80/project_1/IdeaConer/Controller/KidSectionController.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        fetchCreations();
        setName('');
      } else {
        console.error('Error uploading the image:', response.data.message);
      }
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  const handleDeleteClick = (creation) => {
    setSelectedCreation(creation);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCreation) {
      try {
        const response = await axios.delete('http://localhost:80/project_1/IdeaConer/Controller/KidSectionController.php', {
          data: { id: selectedCreation.id, user_id: userId }
        });
        if (response.data.success) {
          fetchCreations();
        } else {
          console.error("Deletion failed:", response.data.message);
        }
      } catch (error) {
        console.error('Error deleting the image:', error);
      }
    }
    setShowModal(false);
  };

  const handleImageClick = (creation) => {
    setSelectedImage(creation);
    setShowImageModal(true);
  };

  return ( 
    <div className='body'>
      <HeaderComponent
        id="homePageHeader" className=".header-container" router1={"/ideaconer"} Link1={"Home"}
        
        router2={"/dashboard"} Link2={"DashBoard"}
        router7={"/logout"} Link7={"Log Out"}
      />
      <div className='section'>
       <div className="App animate__animated animate__fadeIn">
        {userType === 'kid' && (
          <div className="section input-section">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
            <input
              type="file"
              onChange={handleAddImage}
              style={{ display: 'none' }}
              id="upload"
              disabled={!name.trim()}
            />
            <label
              htmlFor="upload"
              className={`btn button add-image-btn ${!name.trim() ? 'disabled' : ''} animate__animated animate__pulse animate__infinite`}
              style={{ opacity: name.trim() ? 1 : 0.5, cursor: name.trim() ? 'pointer' : 'not-allowed' }}
            >
              + Add Image
            </label>
          </div>
        )}
        <ul className="creations-list">
          {creations.map((creation) => {
            const showDeleteButton = userType === 'kid' && Number(creation.user_id) === Number(userId);
            return (
              <li key={creation.id} className="creation-item animate__animated animate__zoomIn">
                <img
                  src={`http://localhost:80/project_1/IdeaConer/uploads/${creation.image_url}`}
                  alt={creation.name}
                  onClick={() => handleImageClick(creation)}
                  className="creation-image"
                />
                <div className="creation-details">
                  <p className="creation-name">{creation.name}</p>
                  {showDeleteButton && (
                    <Button variant="danger" onClick={() => handleDeleteClick(creation)} className="delete-btn">Delete</Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this creation?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedImage?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedImage ? `http://localhost:80/project_1/IdeaConer/uploads/${selectedImage.image_url}` : ''}
              alt={selectedImage?.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Modal.Body>
        </Modal>
      </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default KidsSection;





