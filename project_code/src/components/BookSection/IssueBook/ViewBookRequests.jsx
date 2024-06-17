import InputField from "../../SubComponents/InputFields.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AcceptRequest from "./AcceptRequest.jsx";
import './ViewBookRequests.css';
function ViewBookRequests() {

    const [requestList, setRequestList] = useState([]);
    const [requestRelevantToUserID, setRequestRelevantToUserID] = useState([]);
    const [category, setCategory] = useState([]);

    const handleChange = (e) => {
        if (e.target.name) {
            getRequestDetails({[e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:8081/project_01/controllers/HandleRequestController.php')
                .then(response => {
                    console.log(response.data)
                    setRequestList(response.data);
                    //setCategory(response.data.category)
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

    return (
       <div id="ViewBookRequests">


           <div className="container">
               <br/>
               <h2>Requests</h2>
               <hr/>
               <br/>
               <InputField label={"User ID"} id={"validationUser"} className={"form-control"} name={"userID"}
                           type={"text"} handleChange={handleChange} feedback={"User ID"} placeholder={"EX:SLMS/24/2"}/>
               <table className="table">
                   <thead>
                   <tr>
                       <th scope="col">No</th>
                       <th scope="col">Book ID</th>
                       <th scope="col">User ID</th>
                       <th scope="col">Accept</th>
                   </tr>
                   </thead>
                   <tbody>
                   {requestRelevantToUserID.length !== 0 ? (
                       requestRelevantToUserID.map((request, index) => (
                           <tr key={index}>
                               <td className="booDetails">Result {index + 1}</td>
                               <td className="booDetails">{request.Final_ID}</td>
                               <td className="booDetails">{request.UserID}</td>
                               <td className="booDetails">
                                   <AcceptRequest bookID={request.Final_ID} userID={request.UserID}
                                                  category={request.category}/>
                               </td>
                           </tr>
                       ))
                   ) : (
                       requestList.map((request, index) => (
                           <tr key={index}>
                               <td className="booDetails">{index + 1}</td>
                               <td className="booDetails">{request.Final_ID}</td>
                               <td className="booDetails">{request.UserID}</td>
                               <td className="booDetails">
                                   <AcceptRequest bookID={request.Final_ID} userID={request.UserID}
                                                  category={request.Category_Name}/>
                               </td>
                           </tr>
                       ))
                   )}
                   </tbody>
               </table>
           </div>


       </div>
    );
}

export default ViewBookRequests;