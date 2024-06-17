<?php

require_once '../dbConnection/DBConnection.php';
require_once '../models/SendMail.php';

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
                $result1 = $this->con->query($query);
                if ($result1) {
                    $getUserMailQuery = "SELECT Email,FirstName,LastName FROM libraryusersdetails WHERE UserID='$userID'";
                    $resultUserMailQuery = $this->con->query($getUserMailQuery);
                    $row = $resultUserMailQuery->fetch_assoc();
                    $email = $row['Email'];
                    $fName = $row['FirstName'];
                    $lName = $row['LastName'];
                    $fullName = $fName . " " . $lName;
                    $subject = "Book Issued.";
                    $issueDateAndTime = $dateTime;

                    $date = new DateTime($issueDateAndTime);
                    $date->modify('+7 days');
                    $expirationDate = $date->format('Y-m-d H:i:s');
                    $message = "<p>Thank You For Borrowing Book.</p>" .
                        "<p>Please Returned Book Before Expiration Date And Time  </p>" .
                        "<p>Expiration Date And Time:$expirationDate </p>";
                    $sendMail = new SendMail();
                    $result = $sendMail->sendMailMessage($email, $fullName, $subject, $message);
                    return $result;
                }
        }
    }


}
//$x=new IssueBook();
//$x->updateIsueBooksTable("SCI/1/1","SLMS/24/1","2024-06-16 23:20:58","bookIssued");