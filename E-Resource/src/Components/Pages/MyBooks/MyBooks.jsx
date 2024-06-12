import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './MyBooks.css';

function MyBooks() {
    const [buyBooks, setBuyBooks] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const userId = 'SLMS/24/2';

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
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response from GetPDF.php:", res.data);
            if (res.data.status === 'success') {
                setPdfUrl(`http://localhost/Lbrary%20Management%20System/PDF/${res.data.data}`);
            } else {
                console.error(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching PDF", error);
        }
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
                            <Button className="btn btn-primary" onClick={() => viewBook(book.isbn)}>
                                View Book
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {pdfUrl && (
                <div className="pdf-container">
                    <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer"></iframe>
                </div>
            )}
        </div>
    );
}

export default MyBooks;
