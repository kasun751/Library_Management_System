<?php
include 'DbConnector.php';

class DatabaseHandler extends DbConnector
{
    public function getPostData($category, $post_id)
    {
        $data = array();
        $sql = "SELECT * FROM post_table";

        if (!empty($post_id)) {
            $sql .= " WHERE post_id = '$post_id'";
        }
        if (!empty($category)) {
            $sql .= " WHERE category = '$category'";
        }

        $result = $this->connect()->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function getReplyData($post_id)
    {
        $data = array();
        $sql = "SELECT * FROM reply_table";

        if (!empty($post_id)) {
            $sql .= " WHERE post_id = '$post_id'";
        }

        $result = $this->connect()->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function insertReply($post_id, $user_id, $reply_msg)
    {
        $sql = "INSERT INTO reply_table (reply_id, post_id, user_id, reply_msg, report_status) VALUES (null, '$post_id', '$user_id', '$reply_msg', 0);";
        $result = $this->connect()->query($sql);
        return $result === true;
    }

    public function updateTable($report_status, $reply_id)
    {
        $sql = "UPDATE reply_table SET report_status='$report_status' WHERE reply_id='$reply_id'";
        $result = $this->connect()->query($sql);
        return $result;
    }

    public function insertPost($user_id, $title, $description, $category)
    {
        $sql = "INSERT INTO post_table(post_id, user_id, title, description, category, report_status) VALUES (null, '$user_id', '$title', '$description', '$category', 0)";
        $result = $this->connect()->query($sql);
        return $result;
    }

    public function updatePostTable($title, $category, $description, $post_id)
    {
        $sql = "UPDATE post_table 
        SET title='$title',
            category='$category',
            description='$description' 
        WHERE post_id='$post_id';";

        $result = $this->connect()->query($sql);
        return $result;
    }
}
