<?php
require_once '../DBConnection/DBConnection.php';
include '../models/IsVerify.php';
class LibraryUserLogin
{
    private $con;
    private $isVerify;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
        $this->isVerify=new IsVerify();
    }
    public function loginDetailsValidate($userIDOrEmail, $password)
    {
        if (strpos($userIDOrEmail, '@gmail.com') !== false) {
            $resultOfVerification = $this->isVerify->checkVerification($userIDOrEmail, 1);
            $query = "SELECT * FROM libraryusersdetails WHERE Email = '$userIDOrEmail'";
            $result1 = $this->con->query($query);
            $row = $result1->fetch_assoc();
            $userID = $row['UserID'];

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
                $data = array('resultMessage' => 'Login details not matched',
                    'userID' => $userID);
                echo json_encode($data);
            }
        } else {
            $data = array('resultMessage' => 'Login details not matched',
                'userID' => $userID);
            echo json_encode($data);
        }

    }
}