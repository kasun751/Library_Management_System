import Navigation from "../../HeaderContent/Navigation.jsx";
import './E_Book_Home.css';
import Card from './Card/Card.jsx';
import {useEffect, useState} from "react";
import axios from "axios";

function E_Book_Home() {
    const [getBookDetails, setGetBookDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const getViewBookDetails = async () => {
            try {
                const res = await axios.get(
                    'http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewBookDetails.php',
                    {
                        headers: {
                            'content-Type': 'application/json'
                        }
                    }
                )
                console.log(res.data);
                setGetBookDetails(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getViewBookDetails();
    }, []);

    useEffect(() => {
        const loadPayHereScript = () => {
            const script = document.createElement("script");
            script.src = "https://www.payhere.lk/lib/payhere.js";
            script.type = "text/javascript";
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                console.log("PayHere script loaded successfully");
            };

            script.onerror = () => {
                console.error("Error loading PayHere script");
            };
        };

        loadPayHereScript();
    }, []);

    const filteredBooks = getBookDetails.filter(book => {
        const query = searchQuery.toLowerCase();
        if (searchBy === 'title') {
            return book.title.toLowerCase().includes(query);
        } else if (searchBy === 'category') {
            return book.category.toLowerCase().includes(query);
        } else if (searchBy === 'author') {
            return book.author.toLowerCase().includes(query);
        }
        return false;
    });

    // useEffect(() => {
    //     const fetchBookDetails = async () => {
    //         const offset = (currentPage - 1) * itemsPerPage;
    //         const url = `http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewBookDetails.php?offset=${offset}`;
    //         try {
    //             const res = await axios.get(url, {
    //                 headers: {
    //                     'content-Type': 'application/json'
    //                 }
    //             });
    //             setGetBookDetails(res.data);
    //         } catch (error) {
    //             console.error("Error fetching data", error);
    //         }
    //     };
    //
    //     fetchBookDetails();
    // }, [currentPage]);





    return (
        <>
            <div className="search-container">

                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-6 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/add">Add E-Book</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/my_books">My Books</a>
                                </li>

                            </ul>
                            <form className="d-flex" role="search">
                                    <div className="input-group mb-4">
                                        <select
                                            className="form-select search-select"
                                            aria-label="Search By"
                                            onChange={(e) => setSearchBy(e.target.value)}
                                        >
                                            <option value="">Search By</option>
                                            <option value="title">Title</option>
                                            <option value="category">Category</option>
                                            <option value="author">Author</option>
                                        </select>
                                        <input
                                            type="search"
                                            className="form-control me-2"
                                            placeholder="Search Here"
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </form>


                        </div>
                    </div>
                </nav>
                <h1>E-Books Section</h1>

            </div>
            <div className="card-container">
                {filteredBooks.map((book, index) => (
                    <Card
                        key={index}
                        title={book.title}
                        isbn={book.isbn}
                        category={book.category}
                        author={book.author}
                        price={book.price}
                        description={book.description}
                        image_path={`http://localhost/Lbrary%20Management%20System/IMAGES/${book.image_path}`}
                        pdf_path={`http://localhost/Lbrary%20Management%20System/PDF/${book.pdf_path}`}
                    />
                ))}
            </div>

            {/*<div className="pagination-container">*/}
            {/*    <PreviousButton currentPage={currentPage} handlePageChange={handlePageChange} disabled={currentPage === 1} />*/}
            {/*    <PageNumbers currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />*/}
            {/*    <NextButton currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />*/}
            {/*</div>*/}
        </>


    );
}

export default E_Book_Home;
