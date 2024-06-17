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
        $query = "SELECT Final_ID,UserID FROM requests ORDER BY Req_ID DESC LIMIT 10";
        $result = $this->con->query($query);
        $finalIdsWithCategory = [];

        while ($row = $result->fetch_assoc()) {
            $finalID = $row['Final_ID'];
            $finalIdElement = explode("/", $finalID);
            $finalFirstElement = $finalIdElement[0];

            $query1 = "SELECT Category_Name FROM category WHERE SUBSTRING_INDEX(Category_ID, '/', 1) = '$finalFirstElement'";
            $result1 = $this->con->query($query1);
            $row1 = $result1->fetch_assoc();
            $category = $row1['Category_Name'];

            $row['Category_Name'] = $category;
            $finalIdsWithCategory[] = $row;
        }
        return $finalIdsWithCategory;
    }

    public function getRequestDetails($userID)
    {
        $searchPattern = "%" . $userID . "%";
        $query = "SELECT * FROM requests WHERE UserID LIKE '$searchPattern'";
        $result = $this->con->query($query);
        return $result;
    }

    public function placeRequest($bookID, $userID, $category, $requestTime)
    {
        date_default_timezone_set('Asia/Colombo');
        $checkRequestPlacingAvailability = $this->checkRequestPlacingAvailabilityForUser($userID);
        if ($checkRequestPlacingAvailability == 3) {
            return "userReachDailyRequestCount";
        } else {
            $checkUserIDQuery = "SELECT UserID FROM requests WHERE UserID='$userID'";
            $resultCheckUserIDQuery = $this->con->query($checkUserIDQuery);
            if ($resultCheckUserIDQuery && $resultCheckUserIDQuery->num_rows > 0) {
                return "userExists";
            } else {
                if($checkRequestPlacingAvailability==0){
                    $query = "INSERT INTO requestcount (UserID,Count) VALUES ('$userID',1)";
                    $result = $this->con->query($query);
                }else{
                    $query = "UPDATE requestcount SET Count=Count+1 WHERE UserID='$userID'";
                    $result = $this->con->query($query);
                }


                $updateBookQuery = "UPDATE $category SET Availability='Book Requested' WHERE Final_ID='$bookID'";
                $result1 = $this->con->query($updateBookQuery);

                $confirmationCode = rand(1000, 9999);
                $deleteTime = date('Y-m-d H:i:s', strtotime($requestTime . ' + 1 minutes'));
                $this->sendConfirmationCode($userID, $confirmationCode, $deleteTime);
                $query = "INSERT INTO requests (Final_ID, UserID,requestTime,ConfirmationCode) VALUES ('$bookID', '$userID','$requestTime','$confirmationCode')";
                $result2 = $this->con->query($query);
                $newUserID = str_replace('/', '_', $userID);
                $deleteRequestQuery = "
            CREATE EVENT delete_request_$newUserID
                ON SCHEDULE AT '$deleteTime'
                DO
                BEGIN
                    DELETE FROM requests WHERE Final_ID='$bookID';
                    UPDATE `$category` SET Availability='available' WHERE Final_ID='$bookID';
                END ";
                $result3 = $this->con->query($deleteRequestQuery);
                return array($result1, $result2, $result3);
            }
        }
    }

    public function sendConfirmationCode($userID, $confirmationCode, $expireTime)
    {
        $query = "SELECT * FROM libraryusersdetails WHERE UserID ='$userID'";
        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        $email = $row['Email'];
        $firstName = $row['FirstName'];
        $subject = "Book Request Code";
        $message = "<p>Thank You For Requesting Book.</p>" .
            "<p>Please Borrow Book Before Expiration Time Of Request </p>" .
            "<p>Request Expiration Date And Time:$expireTime</p>" .
            "<p>YOUR CONFIRMATION CODE:$confirmationCode </p>";

        if ($result && $result->num_rows > 0) {
            $sendConfirmationCode = new SendMail();
            $sendConfirmationCode->sendMailMessage($email, $firstName, $subject, $message);

        }
    }

    public function checkRequestPlacingAvailabilityForUser($userID)
    {
        $query = "SELECT Count FROM requestcount WHERE UserID='$userID'";
        $result = $this->con->query($query);
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count = $row['Count'];
        } else {
            $count = 0;
        }
        if($count==3){
            return $count;
        }else if($count == 0){
            return $count;
        }else{
           return $count;
        }

    }
}
//date_default_timezone_set('Asia/Colombo');
//$obj=new HandleRequest();
//$obj->checkRequestPlacingAvailabilityForUser("SLMS/24/1");
//$obj->placeRequest("IT/1/6","SLMS/24/1","IT",date('Y-m-d H:i:s'));