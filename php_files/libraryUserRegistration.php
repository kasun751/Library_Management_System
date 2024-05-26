<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';
// Check if the request method is OPTIONS and respond with 200 OK

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $getData = new SqlQuery();
        $result=$getData->createNextUserID();
        $data = array('nextUserID' => $result);
        echo json_encode($data,JSON_UNESCAPED_SLASHES);
        break;

    case "POST":
        $getData = new SqlQuery();
        $firstName=$data['registeredUserFirstName'];
        $lastName=$data['registeredUserLastName'];
        $nic=$data['registeredUserNic'];
        $address=$data['registeredUserAddress'];
        $phoneNumber=$data['registeredUserPhoneNumber'];
        $birthDay=$data['registeredUserBirthDay'];
        $gender=$data['gender'];
        $email=$data['registeredUserEmail'];
        $password=$data['registeredUserPassword'];
        $ConfirmPassword=$data['registeredUserPasswordConfirm'];
        $userID=$data['nextUserID'];

        if(strlen($firstName)>0 && strlen($lastName)>0 && strlen($nic)>0 && strlen($address)>0 && strlen($phoneNumber)>0
            && strlen($birthDay)>0 && strlen($gender)>0 && strlen($email)>0 && strlen($password)>0 && strlen($ConfirmPassword)>0) {
            if($password==$ConfirmPassword){
                $getData-> InsertLibraryUserDetails($userID,$firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password);
            }else{
                $data = array('resultMessage' => 'Password Not Matched');
                echo json_encode($data);
            }


        }

}


