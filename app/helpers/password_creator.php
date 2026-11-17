<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once RUTA_APP . "/external/Mailer/src/PHPMailer.php";
require_once RUTA_APP . "/external/Mailer/src/SMTP.php";
require_once RUTA_APP . "/external/Mailer/src/Exception.php";

function create_pass($chars){
    $str = '0123456789!#$%&/()=?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $pass = '';
    $max = strlen($str) - 1;

    for ($i = 0; $i < $chars; $i++) {
        $pass .= $str[random_int(0, $max)];
    }

    return $pass;
}
//Envía un correo y devuelve true si salió bien o false si falló.

function enviarCorreo($destino, $asunto, $htmlBody){
    try {
        $mail = new PHPMailer(true);
        //new PHPMailer(true): crea el objeto. El true hace que los errores se lancen
        // como excepciones, para poder capturarlos.
        $mail->isSMTP();
        //isSMTP(): indica que se enviará por SMTP (un servidor de correo)
        //  y no con la función mail() de PHP.
        
        $mail->SMTPAuth   = true;
        //SMTPAuth = true: el servidor exige usuario y contraseña.
        $mail->Host       = MAIL_HOST;
        $mail->Username   = MAIL_USER;
        $mail->Password   = MAIL_PASS;
        $mail->Port       = MAIL_PORT;
        $mail->SMTPSecure = (MAIL_PORT == 465)
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom(MAIL_USER, NOMBRESITIO);
        $mail->addAddress($destino);
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body    = $htmlBody;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Error al enviar correo: ' . $e->getMessage());
        return false;
    }
}