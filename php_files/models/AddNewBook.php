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
    {
        $query = "SELECT BookName_ID FROM $category ORDER BY BookName_ID DESC LIMIT 1";
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
        return $row;
    }

    public function InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $bookLocation, $bookAvailability, $description, $bookName_ID, $book_No)
    {
        $query1 = "INSERT INTO books (ISBN_Number, BookName, AuthorName, PublisherName, Category, BookLocation, Description) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("sssssss", $isbnNumber, $bookName, $authorName, $publisherName, $category, $bookLocation, $description);
        $result1 = $stmt1->execute();

        if($result1){
            $query3 = "SELECT Category_ID FROM category WHERE Category_Name=?";
            $stmt3 = $this->con->prepare($query3);
            $stmt3->bind_param("s", $category);
            $stmt3->execute();
            $result3 = $stmt3->get_result();

            if ($result3->num_rows > 0) {
                $row = $result3->fetch_assoc();
                $categoryID = $row['Category_ID'];
                $categoryElements = explode("/", $categoryID);
                $firstElement = $categoryElements[0];
            }

            $query2 = "INSERT INTO $category (ISBN_Number, BookName_ID, Book_No, Availability, Final_ID) VALUES (?, ?, ?, ?, ?)";
            $stmt2 = $this->con->prepare($query2);

            $resultOfSeparateBookInsertion=true;
            for ($i = 1; $i <= $qty; $i++) {
                $final_ID = $firstElement . "/" . $bookName_ID . "/" . $book_No;
                $stmt2->bind_param("siiss", $isbnNumber, $bookName_ID, $book_No, $bookAvailability, $final_ID);
                $result2 = $stmt2->execute();
                if (!$result2) {
                    $resultOfSeparateBookInsertion=false;
                }
                $book_No++;
            }
            $stmt1->close();
            $stmt2->close();
            $stmt3->close();
        }else{
            $resultOfSeparateBookInsertion=false;
        }
        return array($result1, $resultOfSeparateBookInsertion);
    }
}
//$x=new AddNewBook();
//$word="sass's";
//$x->InsertBookSTableDetails(word,"a","a",1,"","","available","available","",)