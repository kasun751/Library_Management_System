<?php
include 'DBConnection.php';

class SqlQuery{
private $con;
    public function __construct() {

        $DBobj= new DBConnection;
        $this->con=$DBobj->dbConnect();
    }

    public function runSqlInsertQuery($bookName, $authorName, $publisherName, $isbnNumber, $category,$qty, $description)
    {

        for($i=1;$i<=$qty;$i++){
            $query = "INSERT INTO books (BookName, AuthorName, PublisherName,ISBN_Number,Category,Qty,Description) VALUES ('$bookName', '$authorName', '$publisherName ', '$isbnNumber', '$category','$qty', '$description')";
            $result =  $this->con->query($query);
        }
        return  $result;
    }

    public function addMoreQty($qty,$isbnNumber)
    {
        $getData = new SqlQuery();
        $result=$getData->getISBNData($isbnNumber);
        $raw=$result->fetch_assoc();
        $bookName=$raw['BookName'];
        $authorName=$raw['AuthorName'];
        $publisherName=$raw['PublisherName'];
        $isbnNumber=$raw['ISBN_Number'];
        $category=$raw['Category'];
        $description=$raw['Description'];
        for($i=1;$i<=$qty;$i++){
            $query = "INSERT INTO books (BookName, AuthorName, PublisherName,ISBN_Number,Category,Qty,Description) VALUES ('$bookName', '$authorName', '$publisherName ', '$isbnNumber', '$category','$qty', '$description')";
            $result =  $this->con->query($query);
        }
        return  $result;
    }
    public function getLastBookId()
    {

        $query="SELECT BookID FROM books ORDER BY BookID DESC LIMIT 1";
        $result = mysqli_query($this->con, $query);
        return  $result;
    }
    public function getISBNData($isbnNumber)
    {

        $query="SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
        $result = mysqli_query($this->con, $query);
        return  $result;
    }
    public function runSqlUpdateQuery($name,$authorName)
    {
        $query = "UPDATE books SET AuthorName='$authorName' WHERE BookName='$name'";
        $this->con->query($query);
        return  $this->con->affected_rows;
    }

    public function runSqlRetrieveQuery($id, $bookName)
    {
        if ($id == "" && $bookName == "") {
            return "Please Enter Correct Name or Id";

        } else if ($id == "" && strlen($bookName) > 0) {
            $query = "SELECT * FROM books WHERE BookName='$bookName'";
            $result = mysqli_query($this->con, $query);
            $numOfRaw = mysqli_num_rows($result);
            if ($numOfRaw > 0) {
                return $result;
            } else {
                return false;
            }


        } else if ($bookName == "" && strlen($id) > 0) {
            $query = "SELECT * FROM books WHERE BookID='$id'";
            $result = mysqli_query($this->con, $query);
            $numOfRaw = mysqli_num_rows($result);
            if ($numOfRaw) {
                return $result;
            } else {
                return false;
            }


        }
    }
}
?>