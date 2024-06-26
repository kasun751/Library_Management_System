<?php

require_once '../dbConnection/DBConnection.php';
class GetRegLibraryUserDetails
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function getUserIDDetails($userID)
    {
        $query = "SELECT * FROM libraryusersdetails WHERE UserID = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $raw = $result->fetch_assoc();
        if ($raw) {
            $userFirstname = isset($raw['FirstName']) ? $raw['FirstName'] : '';
            $userLastname = isset($raw['LastName']) ? $raw['LastName'] : '';

            $fullName = $userFirstname . " " . $userLastname;
            $data = array('userName' => $fullName);
        } else {
            $data = array('userName' => '');
        }
        echo json_encode($data);
    }
}