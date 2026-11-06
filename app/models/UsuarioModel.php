<?php

class UsuarioModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * Lista todos los usuarios 
    */

     public function listarUsuarios()
        {
            $this->db->query(
                "SELECT
                    usuario.id,
                    usuario.nombre,
                    usuario.apellido,
                    usuario.email,
                    usuario.avatar,
                    usuario.rol_id,
                    rol.nombre AS rol
                FROM usuario
                INNER JOIN rol
                    ON rol.id = usuario.rol_id
                WHERE usuario.deleted_at IS NULL
                ORDER BY usuario.nombre"
            );

        return $this->db->registers();
    }


    /**
     *Segun rol del usuario tiene permiso ?
     */
    public function tienePermiso($usuario_id, $nombre_permiso)
    {
        $this->db->query(
            "SELECT usuario.id
             FROM usuario
             INNER JOIN rol_permiso
                ON rol_permiso.rol_id = usuario.rol_id
             INNER JOIN permiso
                ON permiso.id = rol_permiso.permiso_id
             WHERE usuario.id = :usuario_id
             AND permiso.nombre = :permiso
             AND usuario.deleted_at IS NULL"
        );

        $this->db->bind('usuario_id', (int)$usuario_id);
        $this->db->bind('permiso', $nombre_permiso);

        return (bool)$this->db->register();
    }


    /**
     * Un usuario activo 
     */
    public function buscarUsuario($usuario_id)
    {
        $this->db->query(
            "SELECT id, rol_id
             FROM usuario
             WHERE id = :id
             AND deleted_at IS NULL"
        );

         /**
     * este id se pasa en where 
     */
        $this->db->bind('id', (int)$usuario_id);

        return $this->db->register();
    }
   
    /**
     * Cambia el rol de un usuario 
     */
    public function cambiarRol($usuario_id, $rol_id)
    {
        $this->db->query(
            "UPDATE usuario
             SET rol_id = :rol_id,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = :id"
        );

        $this->db->bind('rol_id', (int)$rol_id);
        $this->db->bind('id', (int)$usuario_id);

        return $this->db->execute();
    }
}

