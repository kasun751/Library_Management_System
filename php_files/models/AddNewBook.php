<?php

require_once '../dbConnection/DBConnection.php';
class AddNewBook
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function getLastBookName_ID($category)
    {   //getting Book Name ID from relevant category

        $query = "SELECT BookName_ID FROM $category ORDER BY BookName_ID DESC LIMIT 1";
        $result = $this->con->query($query);
        $row =$result->fetch_assoc();
        return $row;
    }

    public function InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $bookLocation, $bookAvailability, $description, $bookName_ID, $book_No)
    {   //insert new books details to book table

        $query1 = "INSERT INTO books (ISBN_Number,BookName, AuthorName, PublisherName,Category,AllBookQty,BookLocation,Description) VALUES ('$isbnNumber', '$bookName', '$authorName', '$publisherName ', '$category','$qty','$bookLocation', '$description')";
        $result1 = $this->con->query($query1);
        $query3= "SELECT Category_ID From category WHERE Category_Name='$category'";
        $result3 = $this->con->query($query3);
        $row =$result3->fetch_assoc();
        $categoryID=$row['Category_ID'];
        $categoryElements=explode("/", $categoryID);
        $firstElement = $categoryElements[0];
//        $uppercaseString = strtoupper($category);
//        $charArray = str_split($uppercaseString);
        for ($i = 1; $i <= $qty; $i++) {
//            if (count($charArray) >= 3) {
            $final_ID = $firstElement . "/" . $bookName_ID . "/" . $book_No;
//            } else {
//                $final_ID = $charArray[0] . $charArray[1] . "/" . $bookName_ID . "/" . $book_No;
//
//            }
            $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES ('$isbnNumber', '$bookName_ID','$book_No','$bookAvailability','$final_ID')";
            $result2 = $this->con->query($query2);
            $book_No++;
        }
        return array($result1, $result2);
    }

}