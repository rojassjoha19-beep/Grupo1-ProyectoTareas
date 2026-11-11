-- Horas de anticipación del recordatorio, por equipo
ALTER TABLE equipo
ADD COLUMN horas_recordatorio INT NOT NULL DEFAULT 24;

-- Registro de recordatorios ya enviados
CREATE TABLE IF NOT EXISTS recordatorios_enviados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT NOT NULL,
    expired_at DATETIME NOT NULL,
    enviado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tarea_fecha (tarea_id, expired_at)
);
