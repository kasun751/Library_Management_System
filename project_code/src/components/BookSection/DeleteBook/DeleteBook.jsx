
import {Link} from "react-router-dom";

function DeleteBook() {
    return (
        <div>
            <button id="deleteAllBook"> <Link to="/deleteAllBook">Delete All Book </Link></button>
            <button id="deleteSomeBook"> <Link to="/deleteSomeBook">Delete Some Book </Link></button>
        </div>
    )
}

export default DeleteBook;