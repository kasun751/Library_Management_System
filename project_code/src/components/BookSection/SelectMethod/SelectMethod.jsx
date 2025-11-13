import {Link} from "react-router-dom";

function selectMethod(){

    return (
        <div>
            <button id="addNewBookSection"> <Link to="/addBook/addNewBook">Add New Book</Link> </button>
            <button id="addExistingBookQtySection"><Link to="/addBook/addExistingBookQty"> Add Book Quantity</Link></button>
            <button id="addCategorySection"><Link to="/addBook/addCategory"> Add Book Category</Link></button>
            <button id="AvailableNowSection"><Link to="/addBook/availableNow"> Available Now</Link></button>



        </div>
    )
}
export default selectMethod;