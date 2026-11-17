-- Recordatorios por mail de tareas por vencer
-- Si el ALTER da error de columna duplicada, ignorarlo y ejecutar solo el CREATE TABLE.

ALTER TABLE equipo
ADD COLUMN horas_recordatorio INT NOT NULL DEFAULT 24;

CREATE TABLE IF NOT EXISTS recordatorios_enviados (
  id INT(11) NOT NULL AUTO_INCREMENT,
  tarea_id INT(11) NOT NULL,
  expired_at DATETIME NOT NULL,
  enviado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tarea_venc (tarea_id, expired_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
