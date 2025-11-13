<?php
require_once '../dbConnection/DBConnection.php';
require_once '../models/SendMail.php';
class ReturnBook
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function getReturnBookData($bookID)
    {
        $returnBookData = [];
        $query = "SELECT UserID FROM issuebooks WHERE BookID=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $bookID);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $userID = $row['UserID'];
        $returnBookData['userID'] = $userID;
        $stmt->close();

        $query1 = "SELECT FirstName, LastName FROM libraryusersdetails WHERE UserID=?";
        $stmt1 = $this->con->prepare($query1);
        $stmt1->bind_param("s", $userID);
        $stmt1->execute();
        $result1 = $stmt1->get_result();
        $row1 = $result1->fetch_assoc();
        $firstName = $row1['FirstName'];
        $lastName = $row1['LastName'];
        $fullName = $firstName . " " . $lastName;
        $returnBookData['fullName'] = $fullName;
        $stmt1->close();

        $bookIdElement = explode("/", $bookID);
        $bookIDFirstElement = $bookIdElement[0];
        $query2 = "SELECT Category_Name FROM category WHERE SUBSTRING_INDEX(Category_ID, '/', 1) = ?";
        $stmt2 = $this->con->prepare($query2);
        $stmt2->bind_param("s", $bookIDFirstElement);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        $row2 = $result2->fetch_assoc();
        $category = $row2['Category_Name'];
        $stmt2->close();

        $query3 = "SELECT Availability, ISBN_Number FROM $category WHERE Final_ID=?";
        $stmt3 = $this->con->prepare($query3);
        $stmt3->bind_param("s", $bookID);
        $stmt3->execute();
        $result3 = $stmt3->get_result();
        $row3 = $result3->fetch_assoc();
        $returnBookData['availability'] = $row3['Availability'];
        $isbnNumber = $row3['ISBN_Number'];
        $stmt3->close();

        $query4 = "SELECT BookName, Category FROM books WHERE ISBN_Number=?";
        $stmt4 = $this->con->prepare($query4);
        $stmt4->bind_param("s", $isbnNumber);
        $stmt4->execute();
        $result4 = $stmt4->get_result();
        $row4 = $result4->fetch_assoc();
        $returnBookData['bookName'] = $row4['BookName'];
        $returnBookData['category'] = $row4['Category'];
        $stmt4->close();

        $query5 = "SELECT Fine FROM finecalculations WHERE BookID=?";
        $stmt5 = $this->con->prepare($query5);
        $stmt5->bind_param("s", $bookID);
        $stmt5->execute();
        $result5 = $stmt5->get_result();
        if ($result5->num_rows > 0) {
            $row5 = $result5->fetch_assoc();
            $returnBookData['fine'] = $row5['Fine'];
        }
        $stmt5->close();
        return $returnBookData;
    }

    public function returnBook($userID, $bookID, $category, $setAvailability)
    {
        $query = "SELECT UserID FROM finecalculations WHERE UserID=? AND BookID=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("ss", $userID, $bookID);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $query1 = "DELETE FROM finecalculations WHERE UserID=? AND BookID=?";
            $stmt1 = $this->con->prepare($query1);
            $stmt1->bind_param("ss", $userID, $bookID);
            $stmt1->execute();
            $stmt1->close();
        }
        $stmt->close();
        $query2 = "DELETE FROM issuebooks WHERE UserID=? AND BookID=?";
        $stmt2 = $this->con->prepare($query2);
        $stmt2->bind_param("ss", $userID, $bookID);
        $result2 = $stmt2->execute();
        $stmt2->close();

        if ($result2) {
            $query3 = "UPDATE $category SET Availability=? WHERE Final_ID=?";
            $stmt3 = $this->con->prepare($query3);
            $stmt3->bind_param("ss", $setAvailability, $bookID);
            $result3 = $stmt3->execute();
            $stmt3->close();

            if ($result3) {
                $getUserMailQuery = "SELECT Email, FirstName, LastName FROM libraryusersdetails WHERE UserID=?";
                $stmt4 = $this->con->prepare($getUserMailQuery);
                $stmt4->bind_param("s", $userID);
                $stmt4->execute();
                $resultUserMailQuery = $stmt4->get_result();
                $row = $resultUserMailQuery->fetch_assoc();
                $email = $row['Email'];
                $fName = $row['FirstName'];
                $lName = $row['LastName'];
                $fullName = $fName . " " . $lName;
                $stmt4->close();

                $subject = "Book Returned.";
                $message = "<p>Thank You For Returning Book.</p>";
                $sendMail = new SendMail();
                $result = $sendMail->sendMailMessage($email, $fullName, $subject, $message);
                return $result;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}