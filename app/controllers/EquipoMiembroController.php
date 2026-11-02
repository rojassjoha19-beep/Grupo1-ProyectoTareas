<?php

class EquipoMiembroController extends BaseController
{
    private $miembroModel;

    public function __construct()
    {
        $this->miembroModel = $this->model('EquipoMiembroModel');
    }

    /**
     * POST /api/equipos/{id}/miembros
     * Body: { "usuario_id": 5 }
     * Solo el líder del equipo puede agregar miembros.
     */
    public function agregar($equipo_id = null)
    {
        $miId = $this->requireSesion();
        $equipo_id = $this->idValido($equipo_id, 'Id de equipo inválido.');

        if (!$this->miembroModel->esLiderDeEquipo($equipo_id, $miId)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Solo el líder del equipo puede agregar miembros.'
            ], 403);
        }

        $datos = $this->getJsonBody();
        $usuario_id = $this->idValido($datos['usuario_id'] ?? null, 'usuario_id inválido.');

        if (!$this->miembroModel->usuarioActivoExiste($usuario_id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El usuario no existe.'
            ], 404);
        }

        if ($this->miembroModel->esMiembro($equipo_id, $usuario_id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El usuario ya es miembro del equipo.'
            ], 409);
        }

        $agregado = $this->miembroModel->agregar($equipo_id, $usuario_id);

        $this->jsonResponse([
            'ok' => (bool) $agregado,
            'mensaje' => $agregado
                ? 'Miembro agregado correctamente.'
                : 'No se pudo agregar el miembro.'
        ], $agregado ? 201 : 500);
    }

    /**
     * DELETE /api/equipos/{id}/miembros/{usuarioId}
     * Solo el líder puede quitar miembros, y no puede quitar al líder.
     */
    public function quitar($equipo_id = null, $usuario_id = null)
    {
        $miId = $this->requireSesion();
        $equipo_id = $this->idValido($equipo_id, 'Id de equipo inválido.');
        $usuario_id = $this->idValido($usuario_id, 'Id de usuario inválido.');

        if (!$this->miembroModel->esLiderDeEquipo($equipo_id, $miId)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Solo el líder del equipo puede quitar miembros.'
            ], 403);
        }

        if ($this->miembroModel->esLiderDeEquipo($equipo_id, $usuario_id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No se puede quitar al líder del equipo.'
            ], 400);
        }

        if (!$this->miembroModel->esMiembro($equipo_id, $usuario_id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El usuario no es miembro del equipo.'
            ], 404);
        }

        $quitado = $this->miembroModel->quitar($equipo_id, $usuario_id);

        $this->jsonResponse([
            'ok' => (bool) $quitado,
            'mensaje' => $quitado
                ? 'Miembro quitado correctamente.'
                : 'No se pudo quitar el miembro.'
        ], $quitado ? 200 : 500);
    }

    /**
     * Devuelve el id del usuario logueado, o responde 401.
     */
    private function requireSesion()
    {
        if (empty($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Sin sesión activa'
            ], 401);
        }

        return (int) $_SESSION['user_id'];
    }

    /**
     * Valida que el valor sea un entero positivo, o responde 400.
     */
    private function idValido($valor, $mensajeError)
    {
        $id = filter_var($valor, FILTER_VALIDATE_INT);

        if ($id === false || $id < 1) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => $mensajeError
            ], 400);
        }

        return $id;
    }
}