export const homeTemplate = () => `
<!-- Navegación -->
<nav class="navbar bg-white">
    <div class="container">

<!-- Nombre del sistema -->
        <a class="navbar-brand fw-bold" href="/" data-link>
            <i class="bi bi-check2-circle"></i>
            Gestor de Tareas
        </a>

<!-- Botón para ingresar -->
        <a class="btn btn-outline-success" href="/login" data-link>
            Ingresar
        </a>
    </div>
</nav>

<!-- Presentación -->
<main>
    <section class="presentacion py-5">
    <div class="container">
        <div class="row align-items-center g-5">

            <!-- Texto -->

               <div class="col-lg-6">

    <span class="badge rounded-pill mb-3">
        Organización más sencilla
    </span>

    <h1 class="display-4 fw-bold">
        Tu día,
        <span>mejor organizado.</span>
    </h1>

    <p class="lead mt-4">
        Organizá tus actividades desde un solo lugar.
        Administrá tus tareas, establecé prioridades
        y aprovechá mejor tu tiempo.
    </p>

    <!-- Botones principales -->
    <div class="d-flex flex-wrap gap-3 mt-4">
        <a class="btn btn-success btn-lg"
           href="/login"
           data-link>
            Comenzar ahora
        </a>

        <a class="btn btn-outline-success btn-lg"
           href="#caracteristicas">
            Conocer más
        </a>
    </div>

     <!-- Mensaje adicional -->
      <p class="mt-4">
        <i class="bi bi-check-circle-fill"></i>
        Todo organizado en un solo lugar.
    </p>
</div> 
              <!-- Imagen -->
                <div class="col-lg-6">
                    <div class="hero-image">
                        <img 
                            src="/Grupo1-ProyectoTareas/public/img/ilustracion_chica_tareas.png"
                            class="img-fluid rounded-4 shadow" 
                            alt="Gestión de tareas"
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
`;
