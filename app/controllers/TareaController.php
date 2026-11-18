<?php

class TareaController extends BaseController
{
    private $tareaModel;
    private $estadoModel;
    private $equipoMiembroModel;
    private $equipoModel;
    private $permisoModel;
     private $usuarioModel;

    public function __construct()
    {
        $this->tareaModel = $this->model('TareaModel');
        $this->estadoModel = $this->model('EstadoModel');
        $this->equipoMiembroModel = $this->model('EquipoMiembroModel');
        $this->permisoModel = $this->model('PermisoModel');
        $this->usuarioModel = $this->model('UsuarioModel');
        $this->equipoModel = $this->model('EquipoModel');
    }

    /** Devuelve el id del usuario logueado, o responde 401. */
    private function requireSesion()
    {
        if (empty($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Usuario no autenticado.'
            ], 401);
        }

        return (int) $_SESSION['user_id'];
    }

    /** Valida un entero positivo, o responde 400. */
    private function idValido($valor, $mensaje)
    {
        $id = filter_var($valor, FILTER_VALIDATE_INT);

        if ($id === false || $id < 1) {
            $this->jsonResponse(['ok' => false, 'mensaje' => $mensaje], 400);
        }

        return $id;
    }

    /** Responde 403 si el rol del usuario no tiene el permiso. */
    private function exigirPermiso($usuario_id, $permiso)
    {
        if (!$this->permisoModel->tienePermiso($usuario_id, $permiso)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés permiso para realizar esta acción.'
            ], 403);
        }
    }

    /** Carga la relación usuario-tarea, o responde 404 si la tarea no existe. */
    private function cargarAcceso($id_tarea, $usuario_id)
    {
        $acceso = $this->tareaModel->accesoATarea($id_tarea, $usuario_id);

        if (!$acceso) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'La tarea no existe.'
            ], 404);
        }

        return $acceso;
    }

    /**
     * GET /api/tareas
     * GET /api/tareas/estado/{id_estado}
     */
    public function index($id_estado = 0)
    {
        $this->requireSesion();

        $fecha_vencimiento = trim($_GET['fecha_vencimiento'] ?? '');

        if ($fecha_vencimiento !== '') {
            $fecha = DateTimeImmutable::createFromFormat('!Y-m-d', $fecha_vencimiento);
            $erroresFecha = DateTimeImmutable::getLastErrors();

            if (
                !$fecha ||
                ($erroresFecha !== false && ($erroresFecha['warning_count'] > 0 || $erroresFecha['error_count'] > 0)) ||
                $fecha->format('Y-m-d') !== $fecha_vencimiento
            ) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'La fecha de vencimiento no es válida.'
                ], 400);
            }
        } else {
            $fecha_vencimiento = null;
        }

        $tareas = $this->tareaModel->buscarTareas($id_estado, $fecha_vencimiento);

        $this->jsonResponse([
            'ok' => true,
            'tareas' => $tareas
        ]);
    }

    /**
     * GET /api/estados
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
     * Pueden verla: el administrador, el líder del equipo y la persona asignada.
     */
    public function show($id_tarea = null)
    {
        $usuario_id = $this->requireSesion();
        $id_tarea = $this->idValido($id_tarea, 'ID de tarea no válido.');

        $acceso = $this->cargarAcceso($id_tarea, $usuario_id);

        if (!($acceso->es_admin || $acceso->es_lider || $acceso->es_asignado)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés acceso a esta tarea.'
            ], 403);
        }

        $this->exigirPermiso($usuario_id, 'tareas.ver');

        $this->jsonResponse([
            'ok' => true,
            'tarea' => $this->tareaModel->tareaById($id_tarea)
        ]);
    }

    /**
     * POST /api/tareas
     * Sin id_usuario: tarea propia. Con id_usuario: la asigna el líder del equipo.
     */
    public function store()
    {
        $usuario_id = $this->requireSesion();

         if (!$this->usuarioModel->tienePermiso($usuario_id, 'tareas.crear')) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés permiso para crear tareas.'
            ], 403);
        }

        $datos = $this->getJsonBody();

        $titulo = trim($datos['titulo'] ?? '');
        if ($titulo === '') {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El título es obligatorio.'
            ], 400);
        }

        $errorFecha = $this->tareaModel->validarFecha($datos['expired_at'] ?? null);
        if ($errorFecha) {
            $this->jsonResponse(['ok' => false, 'mensaje' => $errorFecha], 400);
        }

        $id_estado = (int) ($datos['id_estado'] ?? 1);
        if (!$this->tareaModel->estadoExiste($id_estado)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El estado indicado no existe.'
            ], 400);
        }

        $asignado = (int) ($datos['id_usuario'] ?? $usuario_id);
        $equipo = !empty($datos['id_equipo']) ? (int) $datos['id_equipo'] : null;

        if ($asignado !== $usuario_id) {
            // Asignar a otra persona: solo el líder del equipo, y a un miembro de ese equipo
            if (!$equipo) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'Falta indicar el equipo.'
                ], 400);
            }

            if (!$this->equipoMiembroModel->esLiderDeEquipo($equipo, $usuario_id)) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'Solo el líder del equipo puede asignar tareas a otros.'
                ], 403);
            }

            if (!$this->equipoMiembroModel->usuarioActivoExiste($asignado)) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'El usuario asignado no existe.'
                ], 400);
            }

            if (!$this->equipoMiembroModel->esMiembro($equipo, $asignado)) {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'El usuario asignado no pertenece al equipo.'
                ], 400);
            }
        } elseif ($equipo && !$this->equipoMiembroModel->esMiembro($equipo, $usuario_id)) {
            // Tarea propia con equipo: tiene que ser un equipo al que pertenece
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No pertenecés a ese equipo.'
            ], 403);
        }

        $data = [
            'titulo' => $titulo,
            'descripcion' => trim($datos['descripcion'] ?? ''),
            'expired_at' => $datos['expired_at'] ?? null,
            'id_estado' => $id_estado,
            'id_usuario' => $asignado,
            'id_equipo' => $equipo
        ];

        $creado = $this->tareaModel->altaTarea($data);

        if ($creado) {
            $this->jsonResponse([
                'ok' => true,
                'mensaje' => 'Tarea creada exitosamente.',
                'id_tarea' => $this->tareaModel->ultimoId()
            ], 201);
        }

        $this->jsonResponse([
            'ok' => false,
            'mensaje' => 'No se pudo crear la tarea.'
        ], 500);
    }

    /**
     * PATCH /api/tareas/{id_tarea}
     * Administrador y líder del equipo: editan todo.
     * Persona asignada (miembro): solo puede cambiar el estado.
     */
    public function update($id_tarea = null)
    {
        $usuario_id = $this->requireSesion();
        $id_tarea = $this->idValido($id_tarea, 'ID de tarea no válido.');

        $acceso = $this->cargarAcceso($id_tarea, $usuario_id);
        $actual = $this->tareaModel->tareaById($id_tarea);
        $datos = $this->getJsonBody();

        $id_estado = (int) ($datos['id_estado'] ?? $actual->fk_id_estado);
        if (!$this->tareaModel->estadoExiste($id_estado)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El estado indicado no existe.'
            ], 400);
        }

        if ($acceso->es_admin || $acceso->es_lider) {
            $this->exigirPermiso($usuario_id, 'tareas.editar');

            $titulo = trim($datos['titulo'] ?? '');
            if ($titulo === '') {
                $this->jsonResponse([
                    'ok' => false,
                    'mensaje' => 'El título es obligatorio.'
                ], 400);
            }

            $fechaActual = substr($actual->expired_at, 0, 10);
            $expired_at = $datos['expired_at'] ?? $fechaActual;

            // Solo se valida la fecha si cambió (una tarea vencida se puede seguir editando)
            if ($expired_at !== $fechaActual) {
                $errorFecha = $this->tareaModel->validarFecha($expired_at);
                if ($errorFecha) {
                    $this->jsonResponse(['ok' => false, 'mensaje' => $errorFecha], 400);
                }
            }

            $actualizado = $this->tareaModel->updateTarea([
                'titulo' => $titulo,
                'descripcion' => trim($datos['descripcion'] ?? ''),
                'expired_at' => $expired_at,
                'id_estado' => $id_estado,
                'id_tarea' => $id_tarea
            ]);
        } elseif ($acceso->es_asignado) {
            $this->exigirPermiso($usuario_id, 'tareas.estado');

            $actualizado = $this->tareaModel->updateEstado($id_tarea, $id_estado);
        } else {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés acceso a esta tarea.'
            ], 403);
        }

        $this->jsonResponse([
            'ok' => (bool) $actualizado,
            'mensaje' => $actualizado
                ? 'Tarea actualizada correctamente.'
                : 'Sin cambios realizados.'
        ]);
    }

    /**
     * DELETE /api/tareas/{id_tarea}
     * Solo el administrador y el líder del equipo.
     */
    public function destroy($id_tarea = null)
    {
        $usuario_id = $this->requireSesion();
        $id_tarea = $this->idValido($id_tarea, 'ID de tarea no provisto.');

        $acceso = $this->cargarAcceso($id_tarea, $usuario_id);

        if (!($acceso->es_admin || $acceso->es_lider)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés acceso a esta tarea.'
            ], 403);
        }

        $this->exigirPermiso($usuario_id, 'tareas.eliminar');

        $eliminado = $this->tareaModel->eliminarTarea($id_tarea);

        $this->jsonResponse([
            'ok' => (bool) $eliminado,
            'mensaje' => $eliminado
                ? 'Tarea eliminada exitosamente.'
                : 'Error al intentar eliminar la tarea.'
        ]);
    }
}