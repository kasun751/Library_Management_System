import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './BookAvailabilityDetails.css';
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import { isGuest } from "../../../../../userAuthFun.jsx";

function BookAvailabilityDetails() {
    const {id} = useParams();
    const [availableBookList, setAvailableBookList] = useState([]);
    const [message, setMessage] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const [guest, setGuest] = useState(true);
 
  useEffect(() => {
    const checkGuestStatus = async () => {
      try {
        const result = await isGuest();
        setGuest(result); // Update state with guest status
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkGuestStatus();
  }, []);


  const userID =localStorage.getItem('userID');

    useEffect(() => {
        fetchBookDetails(id, 0);
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


    const getNextBookSet = () => {
        setOffset(prevOffset => prevOffset + 5);
        fetchBookDetails(id, offset + 5);
    }
    const getPreviousBookSet = () => {
        setOffset(prevOffset => prevOffset - 5);
        fetchBookDetails(id, offset - 5);
    }

    const fetchBookDetails = async (id, offsetNumber) => {
        console.log(offsetNumber)
        await axios.get(`http://localhost:80/project_1/UserLogin/controllers/BookAvailabilityDetailsController.php?id=${id}&offset=${offsetNumber}`)
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
            'http://localhost:80/project_1/UserLogin/controllers/HandleRequestController.php?id=0',
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
        <div id="BookAvailabilityDetails" className="bookSectionCommonClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/"} Link2={"Dashboard"} router2={"/dashboard"} Link7={"Log Out"} router7={"/login"}/>
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
            <div className="bookSectionCommonTableClass">
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
                                    <td className="booDetails">{index + 1}</td>
                                    <td className="booDetails">{book.Final_ID}</td>
                                    <td id="requestThis" className="booDetails">
                                        <button id="request" className="btn btn-success"
                                                onClick={() => requestBook(book.Final_ID, book.category
                                                )} disabled={guest}>Request This
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
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-between w-75">
                            <button className="btn btn-primary btn-sm shadow-sm" onClick={getPreviousBookSet}>
                                <i className="bi bi-arrow-left"></i> Previous Books
                            </button>
                            <button className="btn btn-primary btn-sm shadow-sm" onClick={getNextBookSet}>
                                Next Books <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default BookAvailabilityDetails;
