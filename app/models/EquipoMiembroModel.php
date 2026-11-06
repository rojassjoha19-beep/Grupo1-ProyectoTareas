<?php

class EquipoMiembroModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * ¿Este usuario es el líder de este equipo?
     */
    public function esLiderDeEquipo($equipo_id, $usuario_id)
    {
        $this->db->query(
            "SELECT id FROM equipo
             WHERE id = :equipo AND lider_id = :usuario"
        );
        $this->db->bind('equipo', (int)$equipo_id);
        $this->db->bind('usuario', (int)$usuario_id);

        return (bool) $this->db->register();
    }

    /**
     * ¿El usuario existe y no está dado de baja?
     */
    public function usuarioActivoExiste($usuario_id)
    {
        $this->db->query(
            "SELECT id FROM usuario
             WHERE id = :id AND deleted_at IS NULL"
        );
        $this->db->bind('id', (int)$usuario_id);

        return (bool) $this->db->register();
    }

    /**
     * ¿El usuario ya pertenece al equipo?
     */
    public function esMiembro($equipo_id, $usuario_id)
    {
        $this->db->query(
            "SELECT usuario_id FROM equipo_usuario
             WHERE equipo_id = :equipo AND usuario_id = :usuario"
        );
        $this->db->bind('equipo', (int)$equipo_id);
        $this->db->bind('usuario', (int)$usuario_id);

        return (bool) $this->db->register();
    }

    /**
     * Agrega un usuario al equipo.
     */
    public function agregar($equipo_id, $usuario_id)
    {
        $this->db->query(
            "INSERT INTO equipo_usuario (equipo_id, usuario_id)
             VALUES (:equipo, :usuario)"
        );
        $this->db->bind('equipo', (int)$equipo_id);
        $this->db->bind('usuario', (int)$usuario_id);

        return $this->db->execute();
    }

    /**
     * Quita un usuario del equipo.
     */
    public function quitar($equipo_id, $usuario_id)
    {
        $this->db->query(
            "DELETE FROM equipo_usuario
             WHERE equipo_id = :equipo AND usuario_id = :usuario"
        );
        $this->db->bind('equipo', (int)$equipo_id);
        $this->db->bind('usuario', (int)$usuario_id);

        return $this->db->execute();
    }
}