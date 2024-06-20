import Navigation from "../../HeaderContent/Navigation.jsx";
import './E_Book_Home.css';
import Card from './Card/Card.jsx';
import {useEffect, useState} from "react";
import axios from "axios";

function E_Book_Home() {
    const [getBookDetails, setGetBookDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


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

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await axios.get(
                    `http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewBookDetails.php?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
                );
                setGetBookDetails(res.data.books);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchBookDetails();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };



    return (
        <>
            <div className="search-container">

                <nav className="navbar navbar-expand-lg bg-body-tertiary eBook_NavBar">
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



                        </div>
                    </div>
                </nav>
                <div className="eBook_header">
                    <h1 className="outlined-text home_heading">E-Books Section</h1>

                    <form className="d-flex" id="searchSelect" role="search">
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
                            <button className="btn btn-outline-success button" type="submit">Search</button>
                        </div>
                    </form>
                </div>


            </div>
            <div className="card-container row">


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


            <div className=" eBook_pagination">
                <div className="btn-group btn-group-sm">
                    <button  className="btn btn-outline-primary pagination-boarder"
                             onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="btn btn-outline-primary">{currentPage} of {totalPages}</span>
                    <button className="btn btn-outline-primary"
                            onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>

        </>


    );
}

export default E_Book_Home;
