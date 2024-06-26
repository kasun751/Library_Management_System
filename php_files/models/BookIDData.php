<?php

require_once '../dbConnection/DBConnection.php';
class BookIDData
{
    private $con;
    public function __construct()
    {

        $DBobj = new DBConnection;
        $this->con = $DBobj->dbConnect();
    }
    public function getBookIdCategory($bookId)
    {
        $parts = explode("/", $bookId);
        $part1 =$parts[0];
        $lowercaseString = strtolower($part1);
        $categoryTableQuery = "SELECT Category_Name FROM category";
        $stmt = $this->con->prepare($categoryTableQuery);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $categoryName = $row['Category_Name'];
                $charArray = str_split($categoryName);
                if (count($charArray) >= 3) {
                    $part1Fromdatabase = $charArray[0] . $charArray[1] . $charArray[2];

                } else {
                    $part1Fromdatabase = $charArray[0] . $charArray[1];
                }
                if ($lowercaseString === strtolower($part1Fromdatabase)) {
                    $stmt->close();
                    return $categoryName;
                }
            }
        }
        $stmt->close();
        return null;
    }

    public function getBookIdData($category, $bookId)
    {
        $query = "SELECT * FROM $category WHERE Final_ID=? ORDER BY Book_No DESC LIMIT 1";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $bookId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
        return $row;
    }

}
//$x= new BookIDData();
//$result=$x->getBookIdCategory("FIC/4/1");
//echo $result;