<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
//include 'database.php';
include '../Models/EBook.php';
class BuyController{
    private $eBookObj;

    public function __construct()
    {
        $this->eBookObj=new EBook();
    }
    public function Buy(){
        // Decode the incoming JSON data
        $data = json_decode(file_get_contents("php://input"), true);

// Check if JSON decoding was successful and if 'isbn' exists
        if ($data === null || !isset($data['isbn'])) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid JSON or missing ISBN']);
            exit;
        }

        $isbn = $data['isbn'];
        $userId=$data['userId'];

//        $dbcon = new database();
//        $conn = $dbcon->dbConnect();
//
//        if ($conn->connect_error) {
//            echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
//            exit();
//        }

//        $stmt = $conn->prepare("SELECT * FROM ebook WHERE isbn = ?");
//        $stmt->bind_param("s", $isbn);
//        $stmt->execute();
//        $result = $stmt->get_result();
//
//        if ($result->num_rows == 1) {
//            $row = $result->fetch_assoc();
//
//            $merchant_id="1227044";
//            $order_id=$row['isbn'];
//            $amount=$row['price'];
//            $currency="LKR" ;
//            $merchant_secret="Mjk3ODYzMTcxMDExMDAxOTc1OTY2MzkyOTQ3NTEyMjgzNTIwNjg1";
//
//            $hash = strtoupper(
//                md5(
//                    $merchant_id .
//                    $order_id .
//                    number_format($amount, 2, '.', '') .
//                    $currency .
//                    strtoupper(md5($merchant_secret))
//                )
//            );
//
//            $row['hash'] = $hash;
//
//            $stmt2 = $conn->prepare("INSERT INTO purchase (isbn, userId) VALUES (?, ?)");
//            $stmt2->bind_param("ss", $isbn, $userId);
//            $stmt2->execute();
//            $stmt2->close();
        $row=$this->eBookObj->BuyBooks($isbn,$userId);


            echo json_encode(['status' => 'success', 'data' => $row]);
//        } else {
//            echo json_encode(['status' => 'error', 'message' => 'Book not found']);
//        }


//        $stmt->close();
//        $conn->close();
    }
}

$buyControllerObj=new BuyController();
$buyControllerObj->Buy();
?>