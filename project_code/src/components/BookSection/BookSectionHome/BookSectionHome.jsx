import {Link} from "react-router-dom";

function BookSectionHome() {

    return (
        <div>
            <button id="addBook"> <Link to="/addBook">Add Book</Link> </button>
            <button id="modifyBook"><Link to="/modifyBook"> Modify Book </Link></button>
            <button id="deleteBook"> <Link to="/deleteBook">Delete Book </Link></button>
            <button id="issueBook"><Link to="/issueBook"> Issue Book</Link></button>
            <button id="returnBook"><Link to="/viewBook">View Book Details </Link> </button>

        </div>
    )
}

export default BookSectionHome;