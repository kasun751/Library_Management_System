<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';
// Check if the request method is OPTIONS and respond with 200 OK

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
break;

    case "POST":
        //Access the object key properties
        $newCategory = $data['addCategory'];
        $access_parameter=$data['access_parameter'];

        if (strlen($newCategory)>0) {
            $getData = new SqlQuery();

            switch ($access_parameter){
                case "add":
                    $result = $getData->createNewCategoryTable($newCategory);
                    $result1=$getData->CategoryTableUpdate($newCategory);
                    if ($result > 0 && $result1 > 0 ) {
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    } else if ($result == 0 || $result1 == 0 ) {
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                    break;

                case "remove":
                    $result1 = $getData->dropCategoryTable($newCategory);
                    $result2 = $getData->dropCategoryDetails($newCategory);
                    if ($result1 > 0 && $result2 > 0) {
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    } else if ($result1 == 0 || $result2 == 0) {
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                    break;
            }

        } else {
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }


}

?>
