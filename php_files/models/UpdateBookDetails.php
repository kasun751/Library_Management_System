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
                BookName = ?,
                AuthorName = ?,
                PublisherName = ?,
                BookLocation = ?,
                Description = ?
              WHERE
                ISBN_Number = ?";

        $stmt = $this->con->prepare($query);
        $stmt->bind_param("ssssss", $bookName, $authorName, $publisherName, $bookLocation, $description, $isbnNumber);
        $stmt->execute();
        $result = $stmt->affected_rows;
        $stmt->close();
        return $result;
    }
}