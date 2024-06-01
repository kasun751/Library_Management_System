<?php
require_once '../dbConnection/DBConnection.php';
class IsVerify
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function checkVerification($userID, $checkParaForIDOrEmail)
    {

        switch ($checkParaForIDOrEmail) {
            case 0:
                $query = "SELECT * FROM libraryusersdetails WHERE UserID = '$userID'";
                break;
            case 1:
                $query = "SELECT * FROM libraryusersdetails WHERE Email = '$userID'";
                break;
        }

        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        if ($row['Is_Active']) {
            return true;
        } else {
            return false;
        }
    }
}