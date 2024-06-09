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
        $query = "SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
        $result = mysqli_query($this->con, $query);
        return $result;
    }

    public function getISBNDataFromBackupTable($isbnNumber)
    {
        $query = "SELECT * FROM backupbookdetails WHERE ISBN_Number='$isbnNumber'";
        $result = mysqli_query($this->con, $query);
        return $result;
    }


}