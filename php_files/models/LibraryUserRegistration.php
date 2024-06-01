<?php
require_once '../dbConnection/DBConnection.php';
class LibraryUserRegistration
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function InsertLibraryUserDetails($userID, $firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode)
    {
        $resultCheckExistsOrNot = $this->checkExistsOrNot($nic, $phoneNumber, $email);
        if ($resultCheckExistsOrNot == "NicExist") {
            $data = array('resultMessage' => 'NicExist');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "PhoneNumberExist") {
            $data = array('resultMessage' => 'PhoneNumberExist');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "EmailExist") {
            $data = array('resultMessage' => 'EmailExist');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "queryError") {
            $data = array('resultMessage' => 'QueryFailed');
            echo json_encode($data);
        } else {
            $query1 = "INSERT INTO libraryusersdetails (UserID,FirstName,LastName,NIC,Address,PhoneNumber,BirthDay,Gender,Email,Password,Verification_Code,Is_Active) VALUES ('$userID','$firstName', '$lastName', '$nic', '$address', '$phoneNumber','$birthDay','$gender', '$email','$password','$verificationCode',false)";
            if ($this->con->query($query1)) {
                return "success!";
            } else {
                $data = array('resultMessage' => 'QueryFailed');
                echo json_encode($data);
            }
        }

    }

    public function createNextUserID()
    {
        $lastUserNo = $this->getLastUser_No();
        if ($lastUserNo === null || !isset($lastUserNo['User_No'])) {
            $user_No = 1;
        } else {
            $PreUser_No = $this->getLastUser_No()['User_No'];
            $user_No = $PreUser_No + 1;
        }
        $lastTwoDigit = substr(date("Y"), -2);
        $NextUserID = "SLMS/" . $lastTwoDigit . "/" . $user_No;
        return $NextUserID;
    }

    public function getLastUser_No()
    {
        $query = "SELECT * FROM libraryusersdetails ORDER BY User_No DESC LIMIT 1";
        $result = mysqli_query($this->con, $query);
        return mysqli_fetch_assoc($result);
    }

    public function checkExistsOrNot($nic, $phoneNumber, $email)
    {
        $query1 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE NIC = '$nic'";
        $query2 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE PhoneNumber = '$phoneNumber'";
        $query3 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE Email = '$email'";
        $result1 = $this->con->query($query1);
        $result2 = $this->con->query($query2);
        $result3 = $this->con->query($query3);

        if ($result1 && $result2 && $result3) {
            $row1 = $result1->fetch_assoc();
            $row2 = $result2->fetch_assoc();
            $row3 = $result3->fetch_assoc();

            if ($row1['count'] > 0) {
                return "NicExist";
            } elseif ($row2['count'] > 0) {
                return "PhoneNumberExist";
            } elseif ($row3['count'] > 0) {
                return "EmailExist";
            } else {
                return "validData";
            }
        } else {
            return "queryError";
        }

    }
}