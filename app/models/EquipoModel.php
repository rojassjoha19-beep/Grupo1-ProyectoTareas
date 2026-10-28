
<?php

class EquipoModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * Obtiene todos los equipos donde pertenece el usuario.// terminar 
     */
    public function equiposDelUsuario($id_usuario)
    {
        $this->db->query("SELECT * FROM equipo");

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
     * Es lider de equipo .
     */
        public function esLider($equipo_id, $usuario_id)
    {
        $this->db->query(
            "SELECT id
             FROM equipo
             WHERE id = :equipo_id
             AND lider_id = :usuario_id"
        );

        $this->db->bind('equipo_id', (int)$equipo_id);
        $this->db->bind('usuario_id', (int)$usuario_id);

        return (bool)$this->db->register();
    }


    /**
     * Crea equipo, a partir de usuario->tambien insetar lider (ver como se pide en controlador)
     * cuando 
     */

    public function crearEquipo($id_usuario, $nombre_equipo,$lider_id)
    {
        $this->db->query("SELECT * FROM equipo
                          INNER JOIN usuario_equipo ON equipo.id_equipo = usuario_equipo.fk_id_equipo
                          WHERE usuario_equipo.fk_id_usuario = :id_usuario");

        $this->db->bind('id_usuario', $id_usuario);

        return $this->db->registers();
    }


    public function obtenerEquipo($equipo_id)
    {




    
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
}
