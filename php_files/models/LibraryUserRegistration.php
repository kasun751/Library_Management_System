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
    public function InsertLibraryUserDetails( $firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode,$accountType)
    {
        $resultCheckExistsOrNot = $this->checkExistsOrNot($nic, $phoneNumber, $email);
        if ($resultCheckExistsOrNot == "NicExist") {
            $data = array('resultMessage' => 'Nic Already Exist!');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "PhoneNumberExist") {
            $data = array('resultMessage' => 'Phone Number Already Exist');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "EmailExist") {
            $data = array('resultMessage' => 'Email Already Exist!');
            echo json_encode($data);
        } elseif ($resultCheckExistsOrNot == "queryError") {
            $data = array('resultMessage' => 'Query Failed!');
            echo json_encode($data);
        } else {
            $nextUserID=$this->createNextUserID($accountType);
            $nextUserNo = $this->getLastUser_No($accountType);

            $query1 = "INSERT INTO libraryusersdetails (UserID,User_No,FirstName,LastName,NIC,Address,PhoneNumber,BirthDay,Gender,Email,Password,Verification_Code,Is_Active,AccountType) VALUES ('$nextUserID','$nextUserNo','$firstName', '$lastName', '$nic', '$address', '$phoneNumber','$birthDay','$gender', '$email','$password','$verificationCode',false,'$accountType')";
            $result=$this->con->query($query1);
            if ($result) {
                $response = array(
                    'message' => 'success!',
                    'userID' => $nextUserID
                );
                return $response;
            } else {
                $data = array('resultMessage' =>  $this->con->error);
                echo json_encode($data);
            }
        }

    }

    public function createNextUserID($accountType)
    {
        $lastUserNo = $this->getLastUser_No($accountType);
        $lastTwoDigit = substr(date("Y"), -2);
        switch ($accountType){
            case "Register":
                $NextUserID = "SLMS/REG/" . $lastTwoDigit . "/" .  $lastUserNo;
                break;
            Case "SystemAdmin":
                $NextUserID = "SLMS/ADM/" . $lastTwoDigit . "/" .  $lastUserNo;
                break;
            Case "Librarian":
                $NextUserID = "SLMS/LIB/" . $lastTwoDigit . "/" .  $lastUserNo;
                break;
            Case "LibraryAssistantRegistrar":
                $NextUserID = "SLMS/LAR/" . $lastTwoDigit . "/" .  $lastUserNo;
                break;
            Case "LibraryInformationAssistant":
                $NextUserID = "SLMS/LIA/" . $lastTwoDigit . "/" .  $lastUserNo;
                break;
        }
        return $NextUserID;
    }

    public function getLastUser_No($accountType)
    {
        $query = "SELECT * FROM libraryusersdetails WHERE AccountType='$accountType' ORDER BY User_No DESC LIMIT 1";
        $result = mysqli_query($this->con, $query);
        $nextUserNoData= mysqli_fetch_assoc($result);
        $nextUserNo=null;
        if ($nextUserNoData !== null && isset($nextUserNoData['User_No'])) {
            $nextUserNo = $nextUserNoData['User_No'];
            $nextUserNo++;
        }

        if ($nextUserNo === null) {
            $nextUserNo = 1;
        }
       return $nextUserNo;
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
$x=new LibraryUserRegistration();
$x->getLastUser_No('Register');