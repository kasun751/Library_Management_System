import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBooks() {
    const [buyBooks, setBuyBooks] = useState([]);
    const userId = 'SLMS/24/1'; // getting from session storage

    useEffect(() => {
        const fetchBuyBooks = async () => {
            try {
                const res = await axios.post('http://localhost/Lbrary%20Management%20System/E-Resource_Php/MyBooks.php',
                    { user_id: userId }
                );
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

    return (
        <div>
            <h1>My Books</h1>
            <div className="book-list">
                {...buyBooks.map(book => (
                    <div key={book.isbn} className="card">
                        <img src={book.image_path} className="card-img-top" alt="Book Cover" />
                        <div className="card-body">
                            <h4 className="card-title">{book.title}</h4>
                            <h6 className="card-title">ISBN: {book.isbn}</h6>
                            <h5 className="card-title">Author: {book.author}</h5>
                            <p className="card-text">{book.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBooks;
