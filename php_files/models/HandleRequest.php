<?php

require_once '../dbConnection/DBConnection.php';
require_once '../models/SendMail.php';

class HandleRequest
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }

    public function getRequestList()
    {
        $query = "SELECT Final_ID, UserID FROM requests ORDER BY Req_ID DESC LIMIT 10";
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $finalIdsWithCategory = [];

        $categoryQuery = "SELECT Category_Name FROM category WHERE SUBSTRING_INDEX(Category_ID, '/', 1) = ?";
        $categoryStmt = $this->con->prepare($categoryQuery);

        while ($row = $result->fetch_assoc()) {
            $finalID = $row['Final_ID'];
            $finalIdElement = explode("/", $finalID);
            $finalFirstElement = $finalIdElement[0];

            $categoryStmt->bind_param("s", $finalFirstElement);
            $categoryStmt->execute();
            $categoryResult = $categoryStmt->get_result();
            $categoryRow = $categoryResult->fetch_assoc();

            $row['Category_Name'] = $categoryRow['Category_Name'];
            $finalIdsWithCategory[] = $row;
        }
        return $finalIdsWithCategory;
    }

    public function getRequestDetails($userID)
    {
        $searchPattern = "%" . $userID . "%";
        $query = "SELECT * FROM requests WHERE UserID LIKE ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $searchPattern);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }
    public function placeRequest($bookID, $userID, $category, $requestTime)
    {
        date_default_timezone_set('Asia/Colombo');
        $checkRequestPlacingAvailability = $this->checkRequestPlacingAvailabilityForUser($userID);
        if ($checkRequestPlacingAvailability == 3) {
            return "userReachDailyRequestCount";
        } else {
            $checkUserIDQuery = "SELECT UserID FROM requests WHERE UserID=?";
            $stmtCheckUserIDQuery = $this->con->prepare($checkUserIDQuery);
            $stmtCheckUserIDQuery->bind_param("s", $userID);
            $stmtCheckUserIDQuery->execute();
            $resultCheckUserIDQuery = $stmtCheckUserIDQuery->get_result();

            if ($resultCheckUserIDQuery->num_rows > 0) {
                return "userExists";
            } else {
                if ($checkRequestPlacingAvailability == 0) {
                    $query = "INSERT INTO requestcount (UserID, Count) VALUES (?, 1)";
                } else {
                    $query = "UPDATE requestcount SET Count = Count + 1 WHERE UserID=?";
                }
                $stmtUpdateRequestCount = $this->con->prepare($query);
                $stmtUpdateRequestCount->bind_param("s", $userID);
                $stmtUpdateRequestCount->execute();

                $updateBookQuery = "UPDATE $category SET Availability='Book Requested' WHERE Final_ID=?";
                $stmtUpdateBookQuery = $this->con->prepare($updateBookQuery);
                $stmtUpdateBookQuery->bind_param("s", $bookID);
                $stmtUpdateBookQuery->execute();

                $confirmationCode = rand(1000, 9999);
                $deleteTime = date('Y-m-d H:i:s', strtotime($requestTime . ' + 1 minutes'));
                $this->sendConfirmationCode($userID, $confirmationCode, $deleteTime);

                $query = "INSERT INTO requests (Final_ID, UserID, requestTime, ConfirmationCode) VALUES (?, ?, ?, ?)";
                $stmtInsertRequest = $this->con->prepare($query);
                $stmtInsertRequest->bind_param("ssss", $bookID, $userID, $requestTime, $confirmationCode);
                $stmtInsertRequest->execute();

                $newUserID = str_replace('/', '_', $userID);
                $deleteRequestQuery = "
                CREATE EVENT IF NOT EXISTS delete_request_$newUserID
                ON SCHEDULE AT '$deleteTime'
                DO
                BEGIN
                    DELETE FROM requests WHERE Final_ID='$bookID';
                    UPDATE `$category` SET Availability='available' WHERE Final_ID='$bookID';
                END ";
                $result3 = $this->con->query($deleteRequestQuery);

                return array($stmtUpdateBookQuery->affected_rows, $stmtInsertRequest->affected_rows, $result3);
            }
        }
    }

    public function sendConfirmationCode($userID, $confirmationCode, $expireTime)
    {
        $query = "SELECT Email, FirstName FROM libraryusersdetails WHERE UserID = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $email = $row['Email'];
            $firstName = $row['FirstName'];
            $subject = "Book Request Code";
            $message = "<p>Thank You For Requesting Book.</p>" .
                "<p>Please Borrow Book Before Expiration Time Of Request </p>" .
                "<p>Request Expiration Date And Time: $expireTime</p>" .
                "<p>YOUR CONFIRMATION CODE: $confirmationCode</p>";

            $sendConfirmationCode = new SendMail();
            $sendConfirmationCode->sendMailMessage($email, $firstName, $subject, $message);
        }
    }

    public function checkRequestPlacingAvailabilityForUser($userID)
    {
        $query = "SELECT Count FROM requestcount WHERE UserID=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count = $row['Count'];
        } else {
            $count = 0;
        }
        return $count;
    }
}
//date_default_timezone_set('Asia/Colombo');
//$obj=new HandleRequest();
//$obj->checkRequestPlacingAvailabilityForUser("SLMS/24/1");
//$obj->placeRequest("IT/1/6","SLMS/24/1","IT",date('Y-m-d H:i:s'));