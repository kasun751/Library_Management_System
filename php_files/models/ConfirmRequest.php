<?php

require_once '../dbConnection/DBConnection.php';

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

    public function validateConfirmtionCode($userID, $confirmationCode)
    {

        $query = "SELECT ConfirmationCode FROM requests WHERE UserID='$userID'";
        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        if ($confirmationCode === $row['ConfirmationCode']) {
            return true;
        }
        return false;
    }


    public function issueRequestedBook($userID, $confirmationCode, $category, $bookID)
    {
        date_default_timezone_set('Asia/Colombo');
        $issuedDateTime = date('Y-m-d H:i:s');
        $result = $this->validateConfirmtionCode($userID, $confirmationCode);
        if ($result) {
            $query = "INSERT INTO issuebooks (BookID,UserID,IssueDateAndTime) VALUES ('$bookID', '$userID','$issuedDateTime')";
            $resultNew=$this->con->query($query);
            $query1 = "UPDATE $category SET Availability = 'bookIssued' WHERE Final_ID='$bookID'";
            $result1 = $this->con->query($query1);
            if ($result1 && $resultNew) {
                $query2 = "DELETE FROM requests WHERE UserID='$userID'";
                $result2 = $this->con->query($query2);
                if ($result2) {
                    $newUserID = str_replace('/', '_', $userID);
                    $query3 = "DROP EVENT IF EXISTS delete_request_$newUserID";
                    $result3 = $this->con->query($query3);
                    return $result3;
                }
            }
        }

        return false;
    }

}

//$obj = new ConfirmRequest();
//$obj->issueRequestedBook("SLMS/24/2","7948","scietv","SCIE/1/2");