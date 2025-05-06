import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './MyBooks.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";
import { useNavigate } from 'react-router-dom';
import { userAuthFun } from '../../../../../../userAuthFun.jsx';

function MyBooks() {
    const [buyBooks, setBuyBooks] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const userId = 'SLMS/24/2';

    const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

    useEffect(() => {
        const fetchBuyBooks = async () => {
            try {
                const res = await axios.post('http://localhost:80/project_1/E-Resource_Php/Controllers/MyBooksController.php', {
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
            const res = await axios.post('http://localhost:80/project_1/E-Resource_Php/Controllers/GetPDFController.php', {
                isbn
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response from GetPDFController.php:", res.data);
            if (res.data.status === 'success') {
                setPdfUrl(`http://localhost:80/project_1/PDF/${res.data.data}`);
            } else {
                console.error(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching PDF", error);
        }
    };

    return (
        <div>
            <div className="body">
                <HeaderComponent
                    id="homePageHeader" router1={"/ebook"} Link1={"My Books"}
                    router2={"/dashboard"} Link2={"DashBoard"}
                    router7={"/logout"} Link7={"Log Out"}
                />
            <div className="eBook_header">
                <h1 className="outlined-text home_heading">My Books</h1>
            </div>
                <div className="home mx-auto" >
                    <div className="row d-flex justify-content-center">
                {buyBooks.map(book => (
                    <div key={book.isbn} className="card rounded-4" id="card">
                        <div className="col-12 col-sm-8 col-lg-11 col-md-11 mx-auto">
                            <img src={`http://localhost:80/project_1/IMAGES/${book.image_path}`} className="card-img-top" alt="Book Cover" />
                        </div>

                        <div className="card-body col-12" id="card-body">
                            <h4 className="card-title" id="card-title">Name:<span>{book.title}</span></h4>
                            <h6 className="card-title" id="card-title">ISBN:<span> {book.isbn}</span></h6>
                            <h5 className="card-title" id="card-title">Author:<span>{book.author}</span> </h5>
                            <p className="card-text" id="card-text">{book.description}</p>
                            <div className="home-center-button col-12">
                            <Button className="btn btn-primary" id="buy-button" onClick={() => viewBook(book.isbn)}>
                                View Book
                            </Button>
                            </div>
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
            <FooterComponent/>
        </div>

        </div>
    );
}

export default MyBooks;
