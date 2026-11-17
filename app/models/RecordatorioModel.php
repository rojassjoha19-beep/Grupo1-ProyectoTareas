<?php

class RecordatorioModel {
    private $db;
    public function __construct()
    {
        $this->db = new Database;
    }

    /* Devuelve las tareas pendientes (ToDo / Doing) de los equipos que lidera
       el usuario, que vencen dentro del período del equipo y a las que
       todavía no se les mandó recordatorio.
    */
    public function tareasPorVencer($lider_id)
    {
        $this->db->query("SELECT t.id, t.titulo, t.expired_at,
                                 e.nombre AS equipo,
                                 u.nombre, u.apellido, u.email
                          FROM tarea t
                          INNER JOIN equipo e  ON e.id = t.equipo_id
                          INNER JOIN usuario u ON u.id = t.fk_id_usuario
                          WHERE e.lider_id = :lider
                            AND t.deleted_at IS NULL
                            AND t.fk_id_estado IN (1, 2)
                            AND t.expired_at BETWEEN NOW()
                                AND DATE_ADD(NOW(), INTERVAL e.horas_recordatorio HOUR)
                            AND NOT EXISTS (
                                SELECT 1 FROM recordatorios_enviados r
                                WHERE r.tarea_id = t.id
                                  AND r.expired_at = t.expired_at)");
        $this->db->bind('lider', (int) $lider_id);

        return $this->db->registers();
    }

    /* Registra que ya se mandó el recordatorio de esa tarea con esa fecha.
       INSERT IGNORE: si ya estaba registrado, no da error.
    */
    public function marcar_enviado($tarea_id, $expired_at)
    {
        $this->db->query("INSERT IGNORE INTO recordatorios_enviados
                          (tarea_id, expired_at)
                          VALUES (:tarea_id, :expired_at)");
        $this->db->bind('tarea_id', (int) $tarea_id);
        $this->db->bind('expired_at', $expired_at);

        return $this->db->execute();
    }
}