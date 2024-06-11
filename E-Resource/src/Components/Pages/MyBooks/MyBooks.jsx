import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './MyBooks.css';

// Ensure the workerSrc is set to the path provided by the pdfjs-dist package
pdfjs.GlobalWorkerOptions.workerSrc = `../node_modules/pdfjs-dist/build/pdf.worker.min.js`;

function MyBooks() {
    const [buyBooks, setBuyBooks] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userId = 'SLMS/24/2'; // getting from session storage

    useEffect(() => {
        const fetchBuyBooks = async () => {
            try {
                const res = await axios.post('http://localhost/Lbrary%20Management%20System/E-Resource_Php/MyBooks.php', {
                    userId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.data.status === 'success') {
                    setBuyBooks(res.data.data);
                } else {
                    console.error(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching books", error);
            }
        };

        fetchBuyBooks();
    }, []);

    const viewBook = async (isbn) => {
        try {
            const res = await axios.post('http://localhost/Lbrary%20Management%20System/E-Resource_Php/GetPDF.php', {
                isbn
            }, {
                responseType: 'blob' // Important for binary data
            });
            if (res.status === 200) {
                const file = new Blob([res.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setPdfUrl(fileURL);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error fetching PDF", error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setPdfUrl(null);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <h1>My Books</h1>
            <div className="card-container">
                {buyBooks.map(book => (
                    <div key={book.isbn} className="card">
                        <img src={`http://localhost/Lbrary%20Management%20System/IMAGES/${book.image_path}`} className="card-img-top" alt="Book Cover" />
                        <div className="card-body">
                            <h4 className="card-title">{book.title}</h4>
                            <h6 className="card-title">ISBN: {book.isbn}</h6>
                            <h5 className="card-title">Author: {book.author}</h5>
                            <p className="card-text">{book.description}</p>
                            <Button className="btn btn-primary" onClick={() => viewBook(book.isbn)}>View Book</Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>View Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pdfUrl && (
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {Array.from(
                                new Array(numPages),
                                (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                )
                            )}
                        </Document>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MyBooks;
