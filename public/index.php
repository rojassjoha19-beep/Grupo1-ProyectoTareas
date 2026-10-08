<?php
   // Carga inicializador
   require_once "../app/init.php";
   $router = new Routes();

   // =========================================================================
   // RUTAS API REST - AUTENTICACIÓN
   // =========================================================================
   $router->post('/api/auth/login', ['AuthController', 'login']);
   $router->post('/api/auth/register', ['AuthController', 'register']);
   $router->post('/api/auth/reset-password', ['AuthController', 'resetPassword']);
   $router->put('/api/auth/update-password', ['AuthController', 'updatePassword']);
   $router->get('/api/auth/check-session', ['AuthController', 'checkSession']);
   $router->post('/api/auth/logout', ['AuthController', 'logout']);

   // =========================================================================
   // RUTAS API REST - TAREAS Y ESTADOS
   // =========================================================================
   
   // Obtener la lista de estados para los selects
   $router->get('/api/estados', ['TareaController', 'estados']);

   // Obtener listado de tareas (opcionalmente filtrado por id_estado)
   $router->get('/api/tareas', ['TareaController', 'index']);
   $router->get('/api/tareas/estado/{id}', ['TareaController', 'index']);

   // Obtener detalle de una tarea por ID
   $router->get('/api/tareas/{id}', ['TareaController', 'show']);

   // Crear una nueva tarea
   $router->post('/api/tareas', ['TareaController', 'store']);

   // Actualizar una tarea existente por ID
   
   $router->patch('/api/tareas/{id}', ['TareaController', 'update']);
   

   // Eliminar una tarea por ID
   $router->delete('/api/tareas/{id}', ['TareaController', 'destroy']);

   // Despachar la solicitud
   $router->dispatch();
?>