export const homeTemplate = () => `
 <link rel="stylesheet" href="/Grupo1-ProyectoTareas/public/css/home.css">
  <div class="home-page">
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
                            src="/Grupo1-ProyectoTareas/public/img/Imagen_Inicial.png"
                            class="img-fluid rounded-4 shadow" 
                            alt="Gestión de tareas"
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="caracteristicas py-5" id="caracteristicas">
            <div class="container">

                <!-- Título de la sección -->
                <div class="text-center mb-5">

                    <span class="subtitulo">
                        Nuestras herramientas
                    </span>

                    <h2 class="fw-bold mt-2">
                        Todo lo que necesitás para organizarte
                    </h2>

                    <p class="mt-3">
                        Herramientas simples para mejorar tu productividad.
                    </p>

                </div>
             <!-- Tarjetas -->
                <div class="row g-4">

                    <!-- Tarjeta 1 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="card h-100">

                            <div class="card-body">
                                <i class="bi bi-list-check icono-tarjeta"></i>

                                <h3 class="h5 fw-bold mt-3">
                                    Organización
                                </h3>

                                <p>
                                    Mantené tus tareas ordenadas y encontrá
                                    fácilmente tus actividades pendientes.
                                </p>
                            </div>

                        </div>
                    </div>
            <!-- Tarjeta 2 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="card h-100">

                            <div class="card-body">
                                <i class="bi bi-calendar-check icono-tarjeta"></i>

                                <h3 class="h5 fw-bold mt-3">
                                    Priorización
                                </h3>

                                <p>
                                    Organizá tus prioridades y planificá
                                    mejor tus actividades.
                                </p>
                            </div>

                        </div>
                    </div>
                <!-- Tarjeta 3 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="card h-100">

                            <div class="card-body">
                                <i class="bi bi-graph-up-arrow icono-tarjeta"></i>

                                <h3 class="h5 fw-bold mt-3">
                                    Seguimiento
                                </h3>

                                <p>
                                    Consultá el avance de tus tareas y
                                    controlá tus pendientes.
                                </p>
                            </div>

                        </div>
                    </div>
        <div class="col-md-6 col-lg-3">
                        <div class="card h-100">

                            <div class="card-body">
                                <i class="bi bi-people icono-tarjeta"></i>

                                <h3 class="h5 fw-bold mt-3">
                                    Colaboración
                                </h3>

                                <p>
                                    Facilitá la organización de actividades
                                    y el trabajo en equipo.
                                </p>
                            </div>

                        </div>
                    </div>
                    </div>
            </div>
        </section>
</main>

       <!-- Pie de página -->
    <footer class="pie-pagina py-4">
        <div class="container text-center">
            <p class="mb-0">
                Gestor de Tareas · Organizá mejor tu día.
            </p>
        </div>
    </footer>

</div>
`;

