<?php
class Env {
    public static function cargar($ruta) {
        if (!file_exists($ruta)) {
            return;
        }

        $lineas = file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lineas as $linea) {
            // Ignorar comentarios
            if (strpos(trim($linea), '#') === 0) {
                continue;
            }

            if (strpos($linea, '=') !== false) {
                list($nombre, $valor) = explode('=', $linea, 2);
                $nombre = trim($nombre);
                $valor = trim($valor);

                $_ENV[$nombre] = $valor;
                putenv("{$nombre}={$valor}");
            }
        }
    }
}