<?php

require_once '../dbConnection/DBConnection.php';
require_once '../models/Category.php';
class DeleteBook
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();

    }

    public function deleteAllBook($isbnNumber, $category)
    {
//
        $result = $this->backupBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM books WHERE ISBN_Number='$isbnNumber'";
        $query2 = "DELETE FROM $category WHERE ISBN_Number='$isbnNumber'";
        $result2 = $this->con->query($query2);
        $result1 = $this->con->query($query1);
        return array($result1, $result2, $result);
    }
    public function deleteSomeBook($category, $bookID)
    {
        $result1 = $this->backupSomeBookDetails($category, $bookID);
        if ($result1) {
            $query = "DELETE FROM $category WHERE Final_ID='$bookID'";
            $result2 = $this->con->query($query);
            return array($result1, $result2);
        }

    }
    public function restoreAllBook($isbnNumber, $category)
    {
        $result = $this->restoreBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM backupBookDetails WHERE ISBN_Number='$isbnNumber'";
        $query2 = "DELETE FROM backupbook WHERE ISBN_Number='$isbnNumber'";
        $result2 = $this->con->query($query2);
        $result1 = $this->con->query($query1);
        return array($result1, $result2, $result);
    }

    public function restoreSomeBook( $bookID)
    {
        $categoryClassObj=new Category();
        $category=$categoryClassObj->getCategoryNameRelevantToBookID($bookID);
        $result1 = $this->restoreOneBook($category, $bookID);
        if ($result1) {
            $query2 = "DELETE FROM backupbook WHERE Final_ID='$bookID'";
            $result2 = $this->con->query($query2);
            return array($result1, $result2);
        }
        return false;

    }

    public function backupSomeBookDetails($category, $bookID)
    {
        return $this->backupAndRestoreInsertForSubDetailsBooksTable($category, 'books', 'backupbook', 'backupBookDetails', $bookID);
    }


    public function restoreOneBook($category, $bookID)
    {
        return $this->backupAndRestoreInsertForSubDetailsBooksTable('backupbook', 'backupbookdetails', $category, 'books', $bookID);

    }

    public function backupBookDetails($isbnNumber, $category)
    {
        return $this->backupAndRestoreBooksDetails('books', 'backupBookDetails', $category, 'backupbook', $isbnNumber);
    }


    public function restoreBookDetails($isbnNumber, $category)
    {
        return $this->backupAndRestoreBooksDetails('backupBookDetails', 'books', 'backupbook', $category, $isbnNumber);
    }

//('backupbook', 'backupbookdetails', $category, 'books', $bookID);
    public function backupAndRestoreInsertForSubDetailsBooksTable($SelectSubTableName, $SelectMainTableName, $insertBackupSubTableName, $insertBackupMainTableName, $bookID)
    {

        $QuantityCheckQuery = "SELECT COUNT(ISBN_Number) AS row_count,ISBN_Number FROM $SelectSubTableName WHERE ISBN_Number=(SELECT ISBN_Number
        FROM $SelectSubTableName WHERE Final_ID='$bookID')";
        $result1 = $this->con->query($QuantityCheckQuery);
        $row = $result1->fetch_assoc();
        $isbnNumber = $row['ISBN_Number'];
        if ($row['row_count'] == 1) {
            $result1 = $this->selectAndInsertTableData($SelectMainTableName, $insertBackupMainTableName, $isbnNumber);
            $query3 = "DELETE FROM $SelectMainTableName WHERE ISBN_Number='$isbnNumber'";
            $this->con->query($query3);

        }
        $queryCheckForbooksDetail = "SELECT COUNT(ISBN_Number) AS row_count FROM $insertBackupSubTableName WHERE ISBN_Number='$isbnNumber'";
        $resultCheckForbooksDetail = $this->con->query($queryCheckForbooksDetail);
        $rowCheckForbooksDetail = $resultCheckForbooksDetail->fetch_assoc();
        if ($rowCheckForbooksDetail['row_count'] == 0) {
            $this->selectAndInsertTableData($SelectMainTableName, $insertBackupMainTableName, $isbnNumber);
        }
        $query1 = "SELECT * FROM $SelectSubTableName WHERE Final_ID='$bookID'";
        return $this->insertDataToSubTable($query1, $insertBackupSubTableName, $isbnNumber);

    }
    public function selectAndInsertTableData($selectTableName, $insertTableName, $isbnNumber)
    {
        $query1 = "SELECT * FROM $selectTableName WHERE ISBN_Number='$isbnNumber'";
        $result1 = $this->con->query($query1);
        if ($result1 && $result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $bookName = $row['BookName'];
            $authorName = $row['AuthorName'];
            $publisherName = $row['PublisherName'];
            $category = $row['Category'];
            $bookLocation = $row['BookLocation'];
            $description = $row['Description'];

            $query2 = "INSERT INTO $insertTableName (ISBN_Number,BookName,AuthorName,PublisherName,Category,
                               BookLocation,Description) VALUES ('$isbnNumber','$bookName','$authorName', '$publisherName', '$category',
                                                                  '$bookLocation','$description')";
            return $this->con->query($query2);
        }

    }

    public function backupAndRestoreBooksDetails($selectMainTable, $insertMainTable, $selectSubTable, $insertSubTable, $isbnNumber)
    {
        $queryForCheckDataExistsORNot = "SELECT COUNT(ISBN_Number) AS row_count FROM $insertMainTable WHERE ISBN_Number='$isbnNumber'";
        $resultForCheckDataExistsORNot = $this->con->query($queryForCheckDataExistsORNot);
        $rowForCheckDataExistsORNot = $resultForCheckDataExistsORNot->fetch_assoc();
        if ($rowForCheckDataExistsORNot['row_count'] == 0) {
            $this->selectAndInsertTableData($selectMainTable, $insertMainTable, $isbnNumber);
        }
        $query3 = "SELECT * FROM $selectSubTable WHERE ISBN_Number='$isbnNumber'";
        return $this->insertDataToSubTable($query3, $insertSubTable, $isbnNumber);

    }

    public function insertDataToSubTable($query, $insertSubTable, $isbnNumber)
    {
        $result = $this->con->query($query);
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $final_ID = $row['Final_ID'];
                $bookName_ID = $row['BookName_ID'];
                $book_No = $row['Book_No'];
                $availability = $row['Availability'];

                $query1 = "INSERT INTO $insertSubTable (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                $result1 = $this->con->query($query1);

            }
            return $result1;
        } else {
            return false;
        }
    }
}
//$x=new DeleteBook();
//$x->deleteSomeBook("science","SCI/1/1");