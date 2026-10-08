<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once(RUTA_APP . "/external/Mailer/src/PHPMailer.php");
include_once(RUTA_APP . "/external/Mailer/src/SMTP.php");
include_once(RUTA_APP . "/external/Mailer/src/Exception.php");

// 1. Obtener email de la petición o del controlador
$destinatario = $email ?? $_POST['email'] ?? '';

// 2. Generar nueva contraseña temporal y actualizar en BD
$new_pass = create_pass(8);
$this->authModel->change_pass($new_pass, $destinatario);

// 3. Definir plantilla HTML estilizada
$link = RUTA_URL . "/update-password";


$body = "
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 30px 10px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            overflow: hidden;
        }
        .header {
            background-color: #0d6efd;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
        .content {
            padding: 25px;
            color: #333333;
            line-height: 1.5;
        }
        .pass-box {
            background-color: #f1f3f5;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 3px;
            color: #0d6efd;
            margin: 20px 0;
        }
        .btn {
            display: block;
            width: 200px;
            margin: 20px auto 0;
            padding: 12px 0;
            background-color: #0d6efd;
            color: #ffffff !important;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            font-size: 14px;
        }
        .footer {
            border-top: 1px solid #e9ecef;
            padding: 15px 25px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Administrador de Tareas</h1>
        </div>
        <div class='content'>
            <p>Hola,</p>
            <p>Recibimos una solicitud para restablecer tu cuenta. Tu nueva contraseña temporal de acceso es:</p>
            
            <div class='pass-box'>{$new_pass}</div>
            
            <p>Ingresá al sistema con esta clave y actualizala inmediatamente haciendo clic en el siguiente botón:</p>
            
            <a href='{$link}' class='btn'>Cambiar Contraseña</a>
        </div>
        <div class='footer'>
            <p>Si no solicitaste este cambio, podés ignorar este correo.<br>Equipo de <b>UNLZ</b></p>
        </div>
    </div>
</body>
</html>
";

// 4. Configurar y enviar correo
$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->SMTPAuth   = true;
$mail->Host       = MAIL_HOST;
$mail->Username   = MAIL_USER;
$mail->Password   = MAIL_PASS;
$mail->Port       = MAIL_PORT;
$mail->SMTPSecure = (MAIL_PORT == 465) ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
$mail->CharSet    = 'UTF-8';

// Bypass de SSL para desarrollo local
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer'       => false,
        'verify_peer_name'  => false,
        'allow_self_signed' => true
    )
);

$mail->setFrom(MAIL_USER, 'ADMINISTRADOR TAREAS');
$mail->addAddress($destinatario);

$mail->isHTML(true);
$mail->Subject = 'Recupero de Contraseña';
$mail->Body    = $body;
$mail->AltBody = "Hola, tu nueva contraseña es: {$new_pass}. Ingresá a {$link} para cambiarla.";

$mail->send();