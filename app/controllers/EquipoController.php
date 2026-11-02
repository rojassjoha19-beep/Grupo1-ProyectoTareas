
<?php

class EquipoController extends BaseController
{
    
    private $equipoModel;

    public function __construct()
    {
       
        $this->equipoModel = $this->model('EquipoModel');
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
        ],400);
          }
        //ver codigos exactos 
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
        if (!$this->equipoModel->esLider($usuario_id)) {
               $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Solo un líder puede crear equipos.'
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

         $equipoId = $this->equipoModel->crearEquipo($nombre, $usuario_id);

          if (!$equipoId) {
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

/**
 * PATCH /api/tareas/{id_tarea}
 *
 * Actualiza una tarea existente.
 */
public function update($id_tarea = null)
{
    
  /*   if (!$id_tarea) {
        $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'ID de tarea no válido.'
        ], 400);
    }

    $datos = $this->getJsonBody();

    $data = [
        'titulo' => trim($datos['titulo'] ?? ''),
        'descripcion' => trim($datos['descripcion'] ?? ''),
        'expired_at' => $datos['expired_at'] ?? null,
        'id_estado' => $datos['id_estado'] ?? 1,
        'id_tarea' => $id_tarea
    ];

    if (empty($data['titulo'])) {
        $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'El título es obligatorio.'
        ], 400);
    }

    $actualizado =
        $this->tareaModel->updateTarea($data);

    $this->jsonResponse([
        'ok' => (bool) $actualizado,
        'mensaje' => $actualizado
            ? 'Tarea actualizada correctamente.'
            : 'Sin cambios realizados.'
    ]); */
}



    /**
     * DELETE /api/tareas/{id_tarea}
     *
     * Elimina una tarea mediante soft-delete.
     */
    public function destroy($id_tarea = null)
    {/* 
        if (!$id_tarea) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'ID de tarea no provisto.'
            ], 400);
        }

        $eliminado = $this->tareaModel->eliminarTarea($id_tarea);

        $this->jsonResponse([
            'ok' => (bool) $eliminado,
            'mensaje' => $eliminado
                ? 'Tarea eliminada exitosamente.'
                : 'Error al intentar eliminar la tarea.'
        ]); */
    }
}

