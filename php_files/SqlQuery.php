<?php
include 'DBConnection.php';

class SqlQuery
{
    private $con;

    public function __construct()
    {

        $DBobj = new DBConnection;
        $this->con = $DBobj->dbConnect();
    }

    public function InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $description, $book_No)
    {

        $query1 = "INSERT INTO books (ISBN_Number,BookName, AuthorName, PublisherName,Category,AllBookQty,Description) VALUES ('$isbnNumber', '$bookName', '$authorName', '$publisherName ','$category','$qty', '$description')";
        $result1 = $this->con->query($query1);
        $uppercaseString = strtoupper($category);
        $charArray = str_split($uppercaseString);
        for ($i = 1; $i <= $qty; $i++) {
            $final_ID = $charArray[0] . $charArray[1] . $charArray[2] . "/" . $isbnNumber . "/" . $book_No;
            $query2 = "INSERT INTO $category (ISBN_Number,Book_No,Final_ID) VALUES ('$isbnNumber', '$book_No','$final_ID')";
            $result2 = $this->con->query($query2);
            $book_No++;
        }

        return array($result1, $result2);
    }

    public function InsertCategoryTableDetails($isbnNumber, $book_No, $category, $qty)
    {
        $query = "INSERT INTO $category (ISBN_Number,BookName, AuthorName, PublisherName,Category,AllBookQty,Description) VALUES ('$isbnNumber', '$bookName', '$authorName', '$publisherName ','$category','$qty', '$description')";
        $result = $this->con->query($query);
        return $result;
    }

    public function addMoreQty($Qty, $ISBN_Number)
    {
        $getData = new SqlQuery();
        $result = $getData->getISBNData($ISBN_Number);
        $raw = $result->fetch_assoc();
        $isbnNumber = $ISBN_Number;
        $category = $raw['Category'];
        $uppercaseString = strtoupper($category);
        $charArray = str_split($uppercaseString);
        $book_No = $getData->getLastBook_No($category, $isbnNumber) + 1;

        for ($i = 1; $i <= $Qty; $i++) {
            $final_ID = $charArray[0] . $charArray[1] . $charArray[2] . "/" . $isbnNumber . "/" . $book_No;
            $query2 = "INSERT INTO $category (ISBN_Number,Book_No,Final_ID) VALUES ('$isbnNumber', '$book_No','$final_ID')";
            $result2 = $this->con->query($query2);
            $book_No++;
        }
        $query="SELECT COUNT(*) AS count FROM $category WHERE ISBN_Number='$isbnNumber'";
        $result = $this->con->query($query);
        $count = $result->fetch_assoc()['count'];
        $queryNext="UPDATE books SET AllBookQty ='$count'  WHERE ISBN_NUmber='$isbnNumber'";
        $this->con->query($queryNext);
        return $result2;
    }

    public function getLastBook_No($category, $isbnNumber)
    {

        $query = "SELECT Book_No FROM $category WHERE ISBN_Number='$isbnNumber' ORDER BY Book_No DESC LIMIT 1";
        $result = mysqli_query($this->con, $query);
        $row = mysqli_fetch_assoc($result);
        return $row['Book_No'];

    }

    public function getISBNData($isbnNumber)
    {

        $query = "SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
        $result = mysqli_query($this->con, $query);
        return $result;
    }

    public function runSqlUpdateQuery($name, $authorName)
    {
        $query = "UPDATE books SET AuthorName='$authorName' WHERE BookName='$name'";
        $this->con->query($query);
        return $this->con->affected_rows;
    }

    public function createNewCategoryTable($newCategory)
    {
        $query = "CREATE TABLE $newCategory (
    Final_ID varchar(255) ,
    ISBN_Number varchar(255) NOT NULL ,
    Book_No int(20) NOT NULL , 
    PRIMARY KEY (Final_ID)
)";
        $result = mysqli_query($this->con, $query);
        return $result;
    }

    public function CategoryTableUpdate($category)
    {
        $query1 = "INSERT INTO category (Category_Name) VALUES ('$category')";
        $result1 = $this->con->query($query1);
        $query2 = "SELECT Category_No FROM category WHERE Category_Name='$category'";
        $result2 = $this->con->query($query2);
        $row = mysqli_fetch_assoc($result2);
        $uppercaseString = strtoupper($category);
        $charArray = str_split($uppercaseString);
        $final_ID = $charArray[0] . $charArray[1] . $charArray[2] . "/" . $row['Category_No'];
        $query3 = "UPDATE category SET Category_ID ='$final_ID'  WHERE Category_Name='$category'";
        $result3 = $this->con->query($query3);
        return array($result1, $result3);
    }

    public function getCategoryList()
    {
        $query = "SELECT DISTINCT Category_Name FROM category";
        $result = $this->con->query($query);
        $categoryList = array();
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $categoryList[] = $row;
        }
            echo json_encode($categoryList);
        }else {
            echo json_encode(array('error' => 'Failed to fetch categories'));
        }
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