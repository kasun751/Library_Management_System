import InputField from "../../SubComponents/InputFields.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ViewBookRequests() {

    const [requestList, setRequestList] = useState([]);
    const [requestRelevantToUserID, setRequestRelevantToUserID] = useState([]);

    const handleChange = (e) => {
        if (e.target.name) {
            getRequestDetails({[e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:8081/project_01/controllers/HandleRequestController.php')
                .then(response => {
                    setRequestList(response.data);
                })
                .catch(error => {
                    console.log(error.message);
                });
        };
        fetchBooks();
    }, []);

    const getRequestDetails = async (userID) => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/HandleRequestController.php?id=1',
            userID,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        setRequestRelevantToUserID(res.data);
    }


    const acceptBookRequest = async (bookID,userID) => {
        const extendedData = {
            bookID:bookID,
            userID:userID,
        };
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/HandleRequestController.php?id=0',
            extendedData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data.resultMessage)
        setMessage(res.data.resultMessage);
    }
    return (
       <>
           <InputField label={"User ID"} id={"validationUser"} className={"form-control"} name={"userID"}
                       type={"text"} handleChange={handleChange} feedback={"User ID"}/>

           <div className="container">
               <br/>
               <h4>Requests</h4>
               <hr/>
               <table className="table">
                   <thead>
                   <tr>
                       <th scope="col">No</th>
                       <th scope="col">Book ID</th>
                       <th scope="col">User ID</th>
                   </tr>
                   </thead>
                   <tbody>
                   {requestRelevantToUserID.length !== 0 ? (
                       requestRelevantToUserID.map((request, index) => (
                           <tr key={index}>
                               <td className="booDetails">Result {index + 1}</td>
                               <td className="booDetails">{request.Final_ID}</td>
                               <td className="booDetails">{request.UserID}</td>
                               <td>
                                   <form className="row g-3 needs-validation" noValidate>
                                       <InputField label={"User ID"} id={"validationUserID"} className={"form-control"}
                                                   name={"userID"}
                                                   type={"text"} handleChange={handleChange} feedback={"User ID."}/>
                                       <button id="request" className="btn btn-success"
                                               onClick={() => acceptBookRequest(request.Final_ID, request.UserID
                                               )}>Accept Request
                                       </button>
                                   </form>
                               </td>
                           </tr>
                       ))
                   ) : (
                       requestList.map((request, index) => (
                           <tr key={index}>
                               <td className="booDetails">{index + 1}</td>
                               <td className="booDetails">{request.Final_ID}</td>
                               <td className="booDetails">{request.UserID}</td>
                               <td>
                                   <form className="row g-3 needs-validation" noValidate>
                                       <InputField label={"User ID"} id={"validationUserID"} className={"form-control"} name={"userID"}
                                                   type={"text"} handleChange={handleChange} feedback={"User ID."}/>
                                       <button id="request" className="btn btn-success"
                                               onClick={() => acceptBookRequest(request.Final_ID, request.UserID
                                               )}>Accept Request
                                       </button>
                                   </form>
                               </td>
                           </tr>
                       ))
                   )}
                   </tbody>
               </table>
           </div>


       </>
    );
}

export default ViewBookRequests;