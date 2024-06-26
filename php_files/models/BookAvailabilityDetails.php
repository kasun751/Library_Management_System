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
        $query = "SELECT Final_ID, ISBN_Number FROM $category WHERE ISBN_Number = ? AND Availability = 'available'";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $isbnNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result;
    }

}