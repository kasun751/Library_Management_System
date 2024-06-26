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
        $query = "SELECT * FROM libraryusersdetails WHERE Verification_Code = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $verificationCode);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $stmt->close();

            $query2 = "UPDATE libraryusersdetails SET Is_Active = true, Verification_Code = NULL WHERE Verification_Code = ? LIMIT 1";
            $stmt2 = $this->con->prepare($query2);
            $stmt2->bind_param("s", $verificationCode);
            $stmt2->execute();

            if ($stmt2->affected_rows == 1) {
                $stmt2->close();

                $email = $row['Email'];
                $userID = $row['UserID'];
                $fName = $row['FirstName'];
                $password = $row['Password'];
                $message = "<p>Thank You For Registering Our Smart Library System.</p>" .
                    "<p>Your Login Details </p>" .
                    "<p>EMAIL: $email</p>" .
                    "<p>USER_ID: $userID</p>" .
                    "<p>PASSWORD: $password</p>";
                $sendMail = new SendMail();
                $sendMail->sendMailMessage($email, $fName, "Login Details", $message);

                header("Location: http://localhost:5173/dashboard/" . urlencode($userID));
                exit();
            } else {
                $stmt2->close();
                echo "Email Not Verified...";
            }
        } else {
            $stmt->close();
            echo "Invalid Verification...";
        }
    }
}