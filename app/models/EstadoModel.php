<?php

class EstadoModel {
    protected $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    /* Método para buscar los estados posibles de las tareas */
    public function buscar_estados()
    {
        $this->db->query("SELECT * FROM estado");
        return $this->db->registers();
    }
}