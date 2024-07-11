import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewsCard({ Id, title, date, description, image_path, pdf_path }) {
    const [showPdf, setShowPdf] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleViewPdf = () => {
        setShowPdf(true);
    };

    const handleDelete = async () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/Controllers/DeleteNewsPapersController.php',
                { Id, title, date, description, image_path, pdf_path },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data); // Check response from server
            alert(res.data.resultMessage);
        } catch (error) {
            console.error('error: ', error);
            alert('An error occurred while trying to delete the news.');
        } finally {
            setShowModal(false);
        }
    };

    const handleUpdate = () => {
        navigate('/update_news', { state: { Id, title, date, description, image_path, pdf_path } });
    };

    return (
        <>
            <div className="card rounded-4" id="card">
                <div className="col-12 col-sm-8 col-lg-11 col-md-11 mx-auto ">
                    <img src={image_path} className="card-img-top rounded-4" alt="Book Cover" />
                </div>

                <div className="card-body col-12" id="card-body">
                    <h4 className="card-title" id="card-title">Name:<span>{title}</span></h4>
                    <h5 className="card-title" id="card-title">Date:<span>{date}</span></h5>
                    <p className="card-text text-justify" id="card-text">{description}</p>
                    <div className="home-center-button col-12">
                        <Button className="btn btn-primary" id="buy-button" onClick={handleViewPdf}>View Paper</Button>
                    </div>

                    <div className="home-center-button col-12">
                        <Button onClick={handleUpdate} className="btn btn-primary " id="home-update-button">Update</Button>
                        <Button onClick={handleDelete} className="btn btn-danger" id="home-delete-button">Delete</Button>
                    </div>
                </div>
            </div>
            {showPdf && (
                <iframe
                    title="PDF Viewer"
                    src={pdf_path}
                    style={{ width: "100vw", height: "100vh", border: "none" }}
                />
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this paper?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="danger" onClick={confirmDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewsCard;
