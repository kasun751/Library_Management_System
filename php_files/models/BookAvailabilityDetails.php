<?php

require_once '../dbConnection/DBConnection.php';
class BookAvailabilityDetails
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection;
        $this->con = $DBobj->dbConnect();
    }
    public function getAvailableBooksList($category, $isbnNumber)
    {
        $query = "SELECT Final_ID,ISBN_Number FROM $category WHERE ISBN_Number='$isbnNumber' AND Availability='available'";
        $result = $this->con->query($query);
        return $result;
    }
}