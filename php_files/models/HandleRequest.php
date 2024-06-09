<?php

require_once '../dbConnection/DBConnection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
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
        $searchPattern="%".$userID."%";
        $query = "SELECT * FROM requests WHERE UserID LIKE '$searchPattern'";
        $result = $this->con->query($query);
        return $result;
    }
    public function placeRequest($bookID, $userID, $category, $requestTime)
    {
        date_default_timezone_set('Asia/Colombo');

        $checkUserIDQuery="SELECT UserID FROM requests WHERE UserID='$userID'";
        $resultCheckUserIDQuery = $this->con->query($checkUserIDQuery);
        if($resultCheckUserIDQuery && $resultCheckUserIDQuery->num_rows > 0){
           return "userExists";
        }else{
            $updateBookQuery = "UPDATE $category SET Availability='Book Requested' WHERE Final_ID='$bookID'";
            $result1 = $this->con->query($updateBookQuery);

            $confirmationCode = rand(1000, 9999);
            $this->sendConfirmationCode($userID,$confirmationCode);
            $query = "INSERT INTO requests (Final_ID, UserID,requestTime,ConfirmationCode) VALUES ('$bookID', '$userID','$requestTime','$confirmationCode')";
            $result2 = $this->con->query($query);
            $deleteTime = date('Y-m-d H:i:s', strtotime($requestTime . ' + 20 minutes'));
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
//        if ($result3) {
//            echo "success";
//        } else {
//            echo $this->con->error;
//        }

        }
    }

    public function sendConfirmationCode($userID,$confirmationCode)
    {
        $query = "SELECT * FROM libraryusersdetails WHERE UserID ='$userID'";
        $result = $this->con->query($query);
        $row = $result->fetch_assoc();
        $email=$row['Email'];
        $firstName=$row['FirstName'];
        if ($result && $result->num_rows > 0) {

            require '../PHPMailer/Exception.php';
            require '../PHPMailer/PHPMailer.php';
            require '../PHPMailer/SMTP.php';
            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'sajanhirushaportfolio@gmail.com';
                $mail->Password = 'bqdqrjjerftiaofm';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port = 465;

                //Recipients
                $mail->setFrom('sajanhirushaportfolio@gmail.com', 'Email Verification');
                $mail->addAddress($email, $firstName);

                //Content
                $mail->isHTML(true);
                $mail->Subject = "Book Request Code";
                $mail->Body = "<p> Dear" . $firstName . "</p>";
                $mail->Body .= "<p> Your Request successfully placed.</p>";
                $mail->Body .= "<p> " ."VERIFICATION CODE: ". $confirmationCode . "</p>";
                $mail->Body .= "<p> Thank you.</p>";
                $mail->send();

            } catch (Exception $e) {
                $message = "Message could not be sent. ";
            }
        }
    }
}
//date_default_timezone_set('Asia/Colombo');
//$obj=new HandleRequest();
//$obj->placeRequest("IT/1/6","SLMS/24/1","IT",date('Y-m-d H:i:s'));