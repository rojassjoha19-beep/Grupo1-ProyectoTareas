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
   // RUTAS API REST - EQUIPOS
   // =========================================================================
   // Obtiene la lista de equipos donde pertenece el usuario
   $router->get('/api/equipos', ['EquipoController', 'index']);
   
   // Obtiene los detalles de un equipo específico por ID
   $router->get('/api/equipos/{id}', ['EquipoController', 'show']);

   // Crea un nuevo equipo. Solo puede hacerlo un usuario con rol Líder.
   $router->post('/api/equipos', ['EquipoController', 'store']);

   //Elimina un equipo Si tiene tareas, requiere confirmar.
   $router->delete('/api/equipos/{id}', ['EquipoController', 'destroy']);

   //Si tiene tareas, requiere confirmar.
   $router->delete('/api/equipos/{id}?confirmar=1', ['EquipoController', 'destroy']);

  
   
      // =========================================================================
   // RUTAS API REST - USUARIOS
   // =========================================================================
   //Carga la lista con nombre, email y rol actual de cada usuario. usuario.id,
                   
   $router->get('/api/usuarios', ['UsuarioController', 'index']);


   // Cambia el rol de un usuario. Solo puede hacerlo un usuario con rol Administrador.
   $router->put('/api/usuarios/{id}/rol', ['UsuarioController', 'cambiarRol']);



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

     // =========================================================================
   // RUTAS API REST - MIEMBROS DE EQUIPO 
   // =========================================================================

   // Agregar un miembro a un equipo. Solo puede hacerlo el lider (se valida en el controller).
   $router->post('/api/equipos/{id}/miembros', ['EquipoMiembroController', 'agregar']);

   // Quitar un miembro de un equipo.
   $router->delete('/api/equipos/{id}/miembros/{usuarioId}', ['EquipoMiembroController', 'quitar']);


   // Despachar la solicitud
   $router->dispatch();
?>