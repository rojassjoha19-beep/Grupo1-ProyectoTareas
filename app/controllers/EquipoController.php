
<?php

class EquipoController extends BaseController
{
    
    private $equipoModel;
    private $usuarioModel;

    public function __construct()
    {
       
        $this->equipoModel = $this->model('EquipoModel');
        $this->usuarioModel = $this->model('UsuarioModel');
    }

    //sesion requerida para usar segun usuario logueado, si no hay manda 401.
    // $usuario_id = $this->requireSesion(); EN CADA METODO
      private function requireSesion() {
        if (!isset($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Sin sesión activa'
            ], 401);
        }

        return (int)$_SESSION['user_id'];
    }




    /**
     * GET /api/equipos
     * GET /api/equipos/{id_equipo}
     * Equipos a los que pertenece el usuario
     *
     * 
     */

   
    public function index() {
        
        $usuario_id = $this->requireSesion();

        if (!$this->usuarioModel->tienePermiso($usuario_id, 'equipos.ver')) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No posee permisos necesarios'
            ], 403);
        }

        $equipos = $this->equipoModel->equiposDelUsuario($usuario_id);

        $this->jsonResponse([
            'ok' => true,
            'equipos' => $equipos
        ]);
    }
    


    /**
     * GET /api/equipos/id
     *
     * Obtiene el detalle de un euipo.
     */
    public function show($id = null)
    {
        $usuario_id = $this->requireSesion();


         if (!$this->usuarioModel->tienePermiso($usuario_id, 'equipos.ver')) {
             $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'No posee permisos necesarios'
            ], 403);
         }

        if (!$id) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'ID de equipo no valido.'
            ], 400);
        }

         $id = (int)$id;
         
         $equipo = $this->equipoModel->obtenerEquipo($id);

        if (!$equipo) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El equipo no existe.'
            ], 404);
        }

        if (!$this->equipoModel->esMiembro($id, $usuario_id)){
            $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'No es miembro de este equipo.'
            ],403);
        }

        
     $miembros = $this->equipoModel->obtenerMiembros($id);

        $this->jsonResponse([
            'ok' => true,
            'equipo' => $equipo,
            'miembros' => $miembros,
            'es_lider' => $this->equipoModel->esLiderDeEquipo($id, $usuario_id)
        ]);
    }

    /**
     * POST /api/equipo
     *
     * Crea una nuevo equipo- el que lo crea es el lider. 
     * 
     */
    public function store()
    {
       $usuario_id = $this->requireSesion();
    //verifica si tiene permiso de crear equipo, sino manda 403
            if (!$this->usuarioModel->tienePermiso($usuario_id, 'equipos.crear')) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No posee permisos necesarios'
            ], 403);
        }

        $data   = $this->getJsonBody();


        $nombre = trim((string)($data['nombre'] ?? ''));

        if (empty($data['nombre'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El nombre del equipo es obligatorio'
            ], 400);
        }

           if (mb_strlen($nombre) > 50) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El nombre no puede superar los 50 caracteres'
            ], 400);
        }

         $equipo_id = $this->equipoModel->crearEquipo($nombre, $usuario_id);

          if (!$equipo_id) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No se pudo crear el equipo'
            ], 500);
          }

            $this->jsonResponse([
                'ok' => true,
                'mensaje' => 'Equipo creado exitosamente.',
                'id' => $equipo_id
            ], 201);

        
    }

    /* *
     * PUT /api/equipos/{id}
     * Body: { "nombre": "Nuevo nombre" }
     *
     * Cambia el nombre de un equipo. Requiere el permiso equipos.editar. VER PERMISOS DE LIDER + CAMBIAR LIDER 
      *$router->put('/api/equipos/{id}', ['EquipoController', 'update']);
    /* public function update($id = null)
    {
        $usuario_id = $this->requireSesion();

        if (!$this->usuarioModel->tienePermiso($usuario_id, 'equipos.editar')) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No posee permisos necesarios'
            ], 403);
        }

        if (!$id || !ctype_digit((string)$id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'ID de equipo no válido.'
            ], 400);
        }

        $id = (int)$id;

        $equipo = $this->equipoModel->obtenerEquipo($id);

        if (!$equipo) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El equipo no existe.'
            ], 404);
        }

        $data   = $this->getJsonBody();
        $nombre = trim((string)($data['nombre'] ?? ''));

        if ($nombre === '') {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El nombre del equipo es obligatorio'
            ], 400);
        }

        if (mb_strlen($nombre) > 50) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El nombre no puede superar los 50 caracteres'
            ], 400);
        }

        if (!$this->equipoModel->actualizarEquipo($id, $nombre)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No se pudo actualizar el equipo.'
            ], 500);
        }

        $this->jsonResponse([
            'ok' => true,
            'mensaje' => 'Equipo actualizado correctamente.'
        ]);
    } */
 

        /**
         * Eliminar equipo
         * DELETE /api/equipos/{id}
         * Si tiene tareas, requiere confirmar, 
         *DELETE /api/equipos/{id}?confirmar=1
         * 
         */
        public function destroy($id = null)
        {
            usuario_id=$this->requireSesion();
            
            if( !$this->usuarioModel->tienePermiso($usuario_id, 'equipos.eliminar')) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'No posee permisos necesarios'
                ], 403);
            }

            if(!id || !ctype_digit((string)$id)) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'ID de equipo no válido.'
                ], 400);
            }
            $id = (int)$id;

            $equipo = $this->equipoModel->obtenerEquipo($id);

            if (!$equipo) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'El equipo no existe.'
                ], 404);

            }
            // Confirmacion con tareas 

            $total_tareas = $this->equipoModel->contarTareas($id);
            $confirmar = ($_GET['confirmar'] ?? '') === '1';

            if($total_tareas > 0 && !$confirmar) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'El equipo tiene tareas asignadas. Por favor, confirme la eliminación.'
                    'tareas' => $total_tareas
                ], 409);
            }       

                if($this->equipoModel->eliminarEquipo($id, $total_tareas > 0)) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'No se pudo eliminar el equipo.'
                ], 500);
            }

            $this->jsonResponse([
                'ok' => true,
                'mensaje' => 'Equipo eliminado exitosamente.'

            ])
        }
}

