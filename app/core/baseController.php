<?php 

/**
 * BaseController
 * Clase base para controladores. Maneja carga de modelos, 
 * renderizado del layout SPA y respuestas JSON para la API.
 */
class BaseController {

    // Cargar modelo
    public function model($model) {
        require_once '../app/models/' . $model . '.php';
        return new $model();
    }

    // Cargar vista HTML (para la SPA solo se usa para renderizar layout.php)
    public function view($view, $data = []) {
        if (file_exists('../app/views/' . $view . '.php')) {
            require_once '../app/views/' . $view . '.php';
        } else {
            $this->jsonResponse(['error' => 'La vista requerida no existe'], 404);
        }
    }

    // Responder en formato JSON (uso exclusivo para endpoints API)
    public function jsonResponse($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data);
        exit;
    }

    // Helper para capturar y decodificar payloads JSON enviados por fetch()
    public function getJsonBody() {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}