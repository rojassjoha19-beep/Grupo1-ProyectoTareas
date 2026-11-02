<?php
class UsuarioController extends BaseController
{
    private $usuarioModel;

    public function __construct()
    {
        $this->usuarioModel = $this->model('UsuarioModel');
    }

    /**
     * Exige sesión y rol Administrador. Devuelve el id del admin.
     */
    private function requirePermiso($nombre_permiso)
    {
        if (!isset($_SESSION['user_id'])) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'Sin sesión activa'
            ], 401);
        }

        $usuario_id = (int)$_SESSION['user_id'];

        if (!$this->usuarioModel->tienePermiso($usuario_id, $nombre_permiso)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No posee permisos necesarios'
            ], 403);
        }

        return $usuario_id;
    }

    /**
     * GET /api/usuarios
     */
    public function index()
    {
        $this->requirePermiso('usuarios.ver');

        $this->jsonResponse([
            'ok' => true,
            'usuarios' => $this->usuarioModel->listarUsuarios()
        ]);
    }


    /**
     * PUT /api/usuarios/{id}/rol
     * 
     */
    public function cambiarRol($id = null)
    {
        $this->requirePermiso('usuarios.editar');

        if (!$id || !ctype_digit((string)$id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'ID de usuario no válido.'
            ], 400);
        }

        $id = (int)$id;

        $data   = $this->getJsonBody();
        $rol_id = (int)($data['rol_id'] ?? 0);

        //solo lider y miembro , error 400 por datos invalidos
        if (!in_array($rol_id, [2, 3], true)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El rol debe ser Líder (2) o Miembro (3).'
            ], 400);
        }

        $usuario = $this->usuarioModel->buscarUsuario($id);

        if (!$usuario) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'El usuario no existe.'
            ], 404);
        }

        //que no saque admin
        if ((int)$usuario->rol_id === 1) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No se puede cambiar el rol de un administrador.'
            ], 403);
        }

        if (!$this->usuarioModel->cambiarRol($id, $rol_id)) {
            $this->jsonResponse([
                'ok' => false,
                'mensaje' => 'No se pudo cambiar el rol.'
            ], 500);
        }

        $this->jsonResponse([
            'ok' => true,
            'mensaje' => 'Rol actualizado correctamente.'
        ]);
    }

}