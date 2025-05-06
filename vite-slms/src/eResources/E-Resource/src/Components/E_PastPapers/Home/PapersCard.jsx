import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserType, userAuthFun } from "../../../../../../userAuthFun";

function PapersCard({ id, subject, grade, year, extra, image_path, pdf_path }) {
    const [showPdf, setShowPdf] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

    const handleViewPdf = () => {
        setShowPdf(true);
    };

    const handleDelete = async () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await axios.post(
                'http://localhost:80/project_1/E-Resource_Php/Controllers/DeletePastPapersController.php',
                { id, subject, grade, year, extra, image_path, pdf_path },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data); // Check response from server
            alert(res.data.resultMessage);
           window.location.reload()
        } catch (error) {
            console.error('error: ', error);
            alert('An error occurred while trying to delete the paper.');
        } finally {
            setShowModal(false);
        }
    };

    const handleUpdate = () => {
        navigate('/update_pastPapers', { state: { id, subject, grade, year, extra, image_path, pdf_path } });
    };

    return (
        <>
            <div className="card rounded-4" id="card">
                <div className="col-12 col-sm-8 col-lg-11 col-md-11 mx-auto ">
                    <img src={image_path} className="card-img-top" alt="Book Cover" />
                </div>

                <div className="card-body col-12" id="card-body">
                    <h4 className="card-title" id="card-title">Subject:<span>{subject}</span></h4>
                    <h5 className="card-title" id="card-title">Grade:<span>{grade}</span> </h5>
                    <h5 className="card-title" id="card-title">Year:<span>{year}</span></h5>
                    <p className="card-text" id="card-text">{extra}</p>
                    <div className="home-center-button col-12">
                        <Button className="btn btn-primary" id="buy-button" onClick={handleViewPdf}>View Paper</Button>
                    </div>
                    {getUserType() == "staff" && <div className="home-center-button col-12">
                        <Button onClick={handleUpdate} className="btn btn-primary" id="home-update-button">Update</Button>
                        <Button onClick={handleDelete} className="btn btn-danger" id="home-delete-button">Delete</Button>
                    </div>}
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
                <Modal.Body>
                    <p>Are you sure you want to delete the following paper?</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <p><strong>Grade:</strong> {grade}</p>
                    <p><strong>Year:</strong> {year}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="danger" onClick={confirmDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PapersCard;
