<?php
include 'DbConnector.php';

class DatabaseHandler extends DbConnector
{
    public function getPostData($category, $post_id, $user_id, $user_id1)
    {
        $data = array();
        $sql = "SELECT * FROM post_table";

        if (!empty($post_id)) {
            $sql .= " WHERE post_id = '$post_id'";
        }
        if (!empty($category)) {
            $sql .= " WHERE category = '$category'";
        }
        if (!empty($user_id)) {
            $sql = "SELECT A.* FROM post_table A, post_user_table B 
            WHERE A.post_id = B.post_id AND B.user_id = '$user_id';";

            $result = $this->connect()->query($sql);

            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            return $data;
        }
        if (!empty($user_id1)) {
            $sql = "SELECT * FROM post_table A 
            WHERE user_id = '$user_id1';";

            $result = $this->connect()->query($sql);

            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            return $data;
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

    public function getUserPostData($user_id)
    {
        $data = array();
        $sql = "SELECT * from post_user_table WHERE user_id='$user_id';";

        $result = $this->connect()->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function removeUserPostData($user_id, $post_id)
    {
        $sql = "DELETE FROM post_user_table WHERE user_id='$user_id' AND post_id='$post_id';";

        $result = $this->connect()->query($sql);
        return $result;
    }

    public function addUserPostDetails($post_id, $user_id)
    {
        $sql = "INSERT INTO post_user_table(user_id,post_id) VALUES('$user_id','$post_id');";

        $result = $this->connect()->query($sql);
        return $result;
    }

    public function removePosts($post_id)
    {
        $sql = "DELETE FROM post_table WHERE post_id='$post_id';";

        $result = $this->connect()->query($sql);
        return $result;
    }
}
