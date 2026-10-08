<?php
// configuracion acceso a la BD
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'db_tareas');

// Ruta de la aplicación
define('RUTA_APP', dirname(dirname(__FILE__)));
// Ruta url

define('RUTA_URL', 'http://localhost/proyecto-tareas');

// Ruta de los recursos públicos


// Rutas que se usan para guardar imágenes
define('RUTA_AVATAR', '/proyecto-tareas/public/img/avatar/');
define('NOMBRESITIO', 'Administrador de tareas');


// Configuración de PHPMailer / Correo
define('MAIL_HOST', $_ENV['MAIL_HOST'] ?? '');
define('MAIL_USER', $_ENV['MAIL_USER'] ?? '');
define('MAIL_PASS', $_ENV['MAIL_PASS'] ?? '');
define('MAIL_PORT', $_ENV['MAIL_PORT'] ?? 587);
