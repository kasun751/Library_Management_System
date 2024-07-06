import { Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function PapersCard({id, subject, grade, year,extra, image_path, pdf_path }) {
    const [showPdf, setShowPdf] = useState(false);
    const navigate = useNavigate();

    const handleViewPdf = () => {
        setShowPdf(true);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/DeletePastPapers.php',
                {id, subject, grade, year,extra, image_path, pdf_path},
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
        }
    };

    const handleUpdate = () => {
        navigate('/update_pastPapers', { state: {id, subject, grade, year,extra, image_path, pdf_path} });
    };

    return (
        <>
            <div className="card rounded-4" id="card">
                <div className="col-12 col-sm-8 col-lg-11 col-md-11 mx-auto " >
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
                    <div className="home-center-button col-12">
                        <Button onClick={handleUpdate} className="btn btn-primary" id="home-update-button">Update</Button>
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
        </>
    );
}

export default PapersCard;
