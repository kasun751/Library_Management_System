<?php
include_once __DIR__ . '/../DbConnection/database.php';
class EPastPaper
{
    private $conn;

    public function __construct()
    {
        $dbcon = new database();
        $this->conn = $dbcon->dbConnect();

    }

    public function ViewPastPaperDetails(){

        $sql = "SELECT * FROM epastpapers";
        $result = $this->conn->query($sql);

        return $result;
    }

    public function AddPastPaper($id, $subject,$grade, $year, $extra ,$newFileName1, $newFileName){

        $sql = "INSERT INTO epastpapers (id, subject,grade, year, extra_details, image_path,pdf_path)
                    VALUES (?, ?, ?, ?, ?, ?,?)";

        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('sssssss',  $id, $subject,$grade, $year, $extra ,$newFileName1, $newFileName);
        $result=$stmt->execute();
    }

    public function GetPath($id){

        $sql1 = "SELECT pdf_path, image_path FROM epastpapers WHERE id = ?";
        $stmt = $this->conn->prepare($sql1);
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($currentPdfPath, $currentImagePath);
        $stmt->fetch();
        $stmt->close();

        return ['pdf_path' => $currentPdfPath, 'image_path' => $currentImagePath];
    }

    public function UpdatePastPaper($subject,  $grade,$year, $extra, $newFileName, $newFileName1, $id){

        $sql2 = "UPDATE epastpapers SET subject=?, grade=?,year=?, extra_details=?, pdf_path=?, image_path=? WHERE id=?";
        $stmt = $this->conn->prepare($sql2);

        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('sssssss', $subject,  $grade,$year, $extra, $newFileName, $newFileName1, $id);
        $result=$stmt->execute();

        return $result;
    }

    public function DeletePastPaper($id){
        $sql = "DELETE FROM epastpapers WHERE id=?";
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

    public function GetPastPapersNextId(){
        $sql = $this->conn->prepare('SELECT Id FROM epastpapers WHERE Id ORDER BY Id DESC LIMIT 1');
        $sql->execute();
        $result=$sql->get_result();
        $row = $result->fetch_assoc();
        $next_id = $row['Id'] + 1;

        return $next_id;
    }
}