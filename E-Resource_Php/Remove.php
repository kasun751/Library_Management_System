<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);
$method=$_SERVER['REQUEST_METHOD'];
switch ($method){
    case "GET":
        break;

    case "POST":
        if (isset($data['isbn'])) {
            $isbn = $data['isbn'];

            $dbCon = new database();
            $conn = $dbCon->dbConnect();


            if ($conn->connect_error) {
                echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
                exit();
            }

            $sql2 = "SELECT * FROM ebook WHERE isbn=?";
            $stmt = $conn->prepare($sql2);
            if (!$stmt) {
                echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
                exit();
            }
            $stmt->bind_param('i', $isbn);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $sql3 = "DELETE FROM ebook WHERE id=?";
                $stmt = $conn->prepare($sql3);
                if (!$stmt) {
                    echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
                    exit();
                }
                $stmt->bind_param('i', $isbn);
                $stmt->execute();

                echo json_encode(['resultMessage' => 'affected rows are deleted']);
            } else {
                echo json_encode(['resultMessage' => 'No rows affected', 'error' => 'Record not found']);
            }

            $stmt->close();
            $conn->close();
        } else {
            echo json_encode(['resultMessage' => 'Required fields are missing.']);
        }
}



