
<?php

class EquipoModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * Obtiene todos los equipos donde pertenece el usuario.
     */
    public function equiposDelUsuario($usuario_id)
    {
        $this->db->query(
            "SELECT 
                equipo.id,
                equipo.nombre,
                equipo.lider_id,
                (equipo.lider_id = :id_lider) AS es_lider
            
            FROM equipo
             INNER JOIN equipo_usuario
                ON equipo_usuario.equipo_id = equipo.id
             WHERE equipo_usuario.usuario_id = :id_usuario
             ORDER BY equipo.nombre"
        );

        $this->db->bind('id_lider', (int)$usuario_id);
        $this->db->bind('id_usuario', (int)$usuario_id);

        return $this->db->registers();
    }
    
    /**
     * Es miembro de equipo .
     */

    public function esMiembro($equipo_id, $usuario_id)
    {
        $this->db->query(
            "SELECT equipo_id
             FROM equipo_usuario
               WHERE equipo_id = :equipo_id
         AND usuario_id = :usuario_id"
        );

        $this->db->bind('equipo_id', (int)$equipo_id);
        $this->db->bind('usuario_id', (int)$usuario_id);

        return (bool) $this->db->register();
    }
    
     /**
     * Es lider, vista general de lider y todos sus equipos 
     */
    public function esLider($usuario_id)
        {
            $this->db->query(
                "SELECT usuario.id
                FROM usuario
                INNER JOIN rol
                    ON rol.id = usuario.rol_id
                WHERE usuario.id = :usuario_id
                AND rol.id = 2
                AND usuario.deleted_at IS NULL"
            );

            $this->db->bind('usuario_id', (int)$usuario_id);

            return (bool)$this->db->register();
        }
     
    /**
     * 
     * Crear Equipo($nombre, $lider_id): devuelve el id nuevo o false. El líder es quien crea el equipo.
     */

     public function crearEquipo($nombre, $lider_id)
    {
        try { // atrapa los insert, el START TRANSACTION
            $this->db->query("START TRANSACTION");
            $this->db->execute();

            $this->db->query(
                "INSERT INTO equipo (nombre, lider_id)
                 VALUES (:nombre, :lider_id)"
            );
            $this->db->bind('nombre', $nombre);
            $this->db->bind('lider_id', (int)$lider_id);
            $this->db->execute();

            $equipo_id = (int)$this->db->lastId();

            $this->db->query(
                "INSERT INTO equipo_usuario (equipo_id, usuario_id)
                 VALUES (:equipo_id, :usuario_id)"
            );
            $this->db->bind('equipo_id', $equipo_id);
            $this->db->bind('usuario_id', (int)$lider_id);
            $this->db->execute();

            $this->db->query("COMMIT");
            $this->db->execute();

            return $equipo_id;
        } catch (PDOException $e) {
            try {
                 // ROLLL back si falla conexion - atrapar hasta return .
                $this->db->query("ROLLBACK");
                $this->db->execute();
            } catch (PDOException $e2) {
               
            }
            return false;
        }
    }

    // obetener equipo por id, para mostrarlo en la vista de detalle del equipo 
    public function obtenerEquipo($equipo_id)
    {
        $this->db->query(
            "SELECT
                equipo.id,
                equipo.nombre,
                equipo.lider_id,
                usuario.nombre AS lider_nombre,
                usuario.apellido AS lider_apellido,
                usuario.avatar AS lider_avatar
             FROM equipo
             INNER JOIN usuario
                ON usuario.id = equipo.lider_id
             WHERE equipo.id = :id"
        );

        $this->db->bind('id', (int)$equipo_id);

        return $this->db->register();
    }

    /**
     * Busca equipo X lider 
     * 
     */
     public function buscarEquiposDeLider ($id_usuario)
    {        
         $this->db->query(

             "SELECT
                    equipo.id AS id_equipo,
                    equipo.nombre
                   
            FROM equipo
            WHERE equipo.lider_id = :id_usuario
            ORDER BY equipo.nombre"
         );
     $this->db->bind('id_usuario', (int)$id_usuario);

    return $this->db->registers();
    }


    /**
     * Miembros del equipo 
     */
    public function obtenerMiembros($equipo_id)
    {
        $this->db->query(
            "SELECT
                usuario.id,
                usuario.nombre,
                usuario.apellido,
                usuario.email,
                usuario.avatar
             FROM equipo_usuario
             INNER JOIN usuario
                ON usuario.id = equipo_usuario.usuario_id
             WHERE equipo_usuario.equipo_id = :id
             AND usuario.deleted_at IS NULL
             ORDER BY usuario.nombre"
        );

        $this->db->bind('id', (int)$equipo_id);

        return $this->db->registers();
    }
}
