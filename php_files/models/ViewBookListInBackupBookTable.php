<?php
require_once '../dbConnection/DBConnection.php';
class ViewBookListInBackupBookTable
{
    private $con;
    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function getBookList()
    {
        $query = "SELECT * FROM backupbook ORDER BY BookName_ID DESC LIMIT 10";
        $result = $this->con->query($query);
        return $result;
    }

    public function getBookDetails($isbnNumber)
    {
        $query = "SELECT * FROM backupbook WHERE ISBN_Number=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $isbnNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result;
    }
}