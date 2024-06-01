<?php

require_once '../dbConnection/DBConnection.php';
class DeleteBook
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();

    }
    public function deleteAllBook($isbnNumber, $category)
    {
        $query1 = "DELETE FROM books WHERE ISBN_Number='$isbnNumber'";
        $query2 = "DELETE FROM $category WHERE ISBN_Number='$isbnNumber'";
        $result2 = $this->con->query($query2);
        $result1 =$this->con->query($query1);
        return array($result1, $result2);
    }

    public function deleteSomeBook($category, $bookID)
    {
        $query = "DELETE FROM $category WHERE Final_ID='$bookID'";
        $result = $this->con->query($query);
        if ($result !== false) {
            if ($this->con->affected_rows> 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}