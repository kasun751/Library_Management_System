<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
class SendMail
{
    public function sendMailMessage($receiverMail,$receiverName,$subject,$message)
    {
        require '../PHPMailer/Exception.php';
        require '../PHPMailer/PHPMailer.php';
        require '../PHPMailer/SMTP.php';
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sajanhirushaportfolio@gmail.com';
            $mail->Password = 'bqdqrjjerftiaofm';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            //Recipients
            $mail->setFrom('sajanhirushaportfolio@gmail.com', $subject);
            $mail->addAddress($receiverMail, $receiverName);

            //Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = "<p> Dear " . $receiverName . "</p>";
            $mail->Body .= $message;
            $mail->send();

        } catch (Exception $e) {
            $message = "Message could not be sent. ";
        }
return true;
    }
}