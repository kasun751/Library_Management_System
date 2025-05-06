
import { useState } from 'react';
import axios from 'axios';

const FetchBookData = () => {
    const [isbn, setIsbn] = useState('');
    const [bookData, setBookData] = useState(null);

    // Handle input change
    const handleChange = (event) => {
        setIsbn(event.target.value);
    };

    // Fetch book data from Google Books API
    const fetchBookData = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const data = response.data.items[0].volumeInfo;
            console.log(data)
            setBookData(data);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    // Fetch book data when ISBN changes
    const handleBlur = () => {
        if (isbn) {
            fetchBookData();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={isbn}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter ISBN"
            />
            {bookData && (
                <div>
                    <h2>{bookData.title}</h2>
                    <p>{bookData.authors && bookData.authors.join(', ')}</p>
                    <img src={bookData.imageLinks ? bookData.imageLinks.thumbnail : ''} alt={bookData.title} />
                </div>
            )}
        </div>
    );
};

export default FetchBookData;
