import { Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function NewsCard({Id, title, date, description, image_path, pdf_path }) {
    const [showPdf, setShowPdf] = useState(false);
    const navigate = useNavigate();

    const handleViewPdf = () => {
        setShowPdf(true);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.post(
                'http://localhost/Lbrary%20Management%20System/E-Resource_Php/DeleteNewsPapers.php',
                {Id , title, date, description, image_path, pdf_path},
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
        navigate('/update_news', { state: {Id , title, date, description, image_path, pdf_path} });
    };

    return (
        <>
            <div className="card">
                <img src={image_path} className="card-img-top" alt="Book Cover" />
                <div className="card-body">
                    {/*<h4 className="card-title">{Id}</h4>*/}
                    <h4 className="card-title">{title}</h4>
                    <h5 className="card-title">{date}</h5>
                    <p className="card-text">{description}</p>
                    <Button className="btn btn-primary" onClick={handleViewPdf}>View</Button>&nbsp;
                    <Button onClick={handleDelete} className="btn btn-primary">Delete</Button>&nbsp;
                    <Button onClick={handleUpdate} className="btn btn-primary">Update</Button>
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

export default NewsCard;
