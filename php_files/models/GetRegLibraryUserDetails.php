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
        $query = "SELECT * FROM libraryusersdetails WHERE UserID='$userID'";
        $result = $this->con->query($query);
        $raw = $result->fetch_assoc();
        $userFirstname = isset($raw['FirstName']) ? $raw['FirstName'] : '';
        $userLastname = isset($raw['LastName']) ? $raw['LastName'] : '';

        $fullName = $userFirstname . " " . $userLastname;
        $data = array('userName' => $fullName);
        echo json_encode($data);
    }
}