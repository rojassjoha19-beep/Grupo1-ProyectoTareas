
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

public function buscarTareas($id_estado = 0, $fecha_vencimiento = null)
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

    // Filtro opcional por fecha de vencimiento (día completo).
    if (!empty($fecha_vencimiento)) {
        $sql .= " AND DATE(tarea.expired_at) = :fecha_vencimiento";
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

    if (!empty($fecha_vencimiento)) {
        $this->db->bind(
            'fecha_vencimiento',
            $fecha_vencimiento
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
                    equipo_id,
                    created_at
                )
             VALUES
                (
                    :titulo,
                    :descripcion,
                    :expired_at,
                    :id_estado,
                    :id_usuario,
                    :id_equipo,
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

        $this->db->bind(
            'id_equipo',
            $data['id_equipo']
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

    /**
 * Valida la fecha de vencimiento de una tarea.
 * Devuelve null si es válida, o el mensaje de error.
 */
public function validarFecha($fecha)
{
    if (empty($fecha)) {
        return 'La fecha de vencimiento es obligatoria.'; 
    }

    $fechaVenc = DateTimeImmutable::createFromFormat('Y-m-d', $fecha);
    $errores  = DateTimeImmutable::getLastErrors();

    if (!$fechaVenc || ($errores && ($errores['warning_count'] || $errores['error_count']))) {
        return 'La fecha de vencimiento no tiene un formato válido.';
    }

    if ($fechaVenc < new DateTimeImmutable('today')) {
        return 'La fecha de vencimiento no puede ser anterior a hoy.';
    }

    return null;
}
    /**
     * Qué relación tiene el usuario con la tarea.
     * Devuelve false si la tarea no existe o está borrada.
     * es_admin: rol Administrador (id 1) | es_lider: lidera el equipo de la tarea
     * es_asignado: la tarea es suya
     */
    public function accesoATarea($id_tarea, $usuario_id)
    {
        $this->db->query(
            "SELECT
                tarea.id,
                (usuario.rol_id = 1) AS es_admin,
                (equipo.lider_id = :id_lider) AS es_lider,
                (tarea.fk_id_usuario = :id_asignado) AS es_asignado
             FROM tarea
             INNER JOIN usuario ON usuario.id = :id_usuario
             LEFT JOIN equipo ON equipo.id = tarea.equipo_id
             WHERE tarea.id = :id_tarea
               AND tarea.deleted_at IS NULL"
        );
        $this->db->bind('id_lider', (int)$usuario_id);
        $this->db->bind('id_asignado', (int)$usuario_id);
        $this->db->bind('id_usuario', (int)$usuario_id);
        $this->db->bind('id_tarea', (int)$id_tarea);

        return $this->db->register();
    }

    public function estadoExiste($id_estado)
    {
        $this->db->query("SELECT id_estado FROM estado WHERE id_estado = :id");
        $this->db->bind('id', (int)$id_estado);

        return (bool) $this->db->register();
    }

    /**
     * Cambia solo el estado (lo que puede hacer un miembro).
     */
    public function updateEstado($id_tarea, $id_estado)
    {
        $this->db->query(
            "UPDATE tarea
             SET fk_id_estado = :id_estado, updated_at = CURRENT_TIMESTAMP
             WHERE id = :id_tarea AND deleted_at IS NULL"
        );
        $this->db->bind('id_estado', (int)$id_estado);
        $this->db->bind('id_tarea', (int)$id_tarea);

        return $this->db->execute();
    }
}
