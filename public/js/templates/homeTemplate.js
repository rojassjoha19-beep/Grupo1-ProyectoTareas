export const homeTemplate = () => `
<!-- Navegación -->
<nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
        <a class="navbar-brand fw-bold" href="/" data-link>
            Gestor de Tareas
        </a>
        <div class="ms-auto">
            <a class="btn btn-outline-primary" href="/proyecto-tareas/login" data-link>
                Ingresar
            </a>
        </div>
    </div>
</nav>

<!-- Presentación -->
<main>
    <section class="hero py-5">
        <div class="container">
            <div class="row align-items-center g-5">
                <!-- Texto -->
                <div class="col-lg-5">
                    <span class="badge text-bg-primary mb-3">
                        Organiza tus tareas
                    </span>
                    <h1 class="display-4 fw-bold mb-4">
                        Bienvenidos
                    </h1>
                    <p class="lead mb-4">
                        Nuestro sistema te ayudará a organizarte,
                        administrar tus tareas y llevar un mejor control
                        de tus actividades.
                    </p>
                    <h2 class="h4 fw-bold mb-3">
                        Decile adiós al <em>pulpo manotas</em>.
                    </h2>
                    <p class="text-secondary">
                        Organizá tus pendientes, establecé prioridades
                        y mantené tus tareas bajo control.
                    </p>
                    <a class="btn btn-primary btn-lg mt-2" href="/login" data-link>
                        Comenzar
                    </a>
                </div>

                <!-- Imagen -->
                <div class="col-lg-7">
                    <div class="hero-image">
                        <img 
                            src="/proyecto-tareas/public/img/tareas_landing.jpg" 
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
