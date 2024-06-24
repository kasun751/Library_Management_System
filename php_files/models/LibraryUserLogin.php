<?php
require_once '../DBConnection/DBConnection.php';
include '../models/IsVerify.php';
include '../models/SendMail.php';

class LibraryUserLogin
{
    private $con;
    private $isVerify;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
        $this->isVerify = new IsVerify();
    }

    public function loginDetailsValidate($userIDOrEmail, $password)
    {
        if (strpos($userIDOrEmail, '@gmail.com') !== false) {
            $resultOfVerification = $this->isVerify->checkVerification($userIDOrEmail, 1);
            $query = "SELECT * FROM libraryusersdetails WHERE Email = '$userIDOrEmail'";
            $result1 = $this->con->query($query);
            $row = $result1->fetch_assoc();
            $userID = $row['UserID'] ?? null;

        } else {
            $resultOfVerification = $this->isVerify->checkVerification($userIDOrEmail, 0);
            $query = "SELECT * FROM libraryusersdetails WHERE UserID = '$userIDOrEmail'";
            $userID = $userIDOrEmail;
        }

        $result = $this->con->query($query);
        if ($this->con->affected_rows > 0) {
            $row = $result->fetch_assoc();
            if ($row['Password'] == $password) {
                if ($resultOfVerification) {
                    $data = array(
                        'resultMessage' => 'Login_Success',
                        'userID' => $userID

                    );
                    echo json_encode($data);
                } else {
                    $data = array('resultMessage' => 'NotVerifiedAccount',
                        'userID' => $userID
                    );
                    echo json_encode($data);
                }


            } else {
                $data = array('resultMessage' => 'Login details not matched!',
                    'userID' => $userID);
                echo json_encode($data);
            }
        } else {
            $data = array('resultMessage' => 'Login details not matched!',
                'userID' => $userID);
            echo json_encode($data);
        }
    }

    public function forgotPassword($email)
    {
        $isEmailExistQuery = "SELECT Email,FirstName,Password FROM libraryusersdetails WHERE Email='$email'";
        $result1 = $this->con->query($isEmailExistQuery);
        if ($result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $name = $row['FirstName'];
            $confirmationCode = rand(1000, 9999);
            $message = "<p>FORGOT PASSWORD VERIFICATION CODE:$confirmationCode </p>";
            $sendMailMessage = new SendMail();
            $sendMailMessage->sendMailMessage($email, $name, "Verification Code", $message);
            if ($sendMailMessage) {
                $insertVerificationCode = "UPDATE libraryusersdetails SET Verification_Code='$confirmationCode' WHERE Email='$email' ";
                if ($this->con->query($insertVerificationCode)) {
                    return "verification code sent.";
                }
            } else {
                return "Failed!";
            }


        } else {
            return "Email Not Exist!";
        }
    }

    public function forgotPasswordUpdateDatabase($email, $newPassword,$verificationCode)
    {
        $getVerificationCode="SELECT Verification_Code FROM libraryusersdetails WHERE Email='$email'";
        $result=$this->con->query($getVerificationCode);
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $savedConfirmationCode=$row['Verification_Code'];
            if ($savedConfirmationCode===$verificationCode){
                $changePassword = "UPDATE libraryusersdetails SET Password='$newPassword' WHERE Email='$email' ";

                if ($this->con->query($changePassword)) {
                    $deleteVerificationCode = "UPDATE libraryusersdetails SET Verification_Code=NULL WHERE Email='$email' ";
                    $this->con->query($deleteVerificationCode);
                    return "Password Changed.";
                } else {
                    return "Failed! Password Not Changed.";
                }
            }else{
                return "Verification Code Not matched!!!";
            }
        }
    }
}