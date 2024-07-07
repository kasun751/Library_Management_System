import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './BookAvailabilityDetails.css';
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";

function BookAvailabilityDetails() {
    const {id} = useParams();
    const [availableBookList, setAvailableBookList] = useState([]);
    const [message, setMessage] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const userID = "SLMS/REG/24/1";  //getting this from session storage
    useEffect(() => {
        console.log(id);
        fetchBookDetails(id);
    }, [id]);
    useEffect(() => {
        const storedMessage = localStorage.getItem("message");
        if (storedMessage) {
            setModalMessage(storedMessage);
            setShowModal(true);
        }
        localStorage.removeItem("message");


    }, []);
    const handleClose = () => {
        setShowModal(false);
    };
    const fetchBookDetails = async (id) => {
        await axios.get(`http://localhost:8081/project_01/controllers/BookAvailabilityDetailsController.php?id=${id}`)
            .then(response => {
                console.log(response.data)
                setAvailableBookList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const requestBook = async (bookID, category) => {
        setLoading(true);
        const extendedData = {
            bookID: bookID,
            userID: userID,
            category: category
        };
        console.log(extendedData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/HandleRequestController.php?id=0',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        const message = res.data.resultMessage;
        setLoading(false);
        if (message) {

            localStorage.setItem("message", message);
        }
 location.reload();
    }
    return (
        <div id="BookAvailabilityDetails"  className="bookSectionCommonClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/bookSection"} Link7={"Log Out"} router7={""}/>
            {showModal && (
                <div className="modal fade show custom-modal" tabIndex="-1" role="dialog"
                     style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Message!</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleClose}
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div  className="bookSectionCommonTableClass">
                <div className="container">
                    <h1>Available Books</h1>
                    <br/>
                <table className="table w-75 mx-auto">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book ID</th>
                        <th scope="col">Request This</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(availableBookList) && availableBookList.length > 0 ? (
                        availableBookList.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails" >{index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td id="requestThis" className="booDetails">
                                    <button id="request" className="btn btn-success"
                                            onClick={() => requestBook(book.Final_ID, book.category
                                            )}>Request This
                                    </button>
                                </td>

                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan="3" className="booDetails">No books available</td>
                        </tr>
                    )}
                    {/*<p>response:  {message}</p>*/}
                    </tbody>
                </table>
                </div>
                <div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default BookAvailabilityDetails;
