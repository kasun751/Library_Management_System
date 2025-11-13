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
            $query = "SELECT * FROM libraryusersdetails WHERE Email = ?";
            $stmt = $this->con->prepare($query);
            $stmt->bind_param("s", $userIDOrEmail);
        } else {
            $resultOfVerification = $this->isVerify->checkVerification($userIDOrEmail, 0);
            $query = "SELECT * FROM libraryusersdetails WHERE UserID = ?";
            $stmt = $this->con->prepare($query);
            $stmt->bind_param("s", $userIDOrEmail);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $userID = $row['UserID'] ?? null;
            if ($row['Password'] == $password) {
                if ($resultOfVerification) {
                    $data = array(
                        'resultMessage' => 'Login_Success',
                        'userID' => $userID
                    );
                    echo json_encode($data);
                } else {
                    $data = array(
                        'resultMessage' => 'NotVerifiedAccount',
                        'userID' => $userID
                    );
                    echo json_encode($data);
                }
            } else {
                $data = array(
                    'resultMessage' => 'Login details not matched!',
                    'userID' => $userID
                );
                echo json_encode($data);
            }
        } else {
            $data = array(
                'resultMessage' => 'Login details not matched!',
                'userID' => $userIDOrEmail
            );
            echo json_encode($data);
        }

        $stmt->close();
    }

    public function forgotPassword($email)
    {
        $isEmailExistQuery = "SELECT Email, FirstName, Password FROM libraryusersdetails WHERE Email = ?";
        $stmt = $this->con->prepare($isEmailExistQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result1 = $stmt->get_result();

        if ($result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $name = $row['FirstName'];
            $confirmationCode = rand(1000, 9999);
            $message = "<p>FORGOT PASSWORD VERIFICATION CODE: $confirmationCode </p>";
            $sendMailMessage = new SendMail();
            $sendMailMessage->sendMailMessage($email, $name, "Verification Code", $message);

            if ($sendMailMessage) {
                $insertVerificationCode = "UPDATE libraryusersdetails SET Verification_Code = ? WHERE Email = ?";
                $stmtUpdate = $this->con->prepare($insertVerificationCode);
                $stmtUpdate->bind_param("ss", $confirmationCode, $email);
                $stmtUpdate->execute();

                if ($stmtUpdate->affected_rows > 0) {
                    $stmt->close();
                    $stmtUpdate->close();
                    return "verification code sent.";
                } else {
                    $stmt->close();
                    $stmtUpdate->close();
                    return "Failed!";
                }
            } else {
                $stmt->close();
                return "Failed!";
            }
        } else {
            $stmt->close();
            return "Email Not Exist!";
        }
    }

    public function forgotPasswordUpdateDatabase($email, $newPassword, $verificationCode)
    {
        $getVerificationCode = "SELECT Verification_Code FROM libraryusersdetails WHERE Email = ?";
        $stmt = $this->con->prepare($getVerificationCode);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $savedConfirmationCode = $row['Verification_Code'];
            if ($savedConfirmationCode === $verificationCode) {
                $changePassword = "UPDATE libraryusersdetails SET Password = ? WHERE Email = ?";
                $stmtUpdate = $this->con->prepare($changePassword);
                $stmtUpdate->bind_param("ss", $newPassword, $email);
                $stmtUpdate->execute();

                if ($stmtUpdate->affected_rows > 0) {
                    $deleteVerificationCode = "UPDATE libraryusersdetails SET Verification_Code = NULL WHERE Email = ?";
                    $stmtDelete = $this->con->prepare($deleteVerificationCode);
                    $stmtDelete->bind_param("s", $email);
                    $stmtDelete->execute();

                    $stmt->close();
                    $stmtUpdate->close();
                    $stmtDelete->close();
                    return "Password Changed.";
                } else {
                    $stmt->close();
                    $stmtUpdate->close();
                    return "Failed! Password Not Changed.";
                }
            } else {
                $stmt->close();
                return "Verification Code Not matched!!!";
            }
        }
    }
}