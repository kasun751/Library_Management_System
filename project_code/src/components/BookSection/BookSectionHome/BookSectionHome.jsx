import {Link} from "react-router-dom";

function BookSectionHome() {

    return (
        <div>
            <button id="addBookSection"> <Link to="/addBook">Add Book</Link> </button>
            <button id="modifyBookSection"><Link to="/modifyBook"> Modify Book </Link></button>
            <button id="deleteBookSection"> <Link to="/deleteBook">Delete Book </Link></button>
            <button id="issueBookSection"><Link to="/issueBook"> Issue Book</Link></button>
            <button id="returnBookSection"><Link to="/viewBook">View Book Details </Link> </button>
            <br/>
            <br/>
            <br/>
            <button id="guestUserSection"><Link to="/guestUser">GuestUser Account </Link> </button>
            <button id="registerUserSection"><Link to="/register">Register</Link> </button>
            <button id="loginSection"><Link to="/login">Login</Link> </button>

        </div>
    )
}

export default BookSectionHome;