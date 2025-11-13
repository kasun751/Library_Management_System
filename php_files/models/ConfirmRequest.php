<?php

require_once '../dbConnection/DBConnection.php';
include '../models/IssueBook.php';
class ConfirmRequest
{
    private $con;
    private $issueBookObj;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
        $this->issueBookObj=new IssueBook();
    }
    public function validateConfirmationCode($userID, $confirmationCode)
    {
        $query = "SELECT ConfirmationCode FROM requests WHERE UserID=?";

        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $userID);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row && $confirmationCode === $row['ConfirmationCode']) {
            return true;
        } else {
            return false;
        }
    }
    public function issueRequestedBook($userID, $confirmationCode, $category, $bookID)
    {
        date_default_timezone_set('Asia/Colombo');
        $issuedDateTime = date('Y-m-d H:i:s');
        $isValidConfirmation = $this->validateConfirmationCode($userID, $confirmationCode);

        if ($isValidConfirmation) {
            $query1 = "INSERT INTO issuebooks (BookID, UserID, IssueDateAndTime) VALUES (?, ?, ?)";
            $stmt1 = $this->con->prepare($query1);
            $stmt1->bind_param("sss", $bookID, $userID, $issuedDateTime);
            $result1 = $stmt1->execute();
            $query2 = "UPDATE $category SET Availability = 'bookIssued' WHERE Final_ID = ?";

            $stmt2 = $this->con->prepare($query2);
            $stmt2->bind_param("s", $bookID);
            $result2 = $stmt2->execute();

            if ($result1 && $result2) {
                $query3 = "DELETE FROM requests WHERE UserID = ?";
                $stmt3 = $this->con->prepare($query3);
                $stmt3->bind_param("s", $userID);
                $result3 = $stmt3->execute();
                if ($result3) {
                    $newUserID = str_replace('/', '_', $userID);
                    $query4 = "DROP EVENT IF EXISTS delete_request_$newUserID";
                    $result4 = $this->con->query($query4);
                    return $result4;
                }
            }
        }
        return false;
    }

}

//$obj = new ConfirmRequest();
//$obj->issueRequestedBook("SLMS/24/2","7948","scietv","SCIE/1/2");