
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
    public function buscarEquiposXusuario($id_usuario)
    {
        $this->db->query("SELECT * FROM equipo");

        return $this->db->registers();
    }


    /**
     * Crea equipo, a partir de usuario-> se convierte en lider de ese equipo
     * 
     */



    public function crearEquipo($id_usuario, $nombre_equipo,$lider_id)
    {
        $this->db->query("SELECT * FROM equipo
                          INNER JOIN usuario_equipo ON equipo.id_equipo = usuario_equipo.fk_id_equipo
                          WHERE usuario_equipo.fk_id_usuario = :id_usuario");

        $this->db->bind('id_usuario', $id_usuario);

        return $this->db->registers();
    }


    public function buscarEquipos($equipo_id)
    {




    
    }
