<?php
function enviarRecordatoriosLider($liderId)
{
    $modelo = new RecordatorioModel();
    $tareas = $modelo->tareasPorVencer((int) $liderId);

    foreach ($tareas as $fila) {
        $t = (object) $fila;

        $asunto = "Recordatorio: la tarea \"{$t->titulo}\" vence pronto";
        $html = "<p>Hola {$t->nombre} {$t->apellido},</p>"
              . "<p>La tarea <b>{$t->titulo}</b> (ID {$t->id}) del equipo <b>{$t->equipo}</b> "
              . "vence el <b>{$t->expired_at}</b>.</p>";

        if (enviarCorreo($t->email, $asunto, $html)) {
            $modelo->marcar_enviado($t->id, $t->expired_at);
        }
    }
}