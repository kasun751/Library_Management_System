<?php

include_once __DIR__ . '/../DbConnection/database.php';
class EBook
{
    private $conn;

    public function __construct()
    {
        $dbcon = new database();
        $this->conn = $dbcon->dbConnect();

    }

    public function GetTotalPages($limit)
    {

        $sql = "SELECT COUNT(*) as total FROM ebook";
        $result = $this->conn->query($sql);
        $totalBooks = $result->fetch_assoc()['total'];
        $totalPages = ceil($totalBooks / $limit);

        return $totalPages;

    }

    public function ViewBookDetails($limit, $offset)
    {

        $sql = "SELECT isbn, title, price,volume,version, author, category, description, image_path, pdf_path,citations 
        FROM ebook 
        ORDER BY isbn DESC 
        LIMIT $limit OFFSET $offset";
        $result = $this->conn->query($sql);

        return $result;
    }

    public function AddBook($isbn, $title, $price, $volume,$version,$author, $category, $description, $newFileName, $newFileName1,$citations)
    {

        $sql = "INSERT INTO ebook (isbn, title,price,volume,version,author, category, description, pdf_path,image_path,citations)
                    VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?)";

        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('sssssssssss', $isbn, $title, $price,$volume,$version,  $author,$category, $description, $newFileName, $newFileName1,$citations);
        $result = $stmt->execute();

        return $result;
    }

    public function GetPath($isbn)
    {

        $sql1 = "SELECT pdf_path, image_path FROM ebook WHERE isbn = ?";
        $stmt = $this->conn->prepare($sql1);
        $stmt->bind_param('s', $isbn);
        $stmt->execute();
        $stmt->bind_result($currentPdfPath, $currentImagePath);
        $stmt->fetch();

        return ['pdf_path' => $currentPdfPath, 'image_path' => $currentImagePath];
    }

    public function UpdateBook($title, $price, $author,$volume,$version, $category, $description, $newFileName, $newFileName1,$citations, $isbn)
    {

        $sql2 = "UPDATE ebook SET title=?, price=?, author=?,volume=?,version=?, category=?, description=?, pdf_path=?, image_path=? ,citations=? WHERE isbn=?";
        $stmt = $this->conn->prepare($sql2);

        if ($stmt === false) {
            die("Prepare failed: " . htmlspecialchars($this->conn->error));
        }

        $stmt->bind_param('sssssssssss', $title, $price, $author,$volume,$version, $category, $description, $newFileName, $newFileName1,$citations, $isbn);
        $result = $stmt->execute();

        return $result;
    }

    public function DeleteBook($isbn)
    {
        $sql3 = "DELETE FROM ebook WHERE isbn=?";
        $stmt = $this->conn->prepare($sql3);
        $stmt->bind_param('s', $isbn);
        $stmt->execute();
        $stmt->close();
    }

    public function ViewPurchasedBooks($userId)
    {
        $stmt = $this->conn->prepare(
            "SELECT * FROM ebook, purchase, user 
     WHERE ebook.isbn = purchase.isbn 
     AND user.userId = purchase.userId 
     AND user.userId = ?"
        );
        $stmt->bind_param('s', $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $books = [];
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }

        return $books;
    }

    public function GetPDF($isbn)
    {
        $query = "SELECT pdf_path FROM ebook WHERE isbn = ?";
        $stmt = $this->conn->prepare($query);

        $stmt->bind_param('s', $isbn);
        $stmt->execute();
        $stmt->bind_result($pdf_path);
        $stmt->fetch();

        return $pdf_path;
    }

    public function BuyBooks($isbn, $userId)
    {
        $stmt = $this->conn->prepare("SELECT * FROM ebook WHERE isbn = ?");
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

            $stmt2 = $this->conn->prepare("INSERT INTO purchase (isbn, userId) VALUES (?, ?)");
            $stmt2->bind_param("ss", $isbn, $userId);
            $stmt2->execute();
            $stmt2->close();

            return $row;
        }


    }
}