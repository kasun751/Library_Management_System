<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $getData = new SqlQuery();
        $result = $getData->createNextUserID();
        $data = array('nextUserID' => $result);
        echo json_encode($data, JSON_UNESCAPED_SLASHES);
        break;

    case "POST":
        $getData = new SqlQuery();
        $firstName = $data['registeredUserFirstName'];
        $lastName = $data['registeredUserLastName'];
        $nic = $data['registeredUserNic'];
        $address = $data['registeredUserAddress'];
        $phoneNumber = $data['registeredUserPhoneNumber'];
        $birthDay = $data['registeredUserBirthDay'];
        $gender = $data['gender'];
        $email = $data['registeredUserEmail'];
        $password = $data['registeredUserPassword'];
        $ConfirmPassword = $data['registeredUserPasswordConfirm'];
        $userID = $data['nextUserID'];
        $verificationCode = sha1($email . time());
        $verification_Url = 'http://localhost:8081/project_01/verify.php?code=' . $verificationCode;

        if (strlen($firstName) > 0 && strlen($lastName) > 0 && strlen($nic) > 0 && strlen($address) > 0 && strlen($phoneNumber) > 0
            && strlen($birthDay) > 0 && strlen($gender) > 0 && strlen($email) > 0 && strlen($password) > 0 && strlen($ConfirmPassword) > 0) {
            if ($password == $ConfirmPassword) {
                $result = $getData->InsertLibraryUserDetails($userID, $firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode);
                if ($result == "success!") {

                    require 'PHPMailer/Exception.php';
                    require 'PHPMailer/PHPMailer.php';
                    require 'PHPMailer/SMTP.php';
                    $mail = new PHPMailer(true);

                    try {
                        $mail->isSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'sajanhirushaportfolio@gmail.com';
                        $mail->Password = 'bqdqrjjerftiaofm';
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                        $mail->Port = 465;

                        //Recipients
                        $mail->setFrom('sajanhirushaportfolio@gmail.com', 'Email Verification');
                        $mail->addAddress($email, $firstName);

                        //Content
                        $mail->isHTML(true);
                        $mail->Subject = "Email Verification";
                        $mail->Body = "<p> Dear" . $firstName . "</p>";
                        $mail->Body .= "<p> Thank You For Signing Up.There is one more step. Click below link to verify your email address in order to activate your account.</p>";
                        $mail->Body .= "<p> " . $verification_Url . "</p>";
                        $mail->Body .= "<p> Thank you.</p>";
                        $mail->send();

                    } catch (Exception $e) {
                        $paragraph_content = "Message could not be sent. ";
                    }
                    $data = array('resultMessage' => 'verificationProcessRunning');
                    echo json_encode($data);

                }

            } else {
                $data = array('resultMessage' => 'Password Not Matched');
                echo json_encode($data);
            }
        } else {
            $data = array('resultMessage' => 'Fill all inputs');
            echo json_encode($data);
        }
}


