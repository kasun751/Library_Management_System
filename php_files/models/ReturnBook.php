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
//        $query="SELECT UserID FROM issuebooks WHERE issuebooks.BookID='$bookID' AND";
        // get userID from issuebooks table
        $query="SELECT * FROM issuebooks WHERE BookID='$bookID'";
        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        $userID=$row['UserID'];
        $returnBookData['userID']=$userID;

        //get user name from libraryusersdetails table
        $query1="SELECT * FROM libraryusersdetails WHERE UserID='$userID'";
        $result1 = $this->con->query($query1);
        $row1 = $result1->fetch_assoc();
        $firstName=$row1['FirstName'];
        $lastName=$row1['LastName'];
        $fullName=$firstName ." ". $lastName;
        $returnBookData['fullName']=$fullName;

        //get category name to find table relevant to book ID
        $bookIdElement = explode("/", $bookID);
        $bookIDFirstElement = $bookIdElement[0];
        $query2 = "SELECT Category_Name FROM category WHERE SUBSTRING_INDEX(Category_ID, '/', 1) = '$bookIDFirstElement'";
        $result2 = $this->con->query($query2);
        $row1 = $result2->fetch_assoc();
        $category = $row1['Category_Name'];

        //get isbn from relevant category table
        $query3="SELECT * FROM $category WHERE Final_ID='$bookID'";
        $result3 = $this->con->query($query3);
        $row3 = $result3->fetch_assoc();
        $returnBookData['availability']=$row3['Availability'];
        $isbnNumber=$row3['ISBN_Number'];

        //get book name from books table
        $query4="SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
        $result4 = $this->con->query($query4);
        $row4 = $result4->fetch_assoc();
        $returnBookData['bookName']=$row4['BookName'];
        $returnBookData['category']=$row4['Category'];

        //get calculated fine for relevant book from fineCalculations table
        $query5="SELECT Fine FROM finecalculations WHERE BookID='$bookID'";
        $result5 = $this->con->query($query5);

        if($result5->num_rows>0){
            $row5 = $result5->fetch_assoc();
            $returnBookData['fine']=$row5['Fine'];
        }


        return $returnBookData;
    }

    public function returnBook($userID,$bookID,$category,$setAvailability)
    {
        $query="SELECT UserID FROM finecalculations WHERE UserID='$userID' AND BookID='$bookID'";
        $result = $this->con->query($query);
        if($result->num_rows > 0){
            $query1="DELETE FROM finecalculations WHERE UserID='$userID' AND BookID='$bookID'";
            $this->con->query($query1);
        }
        $query2="DELETE FROM issuebooks WHERE UserID='$userID' AND BookID='$bookID'";
        $result2 = $this->con->query($query2);
        if ($result2){
            $query3="UPDATE $category SET Availability='$setAvailability' WHERE Final_ID='$bookID'";
            $result3 = $this->con->query($query3);
            if ($result3) {
                $getUserMailQuery = "SELECT Email,FirstName,LastName FROM libraryusersdetails WHERE UserID='$userID'";
                $resultUserMailQuery = $this->con->query($getUserMailQuery);
                $row = $resultUserMailQuery->fetch_assoc();
                $email = $row['Email'];
                $fName = $row['FirstName'];
                $lName = $row['LastName'];
                $fullName = $fName . " " . $lName;
                $subject = "Book Returned.";
                $message = "<p>Thank You For Returning Book.</p>";
                $sendMail = new SendMail();
                $result = $sendMail->sendMailMessage($email, $fullName, $subject, $message);
                return $result;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}