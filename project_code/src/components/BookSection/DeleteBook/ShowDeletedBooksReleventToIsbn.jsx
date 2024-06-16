import {useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "../../SubComponents/Button.jsx";
import './ShowDeletedBooksReleventToIsbn.css';

function ShowDeletedBooksReleventToIsbn({value,submit,category}) {

    const [booksList, setBooksList] = useState([]);
    const [booksdetails, setBooksdetails] = useState([]);

    useEffect(() => {
        if(value){
            getBookDetails({[ "isbnNumber"]: value});
        }

    }, [value]);


    useEffect(() => {
        const fetchBooks = async () => {
            await axios.get('http://localhost:8081/project_01/controllers/ViewBookListInBackupBookTableController.php')
                .then(response => {
                    console.log(response.data)
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
        <div id="showDeletedBooksRelevantToIsbn">
            <div className="container" >
                <br/>
                <hr/>
                <br/>
                <h2>Show Deleted Books</h2>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Book ID</th>
                        <th scope="col">Restore</th>
                    </tr>
                    </thead>
                    <tbody>

                    {booksdetails.length !== 0 ? (
                        booksdetails.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails">Result {index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td className="booDetails">
                                    <Button keyword1={"RestoreOnce"} keyword2={"Restore This"} keyword3={book.Final_ID}
                                            submit={submit} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        booksList.map((book, index) => (
                            <tr key={index}>
                                <td className="booDetails">{index + 1}</td>
                                <td className="booDetails">{book.Final_ID}</td>
                                <td className="booDetails">
                                    <Button keyword1={"RestoreOnce"} keyword2={"Restore This"} keyword3={book.Final_ID}
                                          submit={submit} />
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>
                {booksdetails.length !== 0 ? (
                    <Button id={"restoreAll"} keyword1={"RestoreAll"} keyword2={"Restore All Books"} submit={submit}/>
                ) : ""}
            </div>
        </div>
    )
}
export default ShowDeletedBooksReleventToIsbn;
