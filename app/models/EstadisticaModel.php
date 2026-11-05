 <?php

class EstadisticaModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * Cantidad de tareas del equipo agrupadas por estado.
     * El LEFT JOIN hace que aparezcan también los estados con 0 tareas.
     */
    public function tareasPorEstado($equipo_id)
    {
        $this->db->query(
            "SELECT
                estado.id_estado,
                estado.tipoEstado,
                estado.color,
                COUNT(tarea.id) AS cantidad
             FROM estado
             LEFT JOIN tarea
                ON tarea.fk_id_estado = estado.id_estado
               AND tarea.equipo_id = :equipo_id
               AND tarea.deleted_at IS NULL
             GROUP BY estado.id_estado, estado.tipoEstado, estado.color
             ORDER BY estado.id_estado"
        );

        $this->db->bind('equipo_id', (int)$equipo_id);

        return $this->db->registers();
    }
} 