
import {useEffect, useState} from "react";
import axios from "axios";
import PapersCard from "./PapersCard.jsx";

function E_PastPapers_Home(){
    const [getPastPapersDetails, setGetPastPapersDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('subject');
0
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
                )
                console.log(res.data);
                setGetPastPapersDetails(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        getViewPastPapersDetails();
    }, []);

    const filteredPapers = getPastPapersDetails.filter(papers => {
        const query = searchQuery.toLowerCase();
        if (searchBy === 'subject') {
            return papers.subject.toLowerCase().includes(query);
        }else if (searchBy === 'grade') {
            return papers.grade.toLowerCase().includes(query);
        } else if (searchBy === 'year') {
            const newsDate = papers.year.toString().toLowerCase();
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
                                    <a className="nav-link" href="/add_pastPapers">Add E-Past Paper</a>
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
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </nav>
                <h1>E-Past Papers Section</h1>
                <div className="card-container">
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
        </>
    )
}

export default E_PastPapers_Home;