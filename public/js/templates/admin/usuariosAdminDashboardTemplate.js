
export const usuariosAdminDashboardTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
                <h1 class="dashboard-title fw-bold mb-1">
                    Gestión de <span>usuarios</span>
                </h1>
                <p class="dashboard-subtitle mb-0">
                    Administración de miembros, líderes y asignación de roles
                </p>
            </div>

            <a
                href="/Grupo1-ProyectoTareas/dashboard/admin"
                data-link
                class="btn btn-main"
            >
                <i class="bi bi-arrow-left me-2"></i>
                Volver al panel general
            </a>
        </div>

        <!-- Estadísticas -->
        <div class="row g-3 mb-4">
            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0">
                    <div class="card-body">
                        <h2 id="totalUsuarios" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Total usuarios</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0">
                    <div class="card-body">
                        <h2 id="totalLideres" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Líderes</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0">
                    <div class="card-body">
                        <h2 id="totalMiembros" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Miembros</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0">
                    <div class="card-body">
                        <h2 id="totalSinAsignar" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Sin asignar</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtros -->
        <div class="dashboard-filters row g-3 mb-4">
            <div class="col-12 col-md-4">
                <label for="filtroRol" class="form-label">
                    Filtrar por rol
                </label>
                <select id="filtroRol" class="form-select">
                    <option value="">Todos los roles</option>
                    <option value="LEADER">Líder</option>
                    <option value="USER">Miembro</option>
                </select>
            </div>

            <div class="col-12 col-md-4">
                <label for="filtroEquipo" class="form-label">
                    Filtrar por equipo
                </label>
                <select id="filtroEquipo" class="form-select">
                    <option value="">Todos los equipos</option>
                </select>
            </div>
        </div>

        <!-- Tabla de usuarios -->
        <div class="dashboard-card card border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="dashboard-table table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th class="ps-4">#</th>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Equipo</th>
                                <th>Tareas activas</th>
                                <th class="text-center pe-4">Acciones</th>
                            </tr>
                        </thead>

                        <tbody id="tablaUsuariosBody">
                            <tr>
                                <td colspan="6" class="text-center py-4">
                                    Cargando usuarios...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`;
