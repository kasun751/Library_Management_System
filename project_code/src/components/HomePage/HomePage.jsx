import {Link} from "react-router-dom";
import GuestUser from "../LogginSection/GuestUser.jsx";
import {useEffect, useState} from "react";

function HomePage(){
    const [guestUserName, setGuestUserName] = useState('');

    useEffect(() => {
        const name=localStorage.getItem('guestUserName');
        setGuestUserName(name);
    }, []);
    return (
        <div id="HomePage">
            <GuestUser/>
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
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            <h1>Welcome {guestUserName}</h1>
        </div>
    )
}

export default HomePage;