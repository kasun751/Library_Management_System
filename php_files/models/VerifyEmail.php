<?php
require_once '../dbConnection/DBConnection.php';
class VerifyEmail
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function verifyAccount($verificationCode)
    {
        $query = "SELECT * FROM libraryusersdetails WHERE Verification_Code = '$verificationCode'";
        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        $numOfRaw = $this->con->affected_rows;
        if ($numOfRaw == 1) {
            $query2 = "UPDATE libraryusersdetails SET Is_Active = true, Verification_Code=NULL WHERE Verification_Code = '$verificationCode' LIMIT 1";
            $result2 = $this->con->query($query2);
            $numOfRaw2 = $this->con->affected_rows;
            if ($numOfRaw2 == 1) {
                echo "Email Verified Successfully...";
            } else {
                echo "Email Not Verified...";
            }
        } else {
            echo "Invalid Verification...";
        }

    }

}