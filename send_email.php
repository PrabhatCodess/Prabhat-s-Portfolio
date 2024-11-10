<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['First Name']);
    $lastName = htmlspecialchars($_POST['Last Name']);
    $email = htmlspecialchars($_POST['Email']);
    $message = htmlspecialchars($_POST['Message']);
    
    // Email recipient
    $to = "Pd1973dwivedi@gmail.com"; 
    $subject = "Contact Form Submission from $firstName $lastName";
    $body = "You have received a new message from your website contact form.\n\n".
            "Here are the details:\n\n".
            "First Name: $firstName\n".
            "Last Name: $lastName\n".
            "Email: $email\n\n".
            "Message:\n$message";

    // Optional: Handle file attachment
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
        $attachment = $_FILES['attachment']['tmp_name'];
        $fileName = $_FILES['attachment']['name'];
        
        // Handle file attachment, for example, using PHPMailer
    }

    // Send email (using mail() function or PHPMailer)
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message could not be sent.";
    }
} else {
    echo "Form was not submitted correctly.";
}



if (mail("Pd1973dwivedi@gmail.com", "Test Subject", "Test Message", "From: test@example.com")) {
    echo "Mail sent successfully!";
} else {
    echo "Mail could not be sent.";
}


?>
