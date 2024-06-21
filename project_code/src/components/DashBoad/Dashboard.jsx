import {Link, useParams} from "react-router-dom";
import BookSectionHome from "../BookSection/BookSectionHome/BookSectionHome.jsx";

function Dashboard() {
    const {id} = useParams();
    const decodedId = decodeURIComponent(id);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookSection">Book Section</Link>
                            </li>
                            <li className="nav-item">
                                {/*<Link to="/login">Login</Link>*/}
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Welcome {decodedId}... </h1>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard;