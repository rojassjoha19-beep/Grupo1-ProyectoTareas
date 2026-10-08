<?php

class HomePageController extends BaseController {
     
    public function __construct() {
        // Inicializaciones generales si fueran necesarias
    }

    public function index() {
        // Carga la plantilla base unificada de la SPA
        $this->view('layout/layout');
    }
}

?>