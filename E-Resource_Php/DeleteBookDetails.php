<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'database.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        break;

    case "POST":
        $dbCon = new Database();
        $conn = $dbCon->dbConnect();

        if (isset($data['id'])) {

            $id = $data['id'];

            $query = "SELECT * FROM ebook WHERE id='$id'";
            $result = $conn->query($query);

            if ($result) {
                $raw = $result->fetch_assoc();
                $title = isset($raw['title']) ? $raw['title'] : '';
                $author = isset($raw['author']) ? $raw['author'] : '';

                $response = array('title' => $title, 'author' => $author);
                echo json_encode($response);
            } else {
                echo json_encode(array('error' => 'No book found with the given ID.'));
            }
        } else {
            echo json_encode(array('error' => 'Book ID not provided.'));
        }

        break;





}

?>