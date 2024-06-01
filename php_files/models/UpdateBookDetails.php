<?php
require_once '../dbConnection/DBConnection.php';
class UpdateBookDetails
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function updateBookDetails($isbnNumber, $bookName, $authorName, $publisherName, $bookLocation, $description)
    {
        $query = "UPDATE books SET
    BookName = '$bookName',
    AuthorName = '$authorName',
    PublisherName = '$publisherName',
    BookLocation = '$bookLocation',
    Description = '$description'
    WHERE
    ISBN_Number= '$isbnNumber'";
        $result = $this->con->query($query);;
        return $result;
    }

}