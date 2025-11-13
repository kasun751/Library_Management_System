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
        $query = "UPDATE $category SET Availability=? WHERE Final_ID=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("ss", $availability, $bookID);
        $stmt->execute();

        return $stmt->affected_rows;
    }
    public function updateIsueBooksTable($bookID, $userID, $dateTime, $availability)
    {
        switch ($availability) {
            case "available":
                $query = "DELETE FROM issuebooks WHERE BookID=? AND UserID=?";
                $stmt = $this->con->prepare($query);
                $stmt->bind_param("ss", $bookID, $userID);
                $stmt->execute();
                return $stmt->affected_rows;

            case "bookIssued":
                $query = "INSERT INTO issuebooks (BookID, UserID, IssueDateAndTime) VALUES (?, ?, ?)";
                $stmt = $this->con->prepare($query);
                $stmt->bind_param("sss", $bookID, $userID, $dateTime);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    $getUserMailQuery = "SELECT Email, FirstName, LastName FROM libraryusersdetails WHERE UserID=?";
                    $stmtGetUserMail = $this->con->prepare($getUserMailQuery);
                    $stmtGetUserMail->bind_param("s", $userID);
                    $stmtGetUserMail->execute();
                    $resultUserMailQuery = $stmtGetUserMail->get_result();

                    if ($resultUserMailQuery->num_rows > 0) {
                        $row = $resultUserMailQuery->fetch_assoc();
                        $email = $row['Email'];
                        $fName = $row['FirstName'];
                        $lName = $row['LastName'];
                        $fullName = $fName . " " . $lName;
                        $subject = "Book Issued.";

                        $date = new DateTime($dateTime);
                        $date->modify('+7 days');
                        $expirationDate = $date->format('Y-m-d H:i:s');

                        $message = "<p>Thank You For Borrowing Book.</p>" .
                            "<p>Please Return Book Before Expiration Date And Time</p>" .
                            "<p>Expiration Date And Time: $expirationDate</p>";

                        $sendMail = new SendMail();
                        $result = $sendMail->sendMailMessage($email, $fullName, $subject, $message);
                        return $result;
                    }
                }
        }
    }
}
//$x=new IssueBook();
//$x->updateIsueBooksTable("SCI/1/1","SLMS/24/1","2024-06-16 23:20:58","bookIssued");