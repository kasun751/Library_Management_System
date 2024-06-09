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
//        $uppercaseString = strtoupper($category);
//        $charArray = str_split($uppercaseString);
        $bookDetails = $this->getLastBook_No($category, $isbnNumber);
        $book_No = $bookDetails['Book_No'] + 1;
        $bookName_ID = $bookDetails['BookName_ID'];

        for ($i = 1; $i <= $Qty; $i++) {
            $final_ID = $firstElement . "/" . $bookName_ID . "/" . $book_No;
            $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES ('$isbnNumber', '$bookName_ID','$book_No','$bookAvailability','$final_ID')";
            $result2 = $this->con->query($query2);
            $book_No++;
        }
        $query = "SELECT COUNT(*) AS count FROM $category WHERE ISBN_Number='$isbnNumber'";
        $result = $this->con->query($query);
        $count = $result->fetch_assoc()['count'];
        $queryNext = "UPDATE books SET AllBookQty ='$count'  WHERE ISBN_NUmber='$isbnNumber'";
        $this->con->query($queryNext);
        return $result2;
    }
    public function getLastBook_No($category, $isbnNumber)
    {
        $query = "SELECT BookName_ID,Book_No FROM $category WHERE ISBN_Number='$isbnNumber' ORDER BY Book_No DESC LIMIT 1";
        $result =$this->con->query($query);
        $row = $result->fetch_assoc();
        return $row;
    }
}