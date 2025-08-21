import Navigation from "../../Navigation/Navigation.jsx";
import './E_Book_Home.css';
import Card from './Card/Card.jsx';
import {useEffect, useState} from "react";
import axios from "axios";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import { useNavigate } from "react-router-dom";
import { getUserType, userAuthFun } from "../../../../../../userAuthFun.jsx";

function E_Book_Home() {
    const [getBookDetails, setGetBookDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
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

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:80/project_1/E-Resource_Php/Controllers/viewBookDetailsController.php?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
                );
                setGetBookDetails(res.data.books || []);
                console.log(res.data);
                setTotalPages(res.data.totalPages || 1);
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
            <div className="body">
                <HeaderComponent
                    id="homePageHeader" router1={"/eresource"} Link1={"E-Resources"}
                    router2={"/my_books"} Link2={"My Books"}
                    router3={"/dashboard"} Link3={"DashBoard"}
                    router7={"/logout"} Link7={"Log Out"}
                />
                <div className="search-container">

                    <div className="eBook_header">
                        <h1 className="outlined-text home_heading">WELCOME <br/>OUR<br/> <span>E-Books</span> SECTION</h1>

                        <form className="d-flex" id="searchSelect" role="search">
                            <div className="input-group mb-4">
                                <select
                                    className="form-select search-select"
                                    aria-label="Search By"
                                    onChange={(e) => setSearchBy(e.target.value)}
                                     id="changeSize2"
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
                                    id="changeSize1"
                                />
                                <button id="changeSize3" className="btn btn-outline-success button" type="submit">Search</button>
                            </div>
                        </form>
                    </div>


                </div>
                <div className="home mx-auto" >
                    {getUserType() == "staff" && <div className="button-container" >
                        <button className="btn btn-outline-success button" id="right-button" type="submit">
                            <a href="/add">Add Resources</a></button>

                    </div>}


                    <div className="row d-flex justify-content-center">

                        {filteredBooks.map((book, index) => (
                            <Card
                                key={index}
                                title={book.title}
                                isbn={book.isbn}
                                category={book.category}
                                author={book.author}
                                price={book.price}
                                volume={book.volume}
                                version={book.version}
                                description={book.description}
                                image_path={`http://localhost:80/project_1/IMAGES/${book.image_path}`}
                                pdf_path={`http://localhost:80/project_1/PDF/${book.pdf_path}`}
                                citations={book.citations}
                            />
                        ))}

                    </div> 

                    <div className=" eBook_pagination">
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary pagination-boarder"
                                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span className="btn btn-outline-primary">{currentPage} of {totalPages}</span>
                            <button className="btn btn-outline-primary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        </>


    );
}

export default E_Book_Home;
