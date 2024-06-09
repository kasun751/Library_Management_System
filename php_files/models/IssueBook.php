<?php

require_once '../dbConnection/DBConnection.php';
class IssueBook
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }

    public function setBookAvailability($category, $bookID, $availability)
    {
        $query = "UPDATE $category SET Availability='$availability' WHERE Final_ID='$bookID'";
        $this->con->query($query);
        return $this->con->affected_rows;
    }

    public function updateIsueBooksTable($bookID, $userID, $dateTime, $availability)
    {
        switch ($availability) {
            case "available":

                $query = "DELETE FROM issuebooks WHERE BookID='$bookID' AND UserID='$userID'";
                $this->con->query($query);
                return $this->con->affected_rows;

            case "bookIssued":
                $query = "INSERT INTO issuebooks (BookID,UserID,IssueDateAndTime) VALUES ('$bookID', '$userID','$dateTime')";
                $this->con->query($query);
                return $this->con->affected_rows;


        }
    }
}