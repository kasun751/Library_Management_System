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
            await axios.get('http://localhost:80/project_1/UserLogin/controllers/ViewBookListInBackupBookTableController.php')
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
            'http://localhost:80/project_1/UserLogin/controllers/ViewBookListInBackupBookTableController.php',
            bookDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        setBooksdetails(res.data);
    }

   
    return (
        <div id="showDeletedBooksRelevantToIsbn">
            <div className="container" >
                <br/>
                <h1 id="displayTitle">Display Deleted Books</h1>
                <br/>
                <table className="table w-75 mx-auto    ">
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
                    <div className="col-9 mx-auto">
                    <Button id={"restoreAll"} keyword1={"RestoreAll"} keyword2={"Restore All Books"} submit={submit}/>
                    </div>
                ) : ""}
            </div>
        </div>
    )
}
export default ShowDeletedBooksReleventToIsbn;
