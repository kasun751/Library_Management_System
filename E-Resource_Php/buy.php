<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'database.php';

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Handling book details fetch
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['isbn']) && isset($data['userId'])) {
    $isbn = $data['isbn'];
    $userId = $data['userId'];

    $dbcon = new database();
    $conn = $dbcon->dbConnect();

    if ($conn->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM ebook WHERE isbn = ?");
    $stmt->bind_param("s", $isbn);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();

        $merchant_id = "1227044";
        $order_id = $row['isbn'];
        $amount = $row['price'];
        $currency = "LKR";
        $merchant_secret = "Mjk3ODYzMTcxMDExMDAxOTc1OTY2MzkyOTQ3NTEyMjgzNTIwNjg1";

        $hash = strtoupper(
            md5(
                $merchant_id .
                $order_id .
                number_format($amount, 2, '.', '') .
                $currency .
                strtoupper(md5($merchant_secret))
            )
        );

        $row['hash'] = $hash;

        echo json_encode(['status' => 'success', 'data' => $row]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Book not found']);
    }

    $stmt->close();
    $conn->close();
}
// Handling payment notification from PayHere
elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['merchant_id'])) {
    //sent by the payhere payment gate to the notify url and this data is posted to the server after the payment process is complete
    //details from payhere sandbox js page
    $merchant_id = $_POST['merchant_id'];
    $order_id = $_POST['order_id'];
    $payhere_amount = $_POST['payhere_amount'];
    $payhere_currency = $_POST['payhere_currency'];
    $status_code = $_POST['status_code'];
    $md5sig = $_POST['md5sig'];
    $userId = $_POST['custom_1'];

    $merchant_secret = 'Mjk3ODYzMTcxMDExMDAxOTc1OTY2MzkyOTQ3NTEyMjgzNTIwNjg1';

    $local_md5sig = strtoupper(
        md5(
            $merchant_id .
            $order_id .
            $payhere_amount .
            $payhere_currency .
            $status_code .
            strtoupper(md5($merchant_secret))
        )
    );

    if (($local_md5sig === $md5sig) AND ($status_code == 2) ) {
        // Update database as payment success
        $dbcon = new database();
        $conn = $dbcon->dbConnect();

        if ($conn->connect_error) {
            echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
            exit();
        }

        // Check if table for user exists, create if not
        $table_name = 'purchases_' . $userId;
        $check_table_query = "SHOW TABLES LIKE '$table_name'";
        $result = $conn->query($check_table_query);

        if ($result->num_rows == 0) {
            // Create table if table does not exist
            $create_table_query = "CREATE TABLE $table_name (
                isbn VARCHAR(255) NOT NULL,
                userID VARCHAR(255) NOT NULL,
                purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY isbn REFERENCES ebook(isbn),
                FOREIGN KEY userID REFERENCES user(userID),
            )";
            $conn->query($create_table_query);
        }

        // Insert purchase record into the user's table
        $stmt = $conn->prepare("INSERT INTO $table_name (isbn,userId) VALUES (?,?)");
        $stmt->bind_param("ss", $order_id,$userId);
        $stmt->execute();

        $stmt->close();
        $conn->close();
    }
}
?>
