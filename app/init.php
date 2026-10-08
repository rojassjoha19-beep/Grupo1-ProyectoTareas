<?php
session_start();

// 1. Cargar la clase Env
require_once 'config/Env.php';

// 2. Cargar el archivo .env desde la raíz del proyecto (un nivel arriba de /app)
Env::cargar(dirname(__DIR__) . '/.env');

// 3. Cargar las configuraciones generales
require_once 'config/config.php';

// 4. Cargando helpers
require_once 'helpers/password_creator.php';

// 5. Autoload de clases core
spl_autoload_register(function($className){
    require_once 'core/' . $className . '.php';
});