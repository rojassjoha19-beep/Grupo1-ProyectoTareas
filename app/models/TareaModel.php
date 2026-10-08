
<?php

class TareaModel
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    /**
     * Obtiene los estados posibles de las tareas.
     */
    public function buscar_estados()
    {
        $this->db->query("SELECT * FROM estado");

        return $this->db->registers();
    }

    /**
     * Obtiene las tareas del usuario autenticado.
     *
     * Si $id_estado = 0, obtiene todas las tareas.
     * Si $id_estado tiene un valor, filtra por estado.
     */

public function buscarTareas($id_estado = 0)
{
    $sql = "SELECT
                tarea.id AS id_tarea,
                tarea.titulo,
                tarea.descripcion,
                tarea.created_at,
                tarea.expired_at,
                estado.tipoEstado,
                estado.color
            FROM tarea
            INNER JOIN estado
                ON estado.id_estado = tarea.fk_id_estado
            WHERE tarea.fk_id_usuario = :id_usuario
              AND tarea.deleted_at IS NULL";

    if ($id_estado > 0) {
        $sql .= " AND estado.id_estado = :id_estado";
    }

    $sql .= " ORDER BY tarea.created_at DESC";

    $this->db->query($sql);

    $this->db->bind(
        'id_usuario',
        $_SESSION['user_id']
    );

    if ($id_estado > 0) {
        $this->db->bind(
            'id_estado',
            $id_estado
        );
    }

    return $this->db->registers();
}



    /**
     * Crea una nueva tarea asociada directamente
     * al usuario autenticado.
     */
    public function altaTarea($data)
    {
        $this->db->query(
            "INSERT INTO tarea
                (
                    titulo,
                    descripcion,
                    expired_at,
                    fk_id_estado,
                    fk_id_usuario,
                    created_at
                )
             VALUES
                (
                    :titulo,
                    :descripcion,
                    :expired_at,
                    :id_estado,
                    :id_usuario,
                    CURRENT_TIMESTAMP
                )"
        );

        $this->db->bind(
            'titulo',
            $data['titulo']
        );

        $this->db->bind(
            'descripcion',
            $data['descripcion']
        );

        $this->db->bind(
            'expired_at',
            $data['expired_at']
        );

        $this->db->bind(
            'id_estado',
            $data['id_estado']
        );

        $this->db->bind(
            'id_usuario',
            $data['id_usuario']
        );

        return $this->db->execute();
    }

    /**
     * Obtiene el último ID insertado.
     */
    public function ultimoId()
    {
        return $this->db->lastId();
    }

    /**
     * Elimina lógicamente una tarea.
     */
    public function eliminarTarea($id_tarea)
    {
        $this->db->query(
            "UPDATE tarea
             SET deleted_at = CURRENT_TIMESTAMP
             WHERE tarea.id = :id"
        );

        $this->db->bind(
            'id',
            $id_tarea
        );

        return $this->db->execute();
    }

    /**
     * Obtiene una tarea por su ID.
     */
    public function tareaById($id_tarea)
    {
        $this->db->query(
            "SELECT
                tarea.*,
                estado.tipoEstado,
                estado.color
             FROM tarea
             INNER JOIN estado
                ON estado.id_estado = tarea.fk_id_estado
             WHERE tarea.id = :id
             AND tarea.deleted_at IS NULL"
        );

        $this->db->bind(
            'id',
            $id_tarea
        );

        return $this->db->register();
    }

    /**
     * Actualiza una tarea.
     */
    public function updateTarea($data)
    {
        $this->db->query(
            "UPDATE tarea
             SET
                titulo = :titulo,
                descripcion = :descripcion,
                expired_at = :expired_at,
                fk_id_estado = :id_estado,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = :id_tarea"
        );

        $this->db->bind(
            'titulo',
            $data['titulo']
        );

        $this->db->bind(
            'descripcion',
            $data['descripcion']
        );

        $this->db->bind(
            'expired_at',
            $data['expired_at']
        );

        $this->db->bind(
            'id_estado',
            $data['id_estado']
        );

        $this->db->bind(
            'id_tarea',
            $data['id_tarea']
        );

        return $this->db->execute();
    }

    /**
     * Marca como expiradas las tareas vencidas.
     */
    public function expirarTareas()
    {
        $this->db->query(
            "UPDATE tarea
             SET fk_id_estado = 4
             WHERE expired_at < CURDATE()
             AND deleted_at IS NULL"
        );

        return $this->db->execute();
    }
}

