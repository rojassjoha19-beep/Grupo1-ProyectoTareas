<?php

class EstadisticaController extends BaseController
{
    private $estadisticaModel;
    private $usuarioModel;
    private $permisoModel;
    private $miembroModel;

    public function __construct()
    {
        $this->estadisticaModel = $this->model('EstadisticaModel');
        $this->permisoModel = $this->model('PermisoModel');
        $this->miembroModel = $this->model('EquipoMiembroModel');
        $this->usuarioModel = $this->model('UsuarioModel');
        }

    /**
     * GET /api/equipos/{id}/estadisticas
     * Porcentaje de tareas del equipo por estado.
     */
    public function porEquipo($equipo_id = null)
    {
        if (empty($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Sin sesión activa'
            ], 401);
        }

        $equipo_id = filter_var($equipo_id, FILTER_VALIDATE_INT);
        if ($equipo_id === false || $equipo_id < 1) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Id de equipo inválido.'
            ], 400);
        }

        // Permiso del rol
        if (!$this->permisoModel->tienePermiso((int)$_SESSION['user_id'], 'estadisticas.ver')) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No tenés permiso para ver estadísticas.'
            ], 403);
        }
            $usuario_id = (int)$_SESSION['user_id'];
            $usuario    = $this->usuarioModel->buscarUsuario($usuario_id);
             $esAdmin    = $usuario && (int)$usuario->rol_id === 1;

        // Solo el admin o el líder de ese equipo pueden ver sus estadísticas
        if (!$esAdmin && !$this->miembroModel->esLiderDeEquipo($equipo_id, $usuario_id)) {
              $this->jsonResponse([
          'ok' => false,
         'mensaje' => 'Solo el administrador o el líder del equipo puede ver las estadísticas.'
     ], 403);
        }
        $filas = $this->estadisticaModel->tareasPorEstado($equipo_id);

        $total = 0;
        foreach ($filas as $fila) {
            $total += (int)$fila->cantidad;
        }

        $estadisticas = [];
        foreach ($filas as $fila) {
            $cantidad = (int)$fila->cantidad;

            $estadisticas[] = [
                'estado'     => $fila->tipoEstado,
                'color'      => $fila->color,
                'cantidad'   => $cantidad,
                'porcentaje' => $total > 0 ? round($cantidad * 100 / $total, 1) : 0
            ];
        }

        $this->jsonResponse([
            'ok' => true,
            'equipo_id' => $equipo_id,
            'total' => $total,
            'estadisticas' => $estadisticas
        ]);
    }
}