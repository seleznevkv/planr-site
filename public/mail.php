<?php

$method = $_SERVER['REQUEST_METHOD'];

$c = true;
$message = "";

if ($method === 'POST') {

    $project_name = trim($_POST["project_name"] ?? '');
    $admin_email  = trim($_POST["admin_email"] ?? '');
    $form_subject = trim($_POST["form_subject"] ?? '');

    foreach ($_POST as $key => $value) {
        if ($value != "" && !in_array($key, ["project_name", "admin_email", "form_subject"])) {
            // УБРАЛИ echo!
            $message .= "
            " . (($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">') . "
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>";
        }
    }
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . PHP_EOL .
    'X-Mailer: PHP/' . phpversion();

$mail_sent = mail($admin_email, adopt($form_subject), $message, $headers);

// Логирование
file_put_contents('contacts.html', $message . "\n--- " . date('Y-m-d H:i:s') . " --- Mail sent: " . ($mail_sent ? 'YES' : 'NO') . "\n\n", FILE_APPEND);

// Важно! Чистый ответ для JavaScript
if ($mail_sent) {
    echo "success";
} else {
    echo "error";
}
