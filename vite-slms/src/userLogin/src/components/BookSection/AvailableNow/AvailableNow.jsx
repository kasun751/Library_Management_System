import InputField from "../../SubComponents/InputFields.jsx";
import './AvailableNow.css';
import axios from "axios";
import {useEffect, useState} from "react";
import CircleSpinner from "../../CircleSpinner/CircleSpinner.jsx";
import HeaderComponent from "../../Header/HeaderComponent.jsx";
import FooterComponent from "../../Footer/FooterComponent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


const AvailableNow = () => {
    const [bookList, setBookList] = useState([]);
    const [autoFetchBookList, setAutoFetchBookList] = useState([]);
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isbn, setISBN] = useState(null);
    const [offset, setOffset] = useState(0);

    const handleChange = (e) => {

        if (e.target.name == "isbnNumber") {
            setOffset(0)
            getStillNotAddedBooks(e.target.value, 0);
        }
    }
    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get(`http://localhost:80/project_1/UserLogin/controllers/UpdateExistingBookQtyController.php`, {
                params: {
                    para: 0
                }
            })
                .then(response => {
                    console.log(response.data)
                    setAutoFetchBookList(response.data);
                })
                .catch(error => {
                    console.log(error.message);
                });
        };
        fetchBooks();
    }, []);

    const getNextBookSet = () => {
        setOffset(prevOffset => prevOffset + 10);
        getStillNotAddedBooks(isbn, offset + 10);
    }

    const getPreviousBookSet = () => {
        setOffset(prevOffset => prevOffset - 10);
        getStillNotAddedBooks(isbn, offset - 10);
    }
    const getStillNotAddedBooks = async (isbnNumber, offset) => {
        setLoading(true);
        await axios.get(`http://localhost:80/project_1/UserLogin/controllers/UpdateExistingBookQtyController.php`, {
            params: {
                isbnNumber: isbnNumber,
                para: 1,
                offset: offset
            }
        })
            .then(response => {
                console.log(response.data)
                setBookList(response.data);
                if (response.data !== null) {
                    setISBN(response.data[0].ISBN_Number);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const available = async (deleteData, AvailableAllOrOncePara) => {
        console.log(deleteData)
        let extendData;
        switch (AvailableAllOrOncePara) {
            case 0:
                extendData = {
                    isbnNumber: deleteData,
                    parameter: 1,
                    AvailableAllOrOncePara: 0
                }
                break;
            case 1:
                extendData = {
                    bookID: deleteData,
                    isbnNumber: deleteData,
                    parameter: 1,
                    AvailableAllOrOncePara: 1
                }
                break;
            case 2:
                extendData = {
                    bookID: deleteData,
                    isbnNumber: deleteData,
                    parameter: 1,
                    AvailableAllOrOncePara: 2
                }
                break;
            case 3:
                extendData = {
                    bookID: deleteData,
                    isbnNumber: deleteData,
                    parameter: 1,
                    AvailableAllOrOncePara: 3
                }
                break;
        }
        console.log(extendData)
        const res = await axios.post(
            'http://localhost:80/project_1/UserLogin/controllers/UpdateExistingBookQtyController.php',
            extendData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = res.data;
        console.log(res.data)
        if (message.resultMessage === "true") {
            localStorage.setItem("message", "Update Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }

    return (
        <div id="availableNow" className="bookSectionCommonClass bookSectionCommonTableClass">
            {loading && <CircleSpinner/>}
            <HeaderComponent Link1={"Home"} router1={"/"} Link2={"DashBoard"} router2={"/dashboard"} Link7={"Log Out"} router7={""}/>
            <div className="container">
                <br/>
                <h1>Set Available</h1>
                <hr/>
                <p style={{
                    color: message === "Update Successfully!" ? 'yellow' : 'red',
                }}>{message}</p>
                <div className="input-and-button w-75 mx-auto">
                    <div>
                        <InputField label={""} id={"searchIsbn"} className={"form-control "}
                                    placeholder={"Enter ISBN"}
                                    name={"isbnNumber"} type={"text"} handleChange={handleChange}/>
                    </div>
                    <div>
                        {Array.isArray(bookList) && bookList.length !== 0 ?
                            (<div id="hiddenBtn">
                                <button id="availableAll" className="btn btn-success "
                                        onClick={() => available(bookList[0].ISBN_Number, 0)}
                                        data-toggle="tooltip"
                                        title="Click To Set Available All Books Relavant To ISBN."
                                >Available All
                                </button>
                                <button id="notAvailableAll" className="btn btn-success"
                                        onClick={() => available(bookList[0].ISBN_Number, 3)}
                                        data-toggle="tooltip"
                                        title="Click To Set Not Available All Books Relavant To ISBN."
                                >Not Available All
                                </button>
                            </div>) : ""}

                    </div>
                </div>

                <table className="table w-75 mx-auto">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book ID</th>
                        <th scope="col">
                            Available This
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(bookList) && bookList.length > 0 ? (

                        bookList.map((book, index) => (
                            <tr key={index}>

                                <td className="booDetails"> {index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td id="availableThisBook" className="booDetails">
                                    {<button id="availableThis" className="btn btn-success"
                                             disabled={book.Availability === 'available'}
                                             onClick={() => available(book.Final_ID, 1)}>Available Now
                                    </button>}
                                    {<button id="notAvailable" className="btn btn-success"
                                             disabled={book.Availability === 'stillNotAdded'}
                                             onClick={() => available(book.Final_ID, 2)}>Not Available
                                    </button>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        Array.isArray(autoFetchBookList) && autoFetchBookList.length > 0 ? (

                            autoFetchBookList.map((book, index) => (
                                <tr key={index}>
                                    <td className="booDetails"> {index + 1}</td>
                                    <td className="booDetails">{book.Final_ID}</td>
                                    <td id="requestThis" className="booDetails">
                                        {<button id="availableThis" className="btn btn-success"
                                                 disabled={book.Availability === 'available'}
                                                 onClick={() => available(book.Final_ID, 1)}
                                                 data-toggle="tooltip"
                                                 title="Click To Available This."
                                        >Available Now

                                        </button>}
                                        {<button id="notAvailable" className="btn btn-success"
                                                 disabled={book.Availability === 'stillNotAdded'}
                                                 onClick={() => available(book.Final_ID, 2)}
                                                 data-toggle="tooltip"
                                                 title="Click To Not Available This."
                                        >Not Available
                                        </button>}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No books found.</td>
                            </tr>
                        )
                    )}

                    </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    {isbn !== null && (
                        <div className="d-flex justify-content-between w-75">
                            <button className="btn btn-primary btn-sm shadow-sm" onClick={getPreviousBookSet}>
                                <i className="bi bi-arrow-left"></i> Previous Books
                            </button>
                            <button className="btn btn-primary btn-sm shadow-sm" onClick={getNextBookSet}>
                                Next Books <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    )}
                </div>


            </div>
            <FooterComponent/>
        </div>
    );
};

export default AvailableNow;