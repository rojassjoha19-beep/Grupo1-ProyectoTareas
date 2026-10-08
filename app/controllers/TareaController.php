
<?php

class TareaController extends BaseController
{
    private $tareaModel;
    private $estadoModel;

    public function __construct()
    {
        $this->tareaModel = $this->model('TareaModel');
        $this->estadoModel = $this->model('EstadoModel');
    }

    /**
     * GET /api/tareas
     * GET /api/tareas/estado/{id_estado}
     *
     * Obtiene el listado de tareas del usuario autenticado.
     * Si id_estado = 0, obtiene todas.
     */
    public function index($id_estado = 0)
    {
        $tareas = $this->tareaModel->buscarTareas($id_estado);

        $this->jsonResponse([
            'ok' => true,
            'tareas' => $tareas
        ]);
    }

    /**
     * GET /api/estados
     *
     * Obtiene la lista de estados disponibles.
     */
    public function estados()
    {
        $estados = $this->estadoModel->buscar_estados();

        $this->jsonResponse([
            'ok' => true,
            'estados' => $estados
        ]);
    }

    /**
     * GET /api/tareas/{id_tarea}
     *
     * Obtiene el detalle de una tarea.
     */
    public function show($id_tarea = null)
    {
        if (!$id_tarea) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'ID de tarea no proporcionado.'
            ], 400);
        }

        $tarea = $this->tareaModel->tareaById($id_tarea);

        $this->jsonResponse([
            'ok' => true,
            'tarea' => $tarea
        ]);
    }

    /**
     * POST /api/tareas
     *
     * Crea una nueva tarea para el usuario autenticado.
     */
    public function store()
    {
        $datos = $this->getJsonBody();

        if (empty($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Usuario no autenticado.'
            ], 401);
        }

        $data = [
            'titulo' => trim($datos['titulo'] ?? ''),
            'descripcion' => trim($datos['descripcion'] ?? ''),
            'expired_at' => $datos['expired_at'] ?? null,
            'id_estado' => $datos['id_estado'] ?? 1,
            'id_usuario' => $_SESSION['user_id']
        ];

        if (empty($data['titulo'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El título es obligatorio.'
            ], 400);
        }

        $creado = $this->tareaModel->altaTarea($data);

        if ($creado) {
            $id_tarea = $this->tareaModel->ultimoId();

            $this->jsonResponse([
                'ok' => true,
                'mensaje' => 'Tarea creada exitosamente.',
                'id_tarea' => $id_tarea
            ], 201);
        }

        $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'No se pudo crear la tarea.'
        ], 500);
    }

/**
 * PATCH /api/tareas/{id_tarea}
 *
 * Actualiza una tarea existente.
 */
public function update($id_tarea = null)
{
    if (!$id_tarea) {
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
    ]);
}



    /**
     * DELETE /api/tareas/{id_tarea}
     *
     * Elimina una tarea mediante soft-delete.
     */
    public function destroy($id_tarea = null)
    {
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
        ]);
    }
}

