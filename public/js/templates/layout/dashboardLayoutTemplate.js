export const dashboardLayoutTemplate = ( contenidoMain = '') => `
    <div id="dashboard" class="dashboard-page d-flex min-vh-100">

        <!-- Menú -->
        <aside id="dashboardMenu">
            <!-- Aquí se renderizará el componente menú -->
        </aside>

        <!-- Contenido principal -->
        <div class="dashboard-layout d-flex flex-column flex-grow-1">

            <!-- Topbar -->
            <nav class="dashboard-topbar navbar navbar-expand px-4">

                <button
                    id="sidebarToggleTop"
                    class="btn btn-link rounded-circle me-3"
                    type="button"
                    aria-label="Abrir menú"
                    aria-controls="dashboardMenu"
                    aria-expanded="false"
                >
                    <i class="bi bi-list fs-4"></i>
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
                                class="dashboard-user-name me-2 small fw-bold"
                            >
                                Usuario
                            </span>

                            <img
                                id="dashboardUserAvatar"
                                class="dashboard-avatar rounded-circle"
                                src=""
                                alt="Avatar"
                                width="32"
                                height="32"
                            >
                        </a>

                        <ul
                            class="dashboard-dropdown dropdown-menu dropdown-menu-end shadow"
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
            <main id="content" class="dashboard-content flex-grow-1">
                ${contenidoMain}                   
            </main>

        </div>

    </div>

    <!-- Contenedor de componentes -->
    <div id="dashboardComponents"></div>
`;
