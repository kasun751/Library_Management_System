import {Link} from "react-router-dom";

function selectMethod(){

    return (
        <div>
            <button id="addNewBook"> <Link to="/addBook/addNewBook">Add New Book</Link> </button>
            <button id="addExistingBookQty"><Link to="/addBook/addExistingBookQty"> Add Book Quantity</Link></button>
            <button id="addCategory"><Link to="/addBook/addCategory"> Add Book Category</Link></button>
            <button id="addCategory"><Link to="/addBook/availableNow"> Available Now</Link></button>



        </div>
    )
}
export default selectMethod;