
export const adminDashboardTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap
                    align-items-center justify-content-between
                    gap-3 mb-4">

            <div>
                <h1 class="dashboard-title fw-bold mb-1">
                    Panel <span>general</span>
                </h1>

                <p class="dashboard-subtitle mb-0">
                    Resumen de equipos, líderes y usuarios
                </p>
            </div>

            <a
                href="/Grupo1-ProyectoTareas/admin/usuarios"
                data-link
                class="btn btn-main"
            >
                <i class="bi bi-people me-2"></i>
                Gestionar usuarios y roles
            </a>
        </div>

        <!-- Estadísticas -->
        <div class="row g-3 mb-4">

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="card dashboard-card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalEquipos" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Equipos</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="card dashboard-card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalTareas" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Tareas totales</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="card dashboard-card border-0 h-100">
                    <div class="card-body">
                        <h2 id="porcentajeCumplimiento"
                            class="fw-bold mb-1">0%</h2>
                        <p class="text-muted mb-0">Cumplimiento</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="card dashboard-card border-0 h-100">
                    <div class="card-body">
                        <h2 id="tareasVencidas" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Vencidas</p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Filtro -->
        <div class="dashboard-filters row mb-4">
            <div class="col-12 col-md-4">
                <label for="filtroEquipo" class="form-label">
                    Filtrar por equipo
                </label>

                <select id="filtroEquipo" class="form-select">
                    <option value="">Todos los equipos</option>
                </select>
            </div>
        </div>

        <!-- Tabla -->
        <div class="dashboard-card card border-0">
            <div class="card-body p-0">
                <div class="table-responsive">

                    <table class="dashboard-table table
                                  table-hover align-middle mb-0">

                        <thead>
                            <tr>
                                <th class="ps-4">#</th>
                                <th>Equipo</th>
                                <th>Líder</th>
                                <th>Integrantes</th>
                                <th>Tareas</th>
                                <th>Avance</th>
                                <th class="text-center pe-4">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="tablaEquiposBody">
                            <tr>
                                <td colspan="7"
                                    class="text-center py-4">
                                    No hay equipos para mostrar
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        </div>

    </div>
`;
