import InputField from "../../SubComponents/InputFields.jsx";
import './AvailableNow.css';
import axios from "axios";
import {useEffect, useState} from "react";
import login from "../../LogginSection/Login.jsx";

const AvailableNow = () => {
    const [bookList, setBookList] = useState([]);
    const [message, setMessage] = useState([]);
    const handleChange = (e) => {

        if (e.target.name == "isbnNumber") {
            getStillNotAddedBooks(e.target.value);
        }
    }
    useEffect(() => {
        const storedAddMessage = localStorage.getItem("message");
        if (storedAddMessage) {
            setMessage(storedAddMessage);
        }
        localStorage.removeItem("message");

    }, []);
    const getStillNotAddedBooks = async (isbnNumber) => {
        await axios.get(`http://localhost:8081/project_01/controllers/UpdateExistingBookQtyController.php?isbnNumber=${isbnNumber}`)
            .then(response => {
                console.log(response.data)
                setBookList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const available = async (deleteData, AvailableAllOrOncePara) => {
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
                    isbnNumber:bookList[0].ISBN_Number,
                    parameter: 1,
                    AvailableAllOrOncePara: 1
                }
                break;
        }
        console.log(extendData)
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/UpdateExistingBookQtyController.php',
            extendData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const message = res.data;
        if (message.resultMessage === "true") {
            localStorage.setItem("message", "Update Successfully!");
        } else {
            localStorage.setItem("message", "Failed!");
        }
        location.reload();
    }

    return (
        <div id="availableNow">
            <div className="container">
                <br/>
                <h2>View Book</h2>
                <hr/>
                <p style={{
                    color: message === "Update Successfully!" ? 'yellow' : 'red',
                }}>{message}</p>
                <div className="input-and-button">
                    <div>
                        <InputField label={""} id={"validationBookID1"} className={"form-control"}
                                    placeholder={"Enter ISBN"}
                                    name={"isbnNumber"} type={"text"} handleChange={handleChange}/>
                    </div>
                    <div>
                        {Array.isArray(bookList) && bookList.length !== 0 ?
                            (<button id="availableAll" className="btn btn-success"
                                     onClick={() => available(bookList[0].ISBN_Number, 0)}>Available All
                            </button>) : ""}
                    </div>
                </div>

                <table className="table">
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
                                <td className="booDetails">Result {index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td id="requestThis" className="booDetails">
                                    {<button id="availableThis" className="btn btn-success"
                                             onClick={() => available(book.Final_ID, 1)}>Available This
                                    </button>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="booDetails">No books available</td>
                        </tr>
                    )}

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AvailableNow;