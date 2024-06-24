<?php
require_once '../dbConnection/DBConnection.php';
require_once '../models/SendMail.php';
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

                $email=$row['Email'];
                $password=$row['Password'];
                $userID=$row['UserID'];
                $fName=$row['FirstName'];
                $message = "<p>Thank You For Registering Our Smart Library System.</p>" .
                    "<p>Your Login Details </p>" .
                    "<p>EMAIL:$email</p>" .
                    "<p>USER_ID:$userID </p>".
                    "<p>PASSWORD:$password </p>";
                $sendMail=new SendMail();
                $result=$sendMail->sendMailMessage($email,$fName,"Login Details",$message);
                header("Location: http://localhost:5173/dashboard/" . urlencode($row['UserID']));
            } else {
                echo "Email Not Verified...";
            }
        } else {
            echo "Invalid Verification...";
        }

    }

}