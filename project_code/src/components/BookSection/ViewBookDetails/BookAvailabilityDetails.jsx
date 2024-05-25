import axios from "axios";
import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function BookAvailabilityDetails() {
    const { id } = useParams();
    const [availableBookList, setAvailableBookList] = useState([]);
    useEffect(() => {
        console.log(id);
        fetchBookDetails(id);
    }, [id]);

    const fetchBookDetails = async (id) => {
        await axios.get(`http://localhost:8081/project_01/bookAvailabilityDetails.php?id=${id}`)
            .then(response => {
                console.log(response.data)
                setAvailableBookList(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Book ID</th>
                </tr>
                </thead>
                <tbody>
                {availableBookList.map((book, index) => (
                        <tr key={index}>
                            <td className="booDetails">Result {index + 1}</td>
                            <td className="booDetails">{book.Final_ID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default BookAvailabilityDetails;
