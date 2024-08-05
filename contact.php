<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Load PHPMailer classes
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Initialize response message
$response = "";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and remove whitespace
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit
        $response = "Oops! There was a problem with your submission. Please complete the form and try again.";
    } else {
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = 'yogendra@wealthwisehub.in'; // SMTP username
            $mail->Password = 'YOgi45@#'; // SMTP password
            $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587; // TCP port to connect to

            // Recipients
            $mail->setFrom('yogendra@wealthwisehub.in', 'WealthWise Hub');
            $mail->addAddress('yogendra@wealthwisehub.in'); // Add a recipient

            // Content
            $mail->isHTML(false); // Set email format to plain text
            $mail->Subject = $subject;
            $mail->Body    = "Name: $name\nEmail: $email\n\nSubject: $subject\n\nMessage:\n$message";

            // Send the email
            $mail->send();
            $response = "Thank You! Your message has been sent.";
        } catch (Exception $e) {
            $response = "Oops! Something went wrong and we couldn't send your message. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}

// Output the response message
if (!empty($response)) {
    echo "<p class='response-message'>$response</p>";
}
?>
