import {useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import InputField from "../../SubComponents/InputFields.jsx";
import Button from "../../SubComponents/Button.jsx";
function ShowDeletedBooksReleventToIsbn({value,submit,category}) {

    const [booksList, setBooksList] = useState([]);
    const [booksdetails, setBooksdetails] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if(value){
            getBookDetails({[ "isbnNumber"]: value});
        }

    }, [value]);


    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:8081/project_01/controllers/ViewBookListInBackupBookTableController.php')
                .then(response => {
                    setBooksList(response.data);
                })
                .catch(error => {
                    console.log(error.message);
                });
        };
        fetchBooks();
    }, []);

    const getBookDetails = async (bookDetails) => {
        const res = await axios.post(
            'http://localhost:8081/project_01/controllers/ViewBookListInBackupBookTableController.php',
            bookDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        setBooksdetails(res.data);
    }

    // const handleClick = async (restorePara) => {
    //
    //     const extendedData = {
    //         category:category,
    //         restorePara: restorePara,
    //         delete_parameter: 2
    //     };
    //     console.log(extendedData)
    //     const res = await axios.post(
    //         'http://localhost:8081/project_01/controllers/DeleteBookController.php',
    //         extendedData,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //     console.log(res.data)
    //     const message = await res.data.resultMessage;
    //     setMessage(message);
    //     //console.log(message.ISBN_Number)
    // }
    return (
        <>
            <div className="container">
                <br/>
                <h4>Deleted Books</h4>
                <hr/>
                {booksdetails.length !== 0 ? (
                        <Button keyword1={"RestoreAll"} keyword2={"Restore All Books"} submit={submit}/>
                    ):""}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book ID</th>
                    </tr>
                    </thead>
                    <tbody>

                    {booksdetails.length !== 0 ? (
                        booksdetails.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails">Result {index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td className="booDetails">
                                    {/*<button*/}
                                    {/*    id="availabilityDetails"*/}
                                    {/*    className="btn btn-success"*/}
                                    {/*    onClick={() => handleClick("restoreOnce")}*/}
                                    {/*>*/}
                                    {/*    Restore This*/}
                                    {/*</button>*/}
                                    <Button  keyword1={"RestoreOnce"} keyword2={"Restore This"} keyword3={book.Final_ID} submit={submit}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        booksList.map((book, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{book.Final_ID}</td>
                                <td >
                                    <button id="availabilityDetails" className="btn btn-success"><Link to={`/viewBook/bookAvailabilityDetails/${book.ISBN_Number}`}>Available Books </Link></button>
                                    <button id="availabilityDetails" className="btn btn-danger"><Link to={`/viewBook/showAllBookDetails/${book.ISBN_Number}`}>View Details</Link></button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>


        </>
    )
}
export default ShowDeletedBooksReleventToIsbn;
