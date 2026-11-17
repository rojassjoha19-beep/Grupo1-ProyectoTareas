<?php

class PermisoModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * ¿El rol del usuario tiene este permiso? (usuario -> rol -> rol_permiso -> permiso)
     */
    public function tienePermiso($usuario_id, $permiso)
    {
        $this->db->query(
            "SELECT 1
             FROM usuario
             INNER JOIN rol_permiso ON rol_permiso.rol_id = usuario.rol_id
             INNER JOIN permiso ON permiso.id = rol_permiso.permiso_id
             WHERE usuario.id = :usuario_id
               AND permiso.nombre = :permiso
               AND usuario.deleted_at IS NULL"
        );
        $this->db->bind('usuario_id', (int)$usuario_id);
        $this->db->bind('permiso', $permiso);

        return (bool) $this->db->register();
    }
}  