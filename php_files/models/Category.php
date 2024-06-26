<?php

require_once '../dbConnection/DBConnection.php';

class Category
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function createNewCategoryTable($newCategory)
    {
                $query = "CREATE TABLE $newCategory (
            Final_ID VARCHAR(255) PRIMARY KEY,
            ISBN_Number VARCHAR(255),
            BookName_ID INT DEFAULT 0,
            Book_No INT NOT NULL,
            Availability VARCHAR(255)
        )";

        $result = $this->con->query($query);
        return $result;
    }
    public function CategoryTableUpdate($category)
    {
        $queryCheckExistence = "SELECT COUNT(*) AS category_count FROM category WHERE Category_Name = ?";
        $stmtCheckExistence = $this->con->prepare($queryCheckExistence);
        $stmtCheckExistence->bind_param("s", $category);
        $stmtCheckExistence->execute();
        $resultExistence = $stmtCheckExistence->get_result();

        if ($resultExistence) {
            $row = $resultExistence->fetch_assoc();
            if ($row['category_count'] > 0) {
                $stmtCheckExistence->close();
                return false;
            } else {
                $categoryFirstLetters = $this->categoryLetterCheck($category);

                $queryInsertCategory = "INSERT INTO category (Category_Name) VALUES (?)";
                $stmtInsertCategory = $this->con->prepare($queryInsertCategory);
                $stmtInsertCategory->bind_param("s", $category);
                $stmtInsertCategory->execute();
                $stmtInsertCategory->close();

                $queryGetCategoryNo = "SELECT Category_No FROM category WHERE Category_Name=?";
                $stmtGetCategoryNo = $this->con->prepare($queryGetCategoryNo);
                $stmtGetCategoryNo->bind_param("s", $category);
                $stmtGetCategoryNo->execute();
                $resultCategoryNo = $stmtGetCategoryNo->get_result();
                $row = $resultCategoryNo->fetch_assoc();
                $stmtGetCategoryNo->close();

                $final_ID = $categoryFirstLetters . "/" . $row['Category_No'];

                $queryUpdateCategoryID = "UPDATE category SET Category_ID=? WHERE Category_Name=?";
                $stmtUpdateCategoryID = $this->con->prepare($queryUpdateCategoryID);
                $stmtUpdateCategoryID->bind_param("ss", $final_ID, $category);
                $resultUpdateCategoryID = $stmtUpdateCategoryID->execute();
                $stmtUpdateCategoryID->close();

                if ($resultUpdateCategoryID) {
                    $createTableResult = $this->createNewCategoryTable($category);
                    return $createTableResult;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    public function categoryLetterCheck($category1)
    {
        $charArray1 = str_split(strtoupper($category1));
        if (count($charArray1) >= 3) {
            $firstThreeLetters1 = $charArray1[0] . $charArray1[1] . $charArray1[2];
        } else {
            $firstThreeLetters1 = $charArray1[0] . $charArray1[1];
        }

        $categoryList =  $this->getCategoryList();
        $newArray = [];
        foreach ($categoryList as $item) {
            $newArray[] = $item['Category_Name'];
        }
        foreach ($newArray as $category) {
            if (is_string($category)) {
                $charArray2 = str_split(strtoupper($category));
                if (count($charArray2) >= 3) {
                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1] . $charArray2[2];
                } else {
                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1];
                }
                if ($firstThreeLetters1 === $firstThreeLetters2) {
                    $firstFourLetters = $charArray1[0] . $charArray1[1] . $charArray1[2] . $charArray1[3];
                    return $firstFourLetters;
                }
            }
        }
        return $firstThreeLetters1;
    }

    public function getCategoryList()
    {
        $query = "SELECT DISTINCT Category_Name FROM category";
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        $categoryList = array();
        while ($row = $result->fetch_assoc()) {
            $categoryList[] = $row;
        }
        return $categoryList;
    }

    public function dropCategoryTable($Category)
    {
        $query = "DROP TABLE $Category";
        $result = $this->con->query($query);
        return $result;
    }

    public function checkCategoryTableIsEmpty($category)
    {
        $query = "SELECT COUNT(Final_ID) AS num_rows FROM $category";
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_rows'];
    }

    public function dropCategoryDetails($Category)
    {
        $query = "DELETE FROM category WHERE Category_Name=?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $Category);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            return $this->dropCategoryTable($Category);
        } else {
            return false;
        }
    }

    public function getCategoryNameRelevantToBookID($bookID)
    {
        $bookIdElement = explode("/", $bookID);
        $bookIDFirstElement = $bookIdElement[0];
        $query = "SELECT Category_Name FROM category WHERE SUBSTRING_INDEX(Category_ID, '/', 1) = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bind_param("s", $bookIDFirstElement);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['Category_Name'];
    }

}
//$x=new Category();
//$x->checkCategoryTableIsEmpty('IT');