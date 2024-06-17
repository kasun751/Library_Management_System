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
        $query3= "SELECT Category_ID From category WHERE Category_Name='$category'";
        $result3 = $this->con->query($query3);
        $row =$result3->fetch_assoc();
        $categoryID=$row['Category_ID'];
        $categoryElements=explode("/", $categoryID);
        $firstElement = $categoryElements[0];
        $bookDetails = $this->getLastBook_No($category, $isbnNumber);
        $book_No = $bookDetails['Book_No'] + 1;
        $bookName_ID = $bookDetails['BookName_ID'];

        for ($i = 1; $i <= $Qty; $i++) {
            $final_ID = $firstElement . "/" . $bookName_ID . "/" . $book_No;
            $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES ('$isbnNumber', '$bookName_ID','$book_No','$bookAvailability','$final_ID')";
            $result2 = $this->con->query($query2);
            $book_No++;
        }
        return $result2;
    }
    public function getLastBook_No($category, $isbnNumber)
    {
        $query = "SELECT BookName_ID,Book_No FROM $category WHERE ISBN_Number='$isbnNumber' ORDER BY Book_No DESC LIMIT 1";
        $result =$this->con->query($query);
        $row = $result->fetch_assoc();
        return $row;
    }

    public function availableNow($isbnNumber,$AvailableAllOrOnce,$bookID)
    {
        $query1="SELECT Category FROM books WHERE ISBN_Number='$isbnNumber'";
        $result1 =$this->con->query($query1);
        $row1 = $result1->fetch_assoc();
        $category=$row1['Category'];

        if($result1){
            switch ($AvailableAllOrOnce){
                case 0:
                    $query2="UPDATE $category SET Availability='available' WHERE ISBN_Number='$isbnNumber'";
                    $result2 =$this->con->query($query2);
                    return $result2;
                case 1:
                    $query3="UPDATE $category SET Availability='available' WHERE Final_ID='$bookID'";
                    $result3 =$this->con->query($query3);
                    return $result3;
            }
        }else{
            return false;
        }
    }

    public function stillNotAddedBooksRelevantToIsbn($isbnNumber)
    {
        $query1="SELECT Category FROM books WHERE ISBN_Number='$isbnNumber'";
        $result1 =$this->con->query($query1);
        if ($result1 && $result1->num_rows > 0){
            $row1 = $result1->fetch_assoc();
            $category=$row1['Category'];
            $query2="SELECT * FROM $category WHERE Availability='stillNotAdded' AND ISBN_Number='$isbnNumber'";
            $result2 =$this->con->query($query2);
            if ($result2 && $result2->num_rows > 0) {
                $books = [];
                while ($row = $result2->fetch_assoc()) {
                    $books[] = $row;
                }
                return $books;
            }
        }else{
            return false;
        }
    }
}
//$x=new UpdateExistingBookQty();
//$x->stillNotAddedBooksRelevantToIsbn("ID01");