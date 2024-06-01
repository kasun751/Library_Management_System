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
        $part1 = $parts[0];
        $lowercaseString = strtolower($part1);
        $categoryTableQuery = "SELECT Category_Name FROM category";
        $result = mysqli_query($this->con, $categoryTableQuery);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $categoryName = $row['Category_Name'];
                $charArray = str_split($categoryName);
                if (count($charArray) >= 3) {
                    $part1Fromdatabase = $charArray[0] . $charArray[1] . $charArray[2];
                } else {
                    $part1Fromdatabase = $charArray[0] . $charArray[1];

                }
                if ($lowercaseString === $part1Fromdatabase) {
                    return $categoryName;
                }
            }
        } else {
            return null;
        }
        return null;
    }

    public function getBookIdData($category, $bookId)
    {
        $query = "SELECT * FROM $category WHERE Final_ID='$bookId' ORDER BY Book_No DESC LIMIT 1";
        $result = $this->con->query($query);
        $row = mysqli_fetch_assoc($result);
        return $row;
    }
}