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
        $query = "";
        switch ($checkParaForIDOrEmail) {
            case 0:
                $query = "SELECT * FROM libraryusersdetails WHERE UserID = ?";
                break;
            case 1:
                $query = "SELECT * FROM libraryusersdetails WHERE Email = ?";
                break;
        }

        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (isset($row['Is_Active']) && $row['Is_Active']) {
                $userID = $row['UserID'];
                $resultArray = array(
                    "userID" => $userID,
                );
                return $resultArray;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}