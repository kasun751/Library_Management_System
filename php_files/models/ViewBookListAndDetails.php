<?php
require_once '../dbConnection/DBConnection.php';
class ViewBookListAndDetails
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function getBookList()
    {
        $query = "SELECT * FROM books ORDER BY ISBN_Number DESC LIMIT 10";
        $result = $this->con->query($query);
        return $result;
    }

    public function getBookDetails($bookDetails)
    {
        $searchPattern="%".$bookDetails."%";
        $query = "SELECT * FROM books WHERE BookName LIKE '$searchPattern'";
        $result = $this->con->query($query);
        return $result;
    }
}