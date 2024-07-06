import {useEffect, useState} from "react";
import axios from "axios";
import PapersCard from "./PapersCard.jsx";
import './E_PastPapers_Home.css';
import HeaderComponent from "../../HeaderComponent/HeaderComponent.jsx";
import FooterComponent from "../../FooterComponent/FooterComponent.jsx";

function E_PastPapers_Home(){
    const [getPastPapersDetails, setGetPastPapersDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('subject');

    useEffect(() => {
        const getViewPastPapersDetails = async () => {
            try {
                const res = await axios.get(
                    'http://localhost/Lbrary%20Management%20System/E-Resource_Php/viewPastPapersDetails.php',
                    {
                        headers: {
                            'content-Type': 'application/json'
                        }
                    }
                );
                console.log(res.data);

                // Ensure the response data is an array
                if (Array.isArray(res.data)) {
                    setGetPastPapersDetails(res.data);
                } else {
                    console.error("Unexpected response data format:", res.data);
                    setGetPastPapersDetails([]);
                }
            } catch (error) {
                console.error("Error fetching data", error);
                setGetPastPapersDetails([]);
            }
        }

        getViewPastPapersDetails();
    }, []);

    const filteredPapers = getPastPapersDetails.filter(papers => {
        const query = searchQuery.toLowerCase();
        if (searchBy === 'subject') {
            return papers.subject.toLowerCase().includes(query);
        } else if (searchBy === 'grade') {
            return papers.grade.toLowerCase().includes(query);
        } else if (searchBy === 'year') {
            const newsDate = papers.year.toString().toLowerCase();
            return newsDate.includes(query);
        }
        return false;
    });

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

                <div className="ePastPapers_header">
                    <h1 className="outlined-text home_heading">WELCOME <br/>OUR<br/><span>E-PAST PAPERS</span> SECTION</h1>
                    <form className="d-flex" id="ppsearchSelect" role="search">
                        <div className="input-group mb-4">
                            <select
                                className="form-select search-select"
                                aria-label="Search By"
                                onChange={(e) => setSearchBy(e.target.value)}
                            >
                                <option value="">Search By</option>
                                <option value="title">Title</option>
                                <option value="grade">Grade</option>
                                <option value="year">Year</option>
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
                <div className="home mx-auto" >
                    <div className="button-container" >
                        <button className="btn btn-outline-success button" id="right-button" type="submit">
                            <a href="/add_pastPapers">Add Resources</a></button>

                    </div>
                <div className="row d-flex justify-content-center">
                    {filteredPapers.map((papers, index) => (
                        <PapersCard
                            key={index}
                            id={papers.id}
                            subject={papers.subject}
                            grade={papers.grade}
                            year={papers.year}
                            extra={papers.extra_details}
                            image_path={`http://localhost/Lbrary%20Management%20System/PastPapersIMAGES/${papers.image_path}`}
                            pdf_path={`http://localhost/Lbrary%20Management%20System/PastPapersPDF/${papers.pdf_path}`}
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

export default E_PastPapers_Home;
