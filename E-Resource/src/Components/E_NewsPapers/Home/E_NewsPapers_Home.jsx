import {useEffect, useState} from "react";
import axios from "axios";
import NewsCard from "./NewsCard.jsx";
import './E_NewsPapers_Home.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";

function E_NewsPapers_Home() {
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
                );
                console.log(res.data);
                setGetNewsPapersDetails(res.data || []); // Ensure to default to an empty array if res.data is falsy
            } catch (error) {
                console.error("Error fetching data", error);
                setGetNewsPapersDetails([]); // Set empty array on error to prevent undefined.filter() error
            }
        };

        getViewNewsPapersDetails();
    }, []);

    // Ensure getNewsPapersDetails is an array before calling .filter()
    const filteredNews = Array.isArray(getNewsPapersDetails) ? getNewsPapersDetails.filter(news => {
        const query = searchQuery.toLowerCase();
        if (searchBy === 'title') {
            return news.title.toLowerCase().includes(query);
        } else if (searchBy === 'date') {
            const newsDate = news.date?.toString().toLowerCase(); // Use optional chaining to avoid errors if news.date is null or undefined
            return newsDate?.includes(query);
        }
        return false;
    }) : [];

    return (
        <>
            <div className="body">
                <HeaderComponent
                    id="homePageHeader" router1={"/"} Link1={"Home"}
                    router2={"/askforum"} Link2={"Ask Forum"}
                    router3={"/ideaCorner"} Link3={"Idea Corner"}
                    router7={"/logout"} Link7={"Log Out"}
                />
                <div className="search-container">
                    <div className="enewsPaper_header">
                        <h1 className="outlined-text home_heading">WELCOME<br/>OUR<br/><span>E-News Papers</span> SECTION
                        </h1>
                        <form className="d-flex justify-content-center" id="npSearchSelect" role="search">
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
                                <button className="btn btn-outline-success button" type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="home mx-auto">
                        <div className="button-container">
                            <button className="btn btn-outline-success button" id="right-button" type="submit" >
                                <a href="/add_news">Add Resources</a></button>

                        </div>
                        <div className="row d-flex justify-content-center">
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
                </div>
                <FooterComponent/>
            </div>
        </>
    );
}

export default E_NewsPapers_Home;
