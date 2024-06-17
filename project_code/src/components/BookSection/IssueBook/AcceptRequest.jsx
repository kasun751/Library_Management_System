import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";

const AcceptRequest = ({bookID,userID,category}) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const handleSubmit = async () => {

        const extendedData = {
            bookID:bookID,
            userID:userID,
            confirmationCode:confirmationCode,
            category:category
        };
        console.log(extendedData)
        const res = await axios.post(

            'http://localhost:8081/project_01/controllers/ConfirmBookRequestController.php',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data.resultMessage)
        setMessage(res.data.resultMessage);
        window.location.reload();
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Accept Request
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Confirmation Code</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="confirmation-code" className="col-form-label text-white">Confirmation
                                        Code:</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-white"
                                        id="confirmation-code"
                                        value={confirmationCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p style={{
                                    color: message === "Successfully Book Issued." ? 'green' : 'red',
                                }}>{message}</p>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptRequest;
