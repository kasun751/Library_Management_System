<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'DatabaseHandler.php';

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case "GET":
        $post_id = isset($_GET['post_id']) ? $_GET['post_id'] : '';
        $obj = new DatabaseHandler();
        $data = $obj->getReplyData($post_id);
        header('Content-Type: application/json');
        echo json_encode($data);
        break;

    case "POST":
        $requestData = json_decode(file_get_contents('php://input'), true);
        if (isset($requestData['reply_msg']) && isset($requestData['user_id']) && isset($requestData['post_id'])) {
            $reply_msg =  $requestData['reply_msg'];
            $user_id = $requestData['user_id'];
            $post_id = $requestData['post_id'];

            $obj = new DatabaseHandler();
            $success = $obj->insertReply($post_id, $user_id, $reply_msg);

            $response = array('success' => $success, 'message' => $success ? 'Reply sent successfully' : 'Failed to send reply');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
    case "PUT":
        $requestData = json_decode(file_get_contents('php://input'), true);
        if (isset($requestData['reply_id']) && isset($requestData['report_status'])) {
            $reply_id = $requestData['reply_id'];
            $report_status = $requestData['report_status'];

            $obj = new DatabaseHandler();

            $success = $obj->updateTable($report_status, $reply_id);

            $response = array('success' => $success, 'message' => $success ? 'Report successfully' : 'Failed to Report reply');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
}
