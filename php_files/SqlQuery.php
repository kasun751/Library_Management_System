<?php

use PHPMailer\dbConnection\DBConnection;

include 'DBConnection.php';

class SqlQuery
{
    private $con;

    public function __construct()
    {

        $DBobj = new DBConnection;
        $this->con = $DBobj->dbConnect();
    }

//    public function InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $bookLocation, $bookAvailability, $description, $bookName_ID, $book_No)
//    {
//
//
//        $query1 = "INSERT INTO books (ISBN_Number,BookName, AuthorName, PublisherName,Category,AllBookQty,BookLocation,Description) VALUES ('$isbnNumber', '$bookName', '$authorName', '$publisherName ', '$category','$qty','$bookLocation', '$description')";
//        $result1 = $this->con->query($query1);
//        $uppercaseString = strtoupper($category);
//        $charArray = str_split($uppercaseString);
//        for ($i = 1; $i <= $qty; $i++) {
//            if (count($charArray) >= 3) {
//                $final_ID = $charArray[0] . $charArray[1] . $charArray[2] . "/" . $bookName_ID . "/" . $book_No;
//            } else {
//                $final_ID = $charArray[0] . $charArray[1] . "/" . $bookName_ID . "/" . $book_No;
//
//            }
//            $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES ('$isbnNumber', '$bookName_ID','$book_No','$bookAvailability','$final_ID')";
//            $result2 = $this->con->query($query2);
//            $book_No++;
//        }
//
//        return array($result1, $result2);
//    }

//    public function InsertCategoryTableDetails($isbnNumber, $book_No, $category, $qty)
//    {
//        $query = "INSERT INTO $category (ISBN_Number,BookName, AuthorName, PublisherName,Category,AllBookQty,Description) VALUES ('$isbnNumber', '$bookName', '$authorName', '$publisherName ','$category','$qty', '$description')";
//        $result = $this->con->query($query);
//        return $result;
//    }
//
//    public function getBookList()
//    {
//        $query = "SELECT * FROM books ORDER BY AllBookQty DESC LIMIT 10";
//        $result = $this->con->query($query);
//        return $result;
//    }
//
//    public function getBookDetails($bookDetails)
//    {
//        $query = "SELECT * FROM books WHERE BookName='$bookDetails'";
//        $result = $this->con->query($query);
//        return $result;
//    }

//    public function addMoreQty($Qty, $ISBN_Number, $bookAvailability)
//    {
//        $getData = new SqlQuery();
//        $result = $getData->getISBNData($ISBN_Number);
//        $raw = $result->fetch_assoc();
//        $isbnNumber = $ISBN_Number;
//        $category = $raw['Category'];
//        $uppercaseString = strtoupper($category);
//        $charArray = str_split($uppercaseString);
//        $bookDetails = $getData->getLastBook_No($category, $isbnNumber);
//        $book_No = $bookDetails['Book_No'] + 1;
//        $bookName_ID = $bookDetails['BookName_ID'];
//
//        for ($i = 1; $i <= $Qty; $i++) {
//            $final_ID = $charArray[0] . $charArray[1] . $charArray[2] . "/" . $bookName_ID . "/" . $book_No;
//            $query2 = "INSERT INTO $category (ISBN_Number,BookName_ID,Book_No,Availability,Final_ID) VALUES ('$isbnNumber', '$bookName_ID','$book_No','$bookAvailability','$final_ID')";
//            $result2 = $this->con->query($query2);
//            $book_No++;
//        }
//        $query = "SELECT COUNT(*) AS count FROM $category WHERE ISBN_Number='$isbnNumber'";
//        $result = $this->con->query($query);
//        $count = $result->fetch_assoc()['count'];
//        $queryNext = "UPDATE books SET AllBookQty ='$count'  WHERE ISBN_NUmber='$isbnNumber'";
//        $this->con->query($queryNext);
//        return $result2;
//    }

//    public function getLastBook_No($category, $isbnNumber)
//    {
//
//        $query = "SELECT BookName_ID,Book_No FROM $category WHERE ISBN_Number='$isbnNumber' ORDER BY Book_No DESC LIMIT 1";
//        $result = mysqli_query($this->con, $query);
//        $row = mysqli_fetch_assoc($result);
//        return $row;
//
//    }

//    public function getLastBookName_ID($category)
//    {
//
//        $query = "SELECT BookName_ID FROM $category ORDER BY BookName_ID DESC LIMIT 1";
//        $result = mysqli_query($this->con, $query);
//        $row = mysqli_fetch_assoc($result);
//        return $row;
//
//    }

//    public function getISBNData($isbnNumber)
//    {
//        $query = "SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
//        $result = mysqli_query($this->con, $query);
//        return $result;
//    }

//    public function getBookIdCategory($bookId)
//    {
//        $parts = explode("/", $bookId);
//        $part1 = $parts[0];
//        $lowercaseString = strtolower($part1);
//        $categoryTableQuery = "SELECT Category_Name FROM category";
//        $result = mysqli_query($this->con, $categoryTableQuery);
//        if ($result) {
//            while ($row = mysqli_fetch_assoc($result)) {
//                $categoryName = $row['Category_Name'];
//                $charArray = str_split($categoryName);
//                if (count($charArray) >= 3) {
//                    $part1Fromdatabase = $charArray[0] . $charArray[1] . $charArray[2];
//                } else {
//                    $part1Fromdatabase = $charArray[0] . $charArray[1];
//
//                }
//                if ($lowercaseString === $part1Fromdatabase) {
//                    return $categoryName;
//                }
//            }
//        } else {
//            return null;
//        }
//        return null;
//    }

//    public function getBookIdData($category, $bookId)
//    {
//        $query = "SELECT * FROM $category WHERE Final_ID='$bookId' ORDER BY Book_No DESC LIMIT 1";
//        $result = $this->con->query($query);
//        $row = mysqli_fetch_assoc($result);
//        return $row;
//    }

//    public function setBookAvailability($category, $bookID, $availability)
//    {
//        $query = "UPDATE $category SET Availability='$availability' WHERE Final_ID='$bookID'";
//        $this->con->query($query);
//        return $this->con->affected_rows;
//    }

//    public function updateIsueBooksTable($bookID, $userID, $dateTime, $availability)
//    {
//        switch ($availability) {
//            case "available":
//
//                $query = "DELETE FROM issuebooks WHERE BookID='$bookID' AND UserID='$userID'";
//                $this->con->query($query);
//                return $this->con->affected_rows;
//
//            case "notAvailable":
//                $query = "INSERT INTO issuebooks (BookID,UserID,IssueDateAndTime) VALUES ('$bookID', '$userID','$dateTime')";
//                $this->con->query($query);
//                return $this->con->affected_rows;
//
//
//        }
//    }

//    public function getAvailableBooksList($category, $isbnNumber)
//    {
//
//        $query = "SELECT Final_ID FROM $category WHERE ISBN_Number='$isbnNumber' AND Availability='available'";
//        $result = $this->con->query($query);
//        return $result;
//    }

//    public function runSqlUpdateQuery($name, $authorName)
//    {
//        $query = "UPDATE books SET AuthorName='$authorName' WHERE BookName='$name'";
//        $this->con->query($query);
//        return $this->con->affected_rows;
//    }

//    public function createNewCategoryTable($newCategory)
//    {
//        $query = "CREATE TABLE $newCategory (
//    Final_ID VARCHAR(255) PRIMARY KEY,
//    ISBN_Number VARCHAR(255),
//    BookName_ID INT DEFAULT 0,
//    Book_No INT NOT NULL,
//    Availability VARCHAR(255),
//    FOREIGN KEY (ISBN_Number) REFERENCES Books(ISBN_Number)
//)";
//        $result = mysqli_query($this->con, $query);
//        return $result;
//    }

//    public function categoryLetterCheck($category1)
//    {
//        $charArray1 = str_split(strtoupper($category1));
//        if (count($charArray1) >= 3) {
//            $firstThreeLetters1 = $charArray1[0] . $charArray1[1] . $charArray1[2];
//        } else {
//            $firstThreeLetters1 = $charArray1[0] . $charArray1[1];
//        }
//
//        $getCategoryList = new SqlQuery();
//        $categoryList = $getCategoryList->getCategoryList();
//        $newArray = [];
//        foreach ($categoryList as $item) {
//            $newArray[] = $item['Category_Name'];
//        }
//        foreach ($newArray as $category) {
//            if (is_string($category)) {
//                $charArray2 = str_split(strtoupper($category));
//                if (count($charArray2) >= 3) {
//                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1] . $charArray2[2];
//                } else {
//                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1];
//                }
//                if ($firstThreeLetters1 === $firstThreeLetters2) {
//                    $firstFourLetters = $charArray1[0] . $charArray1[1] . $charArray1[2] . $charArray1[3];
//                    return $firstFourLetters;
//                }
//            }
//        }
//        return $firstThreeLetters1;
//    }

//    public function dropCategoryTable($Category)
//    {
//        $query = "DROP TABLE $Category";
//        $result = mysqli_query($this->con, $query);
//        return $result;
//    }

//    public function dropCategoryDetails($Category)
//    {
//        $query = "DELETE FROM category WHERE Category_Name='$Category'";
//        $result = mysqli_query($this->con, $query);
//        return $result;
//    }

//    public function CategoryTableUpdate($category)
//    {
//        $getCategoryFirstLetters = new SqlQuery();
//        $categoryFirstLetters = $getCategoryFirstLetters->categoryLetterCheck($category);
//        $query1 = "INSERT INTO category (Category_Name) VALUES ('$category')";
//        $this->con->query($query1);
//        $query2 = "SELECT Category_No FROM category WHERE Category_Name='$category'";
//        $result2 = $this->con->query($query2);
//        $row = mysqli_fetch_assoc($result2);
//        $final_ID = $categoryFirstLetters . "/" . $row['Category_No'];
//        $query3 = "UPDATE category SET Category_ID ='$final_ID'  WHERE Category_Name='$category'";
//        $result3 = $this->con->query($query3);
//        return $result3;
//    }

//    public function getCategoryList()
//    {
//        $query = "SELECT DISTINCT Category_Name FROM category";
//        $result = $this->con->query($query);
//        $categoryList = array();
//        if ($result) {
//            while ($row = mysqli_fetch_assoc($result)) {
//                $categoryList[] = $row;
//            }
//            return $categoryList;
//        }
//    }

//    public function deleteAllBook($isbnNumber, $category)
//    {
//        $query1 = "DELETE FROM books WHERE ISBN_Number='$isbnNumber'";
//        $query2 = "DELETE FROM $category WHERE ISBN_Number='$isbnNumber'";
//        $result2 = mysqli_query($this->con, $query2);
//        $result1 = mysqli_query($this->con, $query1);
//        return array($result1, $result2);
//    }

//    public function updateBookDetails($isbnNumber, $bookName, $authorName, $publisherName, $bookLocation, $description)
//    {
//        $query = "UPDATE books SET
//    BookName = '$bookName',
//    AuthorName = '$authorName',
//    PublisherName = '$publisherName',
//    BookLocation = '$bookLocation',
//    Description = '$description'
//    WHERE
//    ISBN_Number= '$isbnNumber'";
//        $result = mysqli_query($this->con, $query);
//        return $result;
//    }

//    public function deleteSomeBook($category, $bookID)
//    {
//        $query = "DELETE FROM $category WHERE Final_ID='$bookID'";
//        $result = mysqli_query($this->con, $query);
//        if ($result !== false) {
//            if (mysqli_affected_rows($this->con) > 0) {
//                return true;
//            } else {
//                return false;
//            }
//        } else {
//            return false;
//        }
//    }

//    public function runSqlRetrieveQuery($id, $bookName)
//    {
//        if ($id == "" && $bookName == "") {
//            return "Please Enter Correct Name or Id";
//
//        } else if ($id == "" && strlen($bookName) > 0) {
//            $query = "SELECT * FROM books WHERE BookName='$bookName'";
//            $result = mysqli_query($this->con, $query);
//            $numOfRaw = mysqli_num_rows($result);
//            if ($numOfRaw > 0) {
//                return $result;
//            } else {
//                return false;
//            }
//
//
//        } else if ($bookName == "" && strlen($id) > 0) {
//            $query = "SELECT * FROM books WHERE BookID='$id'";
//            $result = mysqli_query($this->con, $query);
//            $numOfRaw = mysqli_num_rows($result);
//            if ($numOfRaw) {
//                return $result;
//            } else {
//                return false;
//            }
//
//
//        }
//    }


    //===============================================================================================
//    public function InsertLibraryUserDetails($userID, $firstName, $lastName, $nic, $address, $phoneNumber, $birthDay, $gender, $email, $password, $verificationCode)
//    {
//        $getData = new SqlQuery();
//        $resultCheckExistsOrNot = $getData->checkExistsOrNot($nic, $phoneNumber, $email);
//        if ($resultCheckExistsOrNot == "NicExist") {
//            $data = array('resultMessage' => 'NicExist');
//            echo json_encode($data);
//        } elseif ($resultCheckExistsOrNot == "PhoneNumberExist") {
//            $data = array('resultMessage' => 'PhoneNumberExist');
//            echo json_encode($data);
//        } elseif ($resultCheckExistsOrNot == "EmailExist") {
//            $data = array('resultMessage' => 'EmailExist');
//            echo json_encode($data);
//        } elseif ($resultCheckExistsOrNot == "queryError") {
//            $data = array('resultMessage' => 'QueryFailed');
//            echo json_encode($data);
//        } else {
//            $query1 = "INSERT INTO libraryusersdetails (UserID,FirstName,LastName,NIC,Address,PhoneNumber,BirthDay,Gender,Email,Password,Verification_Code,Is_Active) VALUES ('$userID','$firstName', '$lastName', '$nic', '$address', '$phoneNumber','$birthDay','$gender', '$email','$password','$verificationCode',false)";
//            if ($this->con->query($query1)) {
//                return "success!";
//            } else {
//                $data = array('resultMessage' => 'QueryFailed');
//                echo json_encode($data);
//            }
//        }
//
//    }

//    public function getLastUser_No()
//    {
//        $query = "SELECT * FROM libraryusersdetails ORDER BY User_No DESC LIMIT 1";
//        $result = mysqli_query($this->con, $query);
//        return mysqli_fetch_assoc($result);
//    }

//    public function createNextUserID()
//    {
//        $getData = new SqlQuery();
//        $lastUserNo = $getData->getLastUser_No();
//        if ($lastUserNo === null || !isset($lastUserNo['User_No'])) {
//            $user_No = 1;
//        } else {
//            $PreUser_No = $getData->getLastUser_No()['User_No'];
//            $user_No = $PreUser_No + 1;
//        }
//        $lastTwoDigit = substr(date("Y"), -2);
//        $NextUserID = "SLMS/" . $lastTwoDigit . "/" . $user_No;
//        return $NextUserID;
//    }

//    public function checkExistsOrNot($nic, $phoneNumber, $email)
//    {
//        $query1 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE NIC = '$nic'";
//        $query2 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE PhoneNumber = '$phoneNumber'";
//        $query3 = "SELECT COUNT(*) AS count FROM libraryusersdetails WHERE Email = '$email'";
//        $result1 = $this->con->query($query1);
//        $result2 = $this->con->query($query2);
//        $result3 = $this->con->query($query3);
//
//        if ($result1 && $result2 && $result3) {
//            $row1 = $result1->fetch_assoc();
//            $row2 = $result2->fetch_assoc();
//            $row3 = $result3->fetch_assoc();
//
//            if ($row1['count'] > 0) {
//                return "NicExist";
//            } elseif ($row2['count'] > 0) {
//                return "PhoneNumberExist";
//            } elseif ($row3['count'] > 0) {
//                return "EmailExist";
//            } else {
//                return "validData";
//            }
//        } else {
//            return "queryError";
//        }
//
//    }

//    public function loginDetailsValidate($userIDOrEmail, $password)
//    {
//        $getData = new SqlQuery();
//        if (strpos($userIDOrEmail, '@gmail.com') !== false) {
//            $resultOfVerification = $getData->checkVerification($userIDOrEmail, 1);
//            $query = "SELECT * FROM libraryusersdetails WHERE Email = '$userIDOrEmail'";
//            $result1 = $this->con->query($query);
//            $row = $result1->fetch_assoc();
//            $userID = $row['UserID'];
//
//        } else {
//            $resultOfVerification = $getData->checkVerification($userIDOrEmail, 0);
//            $query = "SELECT * FROM libraryusersdetails WHERE UserID = '$userIDOrEmail'";
//            $userID = $userIDOrEmail;
//        }
//
//
//        $result = $this->con->query($query);
//        if ($this->con->affected_rows > 0) {
//            $row = $result->fetch_assoc();
//            if ($row['Password'] == $password) {
//                if ($resultOfVerification) {
//                    $data = array(
//                        'resultMessage' => 'Login_Success',
//                        'userID' => $userID
//
//                    );
//                    echo json_encode($data);
//                } else {
//                    $data = array('resultMessage' => 'NotVerifiedAccount',
//                        'userID' => $userID
//                    );
//                    echo json_encode($data);
//                }
//
//
//            } else {
//                $data = array('resultMessage' => 'Login details not matched',
//                    'userID' => $userID);
//                echo json_encode($data);
//            }
//        } else {
//            $data = array('resultMessage' => 'Login details not matched',
//                'userID' => $userID);
//            echo json_encode($data);
//        }
//
//    }

//    public function verifyAccount($verificationCode)
//    {
//        $query = "SELECT * FROM libraryusersdetails WHERE Verification_Code = '$verificationCode'";
//        $result = $this->con->query($query);
//        $row = $result->fetch_assoc();
//        $numOfRaw = $this->con->affected_rows;
//        if ($numOfRaw == 1) {
//            $query2 = "UPDATE libraryusersdetails SET Is_Active = true, Verification_Code=NULL WHERE Verification_Code = '$verificationCode' LIMIT 1";
//            $result2 = $this->con->query($query2);
//            $numOfRaw2 = $this->con->affected_rows;
//            if ($numOfRaw2 == 1) {
//                echo "Email Verified Successfully...";
//            } else {
//                echo "Email Not Verified...";
//            }
//        } else {
//            echo "Invalid Verification...";
//        }
//
//    }

//    public function checkVerification($userID, $checkParaForIDOrEmail)
//    {
//
//        switch ($checkParaForIDOrEmail) {
//            case 0:
//                $query = "SELECT * FROM libraryusersdetails WHERE UserID = '$userID'";
//                break;
//            case 1:
//                $query = "SELECT * FROM libraryusersdetails WHERE Email = '$userID'";
//                break;
//        }
//
//        $result = $this->con->query($query);
//        $row = $result->fetch_assoc();
//        if ($row['Is_Active']) {
//            return true;
//        } else {
//            return false;
//        }
//    }

//    public function getUserIDDetails($userID)
//    {
//        $query = "SELECT * FROM libraryusersdetails WHERE UserID='$userID'";
//        $result = $this->con->query($query);
//        $raw = $result->fetch_assoc();
//        $userFirstname = isset($raw['FirstName']) ? $raw['FirstName'] : '';
//        $userLastname = isset($raw['LastName']) ? $raw['LastName'] : '';
//
//        $fullName = $userFirstname . " " . $userLastname;
//        $data = array('userName' => $fullName);
//        echo json_encode($data);
//    }
}


?>