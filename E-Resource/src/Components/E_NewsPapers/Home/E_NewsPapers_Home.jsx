import {useEffect, useState} from "react";
import axios from "axios";
import Card from "../../Pages/Home/Card/Card.jsx";
import NewsCard from "./NewsCard.jsx";

function E_NewsPapers_Home(){
    const [getNewsPapersDetails, setGetNewsPapersDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title');

    useEffect(() => {
        const getViewNewsPapersDetails = async () => {
            try {
                const res = await axios.get(
                    'http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewNewsPapersDetails.php',
                    {
                        headers: {
                            'content-Type': 'application/json'
                        }
                    }
                )
                console.log(res.data);
                setGetNewsPapersDetails(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getViewNewsPapersDetails();
    }, []);

    const filteredNews = getNewsPapersDetails.filter(news => {
        const query = searchQuery.toLowerCase();
        if (searchBy === 'title') {
            return news.title.toLowerCase().includes(query);
        } else if (searchBy === 'date') {
            const newsDate = news.date.toString().toLowerCase();
            return newsDate.includes(query);
        }
        return false;
    });

    return(
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
                                    <a className="nav-link" href="/add_news">Add E-News Paper</a>
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
                                        <option value="date">Date</option>

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
                <h1>E-News Papers Section</h1>
                <div className="card-container">
                    {filteredNews.map((news, index) => (
                        <NewsCard
                            key={index}
                            Id={news.Id}
                            title={news.title}
                            date={news.date}
                            description={news.description}
                            image_path={`http://localhost/Lbrary%20Management%20System/NewsPapersIMAGES/${news.image_path}`}
                            pdf_path={`http://localhost/Lbrary%20Management%20System/NewsPapersPDF/${news.pdf_path}`}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default E_NewsPapers_Home;