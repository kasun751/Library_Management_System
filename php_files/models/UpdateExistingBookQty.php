<?php
require_once '../dbConnection/DBConnection.php';
require_once '../models/GetIsbnData.php';
require_once '../models/AddNewBook.php';
class UpdateExistingBookQty
{
    private $con;
    private $getIsbnDataObj;
private $addNewBookObj;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
        $this->getIsbnDataObj = new GetIsbnData();
        $this->addNewBookObj = new AddNewBook();
    }


    public function addMoreQty($Qty, $ISBN_Number, $bookAvailability)
    {
        $result = $this->getIsbnDataObj->getISBNData($ISBN_Number);
        $raw = $result->fetch_assoc();
        $isbnNumber = $ISBN_Number;
        $category = $raw['Category'];

        $query3= "SELECT Category_ID From category WHERE Category_Name=?";
        $stmt3 = $this->con->prepare($query3);
        $stmt3->bind_param("s", $category);
        $stmt3->execute();
        $result3 = $stmt3->get_result();
        $row = $result3->fetch_assoc();
        $categoryID = $row['Category_ID'];
        $stmt3->close();

        $categoryElements=explode("/", $categoryID);
        $firstElement = $categoryElements[0];
        $bookDetails = $this->getLastBook_No($category, $isbnNumber);
        $book_No = $bookDetails['Book_No'] + 1;
        $bookName_ID = $bookDetails['BookName_ID'];

        $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES (?, ?,?,?,?)";
        $stmt2 = $this->con->prepare($query2);
        $result2 = true;
        for ($i = 1; $i <= $Qty; $i++) {
            $final_ID = $firstElement . "/" . $bookName_ID . "/" . $book_No;
            $stmt2->bind_param("siiss", $isbnNumber, $bookName_ID, $book_No, $bookAvailability, $final_ID);
            $stmt2->execute();
            if (!$stmt2->affected_rows) {
                $result2 = false;
            }
            $book_No++;
        }
        $stmt2->close();
        return $result2;
    }

    public function getLastBook_No($category, $isbnNumber)
    {
        $query = "SELECT BookName_ID, Book_No FROM $category WHERE ISBN_Number = ? ORDER BY Book_No DESC LIMIT 1";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $isbnNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
        return $row;
    }

    public function availableNow($isbnNumber, $AvailableAllOrOnce, $bookID)
    {
        $query1 = "SELECT Category FROM books WHERE ISBN_Number=?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $isbnNumber);
        $stmt1->execute();
        $result1 = $stmt1->get_result();
        $row1 = $result1->fetch_assoc();
        $category = $row1['Category'];
        $stmt1->close();

        if ($result1) {
            switch ($AvailableAllOrOnce) {
                case 0:
                    $query2 = "UPDATE $category SET Availability='available' WHERE ISBN_Number=?";
                    $stmt2 = $this->con->prepare($query2);
                    $stmt2->bind_param("s", $isbnNumber);
                    $result2 = $stmt2->execute();
                    $stmt2->close();
                    return $result2;
                case 1:
                    $query3 = "UPDATE $category SET Availability='available' WHERE Final_ID=?";
                    $stmt3 = $this->con->prepare($query3);
                    $stmt3->bind_param("s", $bookID);
                    $result3 = $stmt3->execute();
                    $stmt3->close();
                    return $result3;
            }
        } else {
            return false;
        }
    }

    public function stillNotAddedBooksRelevantToIsbn($isbnNumber)
    {
        $query1 = "SELECT Category FROM books WHERE ISBN_Number=?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $isbnNumber);
        $stmt1->execute();
        $result1 = $stmt1->get_result();

        if ($result1 && $result1->num_rows > 0) {
            $row1 = $result1->fetch_assoc();
            $category = $row1['Category'];
            $stmt1->close();

            $query2 = "SELECT * FROM $category WHERE Availability='stillNotAdded' AND ISBN_Number=?";
            $stmt2 = $this->con->prepare($query2);
            $stmt2->bind_param("s", $isbnNumber);
            $stmt2->execute();
            $result2 = $stmt2->get_result();

            if ($result2 && $result2->num_rows > 0) {
                $books = [];
                while ($row = $result2->fetch_assoc()) {
                    $books[] = $row;
                }
                $stmt2->close();
                return $books;
            }
        } else {
            $stmt1->close();
            return false;
        }
    }

}
//$x=new UpdateExistingBookQty();
//$x->stillNotAddedBooksRelevantToIsbn("ID01");