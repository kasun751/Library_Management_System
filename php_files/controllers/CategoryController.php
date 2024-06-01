<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/Category.php';

class CategoryController
{
    private $catObj;

    public function __construct()
    {
        $this->catObj = new Category();
    }

    public function handleRequest()
    {

        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "GET":
                $categoryList = $this->catObj->getCategoryList();
                if (count($categoryList) > 0) {
                    echo json_encode($categoryList);
                } else {
                    $this->respondWithError();
                }
                break;

            case "POST":

                $newCategory = $data['addCategory'];
                $access_parameter = $data['access_parameter'];

                if (strlen($newCategory) > 0) {

                    switch ($access_parameter) {
                        case "add":
                            $result1 = $this->catObj->createNewCategoryTable($newCategory);
                            $result2 = $this->catObj->CategoryTableUpdate($newCategory);
                            $this->handleResult($result1, $result2);
                            break;

                        case "remove":
                            $result1 = $this->catObj->dropCategoryTable($newCategory);
                            $result2 = $this->catObj->dropCategoryDetails($newCategory);
                            $this->handleResult($result1, $result2);
                            break;
                        default:
                            $this->respondWithError();
                            break;
                    }

                } else {
                    $this->respondWithError();
                }
                break;

            default:
                $this->respondWithError();
                break;
        }
    }

    private function handleResult($result1, $result2)
    {
        if ($result1 > 0 && $result2 > 0) {
            $this->respondWithSuccess();
        } else {
            $this->respondWithError();
        }
    }

    private function respondWithSuccess()
    {
        $data = array('resultMessage' => 'true');
        echo json_encode($data);
    }

    private function respondWithError()
    {
        $data = array('resultMessage' => 'false');
        echo json_encode($data);
    }
}
$categoryController = new CategoryController();
$categoryController->handleRequest();
?>
