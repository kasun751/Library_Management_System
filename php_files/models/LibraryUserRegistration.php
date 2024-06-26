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

    public function InsertLibraryUserDetails($firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode, $accountType)
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
            $nextUserID = $this->createNextUserID($accountType);
            $nextUserNo = $this->getLastUser_No($accountType);

            $query1 = "INSERT INTO libraryusersdetails 
            (UserID, User_No, FirstName, LastName, NIC, Address, PhoneNumber, BirthDay, Gender, Email, Password, Verification_Code, Is_Active, AccountType) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false, ?)";

            $stmt = $this->con->prepare($query1);
            $stmt->bind_param("sssssssssssss", $nextUserID, $nextUserNo, $firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode, $accountType);

            $result = $stmt->execute();
            if ($result) {
                $response = array(
                    'message' => 'success!',
                    'userID' => $nextUserID
                );
                $stmt->close();
                return $response;
            } else {
                $data = array('resultMessage' => $stmt->error);
                $stmt->close();
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
        $query = "SELECT User_No FROM libraryusersdetails WHERE AccountType = ? ORDER BY User_No DESC LIMIT 1";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $accountType);
        $stmt->execute();
        $result = $stmt->get_result();
        $nextUserNoData = $result->fetch_assoc();

        $nextUserNo = null;
        if ($nextUserNoData !== null && isset($nextUserNoData['User_No'])) {
            $nextUserNo = $nextUserNoData['User_No'];
            $nextUserNo++;
        }

        if ($nextUserNo === null) {
            $nextUserNo = 1;
        }

        $stmt->close();
        return $nextUserNo;
    }

    public function checkExistsOrNot($nic, $phoneNumber, $email)
    {

        $query1 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE NIC = ?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $nic);
        $stmt1->execute();
        $result1 = $stmt1->get_result();
        $row1 = $result1->fetch_assoc();
        $stmt1->close();


        $query2 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE PhoneNumber = ?";
        $stmt2 = $this->con->prepare($query2);
        $stmt2->bind_param("i", $phoneNumber);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        $row2 = $result2->fetch_assoc();
        $stmt2->close();

        $query3 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE Email = ?";
        $stmt3 = $this->con->prepare($query3);
        $stmt3->bind_param("s", $email);
        $stmt3->execute();
        $result3 = $stmt3->get_result();
        $row3 = $result3->fetch_assoc();
        $stmt3->close();

        if ($result1 && $result2 && $result3) {
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
//$x=new LibraryUserRegistration();
//$x->getLastUser_No('Register');