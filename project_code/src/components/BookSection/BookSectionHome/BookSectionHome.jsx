import {Link} from "react-router-dom";

function BookSectionHome() {

    return (
        <div>
            <button id="addBookSection"> <Link to="/addBook">Add Book</Link> </button>
            <button id="modifyBookSection"><Link to="/modifyBook"> Modify Book </Link></button>
            <button id="deleteBookSection"> <Link to="/deleteBook">Delete Book </Link></button>
            <button id="issueBookSection"><Link to="/issueBook"> Issue Book</Link></button>
            <button id="returnBookSection"><Link to="/viewBook">View Book Details </Link> </button>
            <button id="returnBookSection"><Link to="/test">Fetch data </Link> </button>
        </div>
    )
}

export default BookSectionHome;