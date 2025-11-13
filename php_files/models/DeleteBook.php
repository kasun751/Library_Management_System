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
        $result = $this->backupBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM books WHERE ISBN_Number = ?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $isbnNumber);
        $result1 = $stmt1->execute();
        $query2 = "DELETE FROM $category WHERE ISBN_Number = ?";
        $stmt2 = $this->con->prepare($query2);
        $stmt2->bind_param("s", $isbnNumber);
        $result2 = $stmt2->execute();

        return array($result1, $result2, $result);
    }
    public function deleteSomeBook($category, $bookID)
    {
        $result1 = $this->backupSomeBookDetails($category, $bookID);
        if ($result1) {
            $query = "DELETE FROM $category WHERE Final_ID = ?";
            $stmt = $this->con->prepare($query);
            $stmt->bind_param("s", $bookID);
            $result2 = $stmt->execute();
            return array($result1, $result2);
        }
        return array($result1, false);
    }

    public function restoreAllBook($isbnNumber, $category)
    {
        $result = $this->restoreBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM backupBookDetails WHERE ISBN_Number = ?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $isbnNumber);
        $result1 = $stmt1->execute();

        $query2 = "DELETE FROM backupbook WHERE ISBN_Number = ?";
        $stmt2 = $this->con->prepare($query2);
        $stmt2->bind_param("s", $isbnNumber);
        $result2 = $stmt2->execute();
        return array($result1, $result2, $result);
    }

    public function restoreSomeBook($bookID)
    {
        $categoryClassObj = new Category();
        $category = $categoryClassObj->getCategoryNameRelevantToBookID($bookID);
        $result1 = $this->restoreOneBook($category, $bookID);

        if ($result1) {
            $query2 = "DELETE FROM backupbook WHERE Final_ID = ?";
            $stmt2 = $this->con->prepare($query2);
            $stmt2->bind_param("s", $bookID);
            $result2 = $stmt2->execute();
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
    public function backupAndRestoreInsertForSubDetailsBooksTable($SelectSubTableName, $SelectMainTableName, $insertBackupSubTableName, $insertBackupMainTableName, $bookID)
    {
        $QuantityCheckQuery = "SELECT COUNT(ISBN_Number) AS row_count, ISBN_Number FROM $SelectSubTableName WHERE ISBN_Number = (SELECT ISBN_Number FROM $SelectSubTableName WHERE Final_ID = ?)";
        $stmt1 = $this->con->prepare($QuantityCheckQuery);
        $stmt1->bind_param("s", $bookID);
        $stmt1->execute();
        $result1 = $stmt1->get_result();
        $row = $result1->fetch_assoc();

        if ($row['row_count'] == 1) {
            $this->selectAndInsertTableData($SelectMainTableName, $insertBackupMainTableName, $row['ISBN_Number']);

            $query3 = "DELETE FROM $SelectMainTableName WHERE ISBN_Number = ?";
            $stmt3 = $this->con->prepare($query3);
            $stmt3->bind_param("s", $row['ISBN_Number']);
            $stmt3->execute();
        }

        $queryCheckForbooksDetail = "SELECT COUNT(ISBN_Number) AS row_count FROM $insertBackupSubTableName WHERE ISBN_Number = ?";
        $stmtCheckForbooksDetail = $this->con->prepare($queryCheckForbooksDetail);
        $stmtCheckForbooksDetail->bind_param("s", $row['ISBN_Number']);
        $stmtCheckForbooksDetail->execute();
        $resultCheckForbooksDetail = $stmtCheckForbooksDetail->get_result();
        $rowCheckForbooksDetail = $resultCheckForbooksDetail->fetch_assoc();

        if ($rowCheckForbooksDetail['row_count'] == 0) {
            $this->selectAndInsertTableData($SelectMainTableName, $insertBackupMainTableName, $row['ISBN_Number']);
        }

        $query1 = "SELECT * FROM $SelectSubTableName WHERE Final_ID=?";
        return $this->insertDataToSubTable($query1, $insertBackupSubTableName, $row['ISBN_Number'],$bookID,1);
    }

    public function selectAndInsertTableData($selectTableName, $insertTableName, $isbnNumber)
    {
        $query1 = "SELECT * FROM $selectTableName WHERE ISBN_Number = ?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $isbnNumber);
        $stmt1->execute();
        $result1 = $stmt1->get_result();

        if ($result1 && $result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $bookName = $row['BookName'];
            $authorName = $row['AuthorName'];
            $publisherName = $row['PublisherName'];
            $category = $row['Category'];
            $bookLocation = $row['BookLocation'];
            $description = $row['Description'];

            $query2 = "INSERT INTO $insertTableName (ISBN_Number, BookName, AuthorName, PublisherName, Category, BookLocation, Description) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt2 = $this->con->prepare($query2);
            $stmt2->bind_param("sssssss", $isbnNumber, $bookName, $authorName, $publisherName, $category, $bookLocation, $description);
            return $stmt2->execute();
        }
        return false;
    }

    public function backupAndRestoreBooksDetails($selectMainTable, $insertMainTable, $selectSubTable, $insertSubTable, $isbnNumber)
    {
        $queryForCheckDataExistsORNot = "SELECT COUNT(ISBN_Number) AS row_count FROM $insertMainTable WHERE ISBN_Number = ?";
        $stmtCheck = $this->con->prepare($queryForCheckDataExistsORNot);
        $stmtCheck->bind_param("s", $isbnNumber);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();
        $rowCheck = $resultCheck->fetch_assoc();

        if ($rowCheck['row_count'] == 0) {
            $this->selectAndInsertTableData($selectMainTable, $insertMainTable, $isbnNumber);
        }

        $querySelectSubTable = "SELECT * FROM $selectSubTable WHERE ISBN_Number=?";
        return $this->insertDataToSubTable($querySelectSubTable, $insertSubTable, $isbnNumber,null,0);
    }

    public function insertDataToSubTable($query, $insertSubTable, $isbnNumber,$bookID,$filterPara)
    {
        if($filterPara===0){
            $stmtSelect = $this->con->prepare($query);
            $stmtSelect->bind_param("s", $isbnNumber);
            $stmtSelect->execute();
            $result = $stmtSelect->get_result();
        }
        if($filterPara===1){
            $stmtSelect = $this->con->prepare($query);
            $stmtSelect->bind_param("s", $bookID);
            $stmtSelect->execute();
            $result = $stmtSelect->get_result();
        }

        if ($result && $result->num_rows > 0) {
            $queryInsert = "INSERT INTO $insertSubTable (Final_ID, ISBN_Number, BookName_ID, Book_No, Availability)
                        VALUES (?, ?, ?, ?, ?)";
            $stmtInsert = $this->con->prepare($queryInsert);
            while ($row = $result->fetch_assoc()) {
                $final_ID = $row['Final_ID'];
                $bookName_ID = $row['BookName_ID'];
                $book_No = $row['Book_No'];
                $availability = $row['Availability'];

                $stmtInsert->bind_param("sssss", $final_ID, $isbnNumber, $bookName_ID, $book_No, $availability);
                $result1 = $stmtInsert->execute();
                if (!$result1) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public function setEventForAllBooksDeleteFromBackupTable($isbnNumber)
    {
        date_default_timezone_set('Asia/Colombo');
        $deleteTime = date('Y-m-d H:i:s', strtotime('+14 days'));

        $scheduleToDeleteAllBooksQuery = "
                CREATE EVENT IF NOT EXISTS delete_request_$isbnNumber
                ON SCHEDULE AT '$deleteTime'
                DO
                BEGIN
                    DELETE FROM backupbook WHERE ISBN_Number='$isbnNumber';
                    DELETE FROM backupbookdetails WHERE ISBN_Number='$isbnNumber';
                END ";
        $resultScheduleToDeleteAllBooks = $this->con->query($scheduleToDeleteAllBooksQuery);
        return $resultScheduleToDeleteAllBooks;
    }

}
//$x=new DeleteBook();
//$nnn=$x->deleteSomeBook("Fiction","FIC/4/1");
//print_r($nnn);