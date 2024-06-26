<?php
require_once '../dbConnection/DBConnection.php';
class GetIsbnData
{
    private $isbnData;
    private $con;

    public function __construct($isbnData=null)
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
        $this->isbnData = $isbnData;
    }

    public function getISBNData($isbnNumber)
    {
        $query = "SELECT * FROM books WHERE ISBN_Number = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $isbnNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }
    public function getISBNDataFromBackupTable($isbnNumber)
    {
        $query = "SELECT * FROM backupbookdetails WHERE ISBN_Number = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $isbnNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }
}