export const dashboardTemplate = () => `
    <div id="dashboard" class="d-flex min-vh-100">

        <!-- Menú -->
        <aside id="dashboardMenu">
            <!-- Aquí se renderizará el componente menú -->
        </aside>

        <!-- Contenido principal -->
        <div class="d-flex flex-column flex-grow-1">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white shadow-sm px-4">

                <button
                    id="sidebarToggleTop"
                    class="btn btn-link d-md-none rounded-circle me-3"
                    type="button"
                >
                    <i class="bi bi-list"></i>
                </button>

                <ul class="navbar-nav ms-auto align-items-center">

                    <li class="nav-item dropdown">

                        <a
                            class="nav-link dropdown-toggle d-flex align-items-center"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span
                                id="dashboardUserName"
                               class="me-2 text-secondary small fw-bold"
                            >
                                Usuario
                            </span>

                            <img
                                id="dashboardUserAvatar"
                                class="rounded-circle"
                                src=""
                                alt="Avatar"
                                width="32"
                                height="32"
                            >
                        </a>

                        <ul
                            class="dropdown-menu dropdown-menu-end shadow"
                            aria-labelledby="userDropdown"
                        >
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="bi bi-person me-2"></i>
                                    Perfil
                                </a>
                            </li>

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li>
                                <button
                                    type="button"
                                    class="dropdown-item"
                                    id="btnCerrarSesion"
                                >
                                    <i class="bi bi-box-arrow-right me-2"></i>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>

                    </li>

                </ul>

            </nav>

            <!-- Contenido -->
            <main id="content" class="flex-grow-1">

                <div class="container-fluid px-4 py-4">

                    <!-- Encabezado -->
                    <div class="d-flex align-items-center justify-content-between mb-4">

                        <div>
                            <h1 class="h3 mb-0 fw-bold">
                                Tus tareas
                            </h1>

                            <p class="text-muted small mb-0">
                                Gestión dinámica de actividades
                            </p>
                        </div>

                        <button
                            id="btnNuevaTarea"
                            type="button"
                            class="btn btn-primary btn-sm shadow-sm fw-bold"
                        >
                            <i class="bi bi-plus-circle me-1"></i>
                            Nueva Tarea
                        </button>

                    </div>

                    <!-- Filtros -->
                    <div class="row mb-4">

                        <div class="col-md-4">

                            <label
                                for="selectFiltroEstado"
                                class="form-label small text-muted"
                            >
                                Filtrar por estado
                            </label>

                            <select
                                id="selectFiltroEstado"
                                class="form-select form-select-sm shadow-sm"
                            >
                                <option value="0">
                                    Todos los estados
                                </option>
                            </select>

                        </div>

                    </div>

                    <!-- Tabla -->
                    <div class="card shadow-sm border-0">

                        <div class="card-body p-0">

                            <div class="table-responsive">

                                <table
                                    id="tablaTareas"
                                    class="table table-hover align-middle mb-0"
                                >

                                    <thead class="table-light">
                                        <tr>
                                            <th class="ps-4">#</th>
                                            <th>Título</th>
                                            <th>Descripción</th>
                                            <th>Fecha de Alta</th>
                                            <th>Vencimiento</th>
                                            <th>Estado</th>
                                            <th class="text-center pe-4">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody id="tablaTareasBody">
                                        <!-- Las tareas se cargarán dinámicamente -->
                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    </div>

    <!-- Contenedor de componentes -->
    <div id="dashboardComponents"></div>
`;

