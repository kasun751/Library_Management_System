<?php
include_once __DIR__ . '/../DbConnection/database.php';
class ENewsPaper
{
    private $conn;

    public function __construct()
    {
        $dbcon = new database();
        $this->conn = $dbcon->dbConnect();

    }

    public function ViewNewsPapers(){

        $sql = "SELECT * FROM enewspapers";
        $result=$this->conn->query($sql);

        return $result;

    }

    public function AddNewsPaper($id, $title, $date, $description, $newFileName1, $newFileName){

        $sql = "INSERT INTO enewspapers (Id, title, date, description, image_path,pdf_path)
                    VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('ssssss',  $id, $title, $date, $description, $newFileName1, $newFileName);
        $result=$stmt->execute();

        return $result;
    }

    public function GetPath($id){

        $sql1 = "SELECT pdf_path, image_path FROM enewspapers WHERE Id = ?";
        $stmt = $this->conn->prepare($sql1);
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($currentPdfPath, $currentImagePath);
        $stmt->fetch();
        $stmt->close();

        return ['pdf_path' => $currentPdfPath, 'image_path' => $currentImagePath];
    }

    public function UpdateNewsPaper($title,  $date, $description, $newFileName, $newFileName1, $id){
        $sql2 = "UPDATE enewspapers SET title=?, date=?, description=?, pdf_path=?, image_path=? WHERE Id=?";
        $stmt = $this->conn->prepare($sql2);

        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('ssssss', $title,  $date, $description, $newFileName, $newFileName1, $id);
        $result=$stmt->execute();

        return $result;
    }

    public function DeleteNewsPaper($id){
        $sql = "DELETE FROM enewspapers WHERE Id=?";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $this->conn->error]);
            exit();
        }
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $result=$stmt->affected_rows;

        return $result;
    }

    public function GetNewsPapersNewxtId(){
        $sql = $this->conn->prepare('SELECT Id FROM enewspapers WHERE Id ORDER BY Id DESC LIMIT 1');
        $sql->execute();
        $result=$sql->get_result();
        $row = $result->fetch_assoc();
        $next_id = $row['Id'] + 1;

        return $next_id;
    }
}