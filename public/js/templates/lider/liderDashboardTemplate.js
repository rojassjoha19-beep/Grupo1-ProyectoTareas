
export const liderDashboardTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">

            <div>
                <h1 class="dashboard-title fw-bold mb-1">
                    Tareas del <span>equipo</span>
                </h1>

                <p class="dashboard-subtitle mb-0">
                    Asigná y supervisá las actividades de tu equipo
                </p>
            </div>

            <button
                id="btnNuevaTarea"
                type="button"
                class="btn btn-main"
            >
                <i class="bi bi-plus-circle me-2"></i>
                Nueva tarea
            </button>
        </div>

        <!-- Estadísticas -->
        <div class="row g-3 mb-4">

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalTareasEquipo" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Total</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalToDoEquipo" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">ToDo</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalEnCursoEquipo" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">En curso</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
                <div class="dashboard-card card border-0 h-100">
                    <div class="card-body">
                        <h2 id="totalVencidasEquipo" class="fw-bold mb-1">0</h2>
                        <p class="text-muted mb-0">Vencidas</p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Filtros -->
        <div class="dashboard-filters row g-3 mb-4">

            <div class="col-12 col-md-4">
                <label for="filtroEmpleado" class="form-label">
                    Filtrar por empleado
                </label>

                <select id="filtroEmpleado" class="form-select">
                    <option value="">Todos los empleados</option>
                </select>
            </div>

            <div class="col-12 col-md-4">
                <label for="filtroEstadoEquipo" class="form-label">
                    Filtrar por estado
                </label>

                <select id="filtroEstadoEquipo" class="form-select">
                    <option value="">Todos los estados</option>
                    <option value="1">ToDo</option>
                    <option value="2">En curso</option>
                    <option value="3">Finalizada</option>
                    <option value="4">Vencida</option>
                </select>
            </div>

        </div>

        <!-- Tabla de tareas -->
        <div class="dashboard-card card border-0">

            <div class="card-body p-0">
                <div class="table-responsive">

                    <table class="dashboard-table table table-hover align-middle mb-0">

                        <thead>
                            <tr>
                                <th class="ps-4">#</th>
                                <th>Título</th>
                                <th>Asignado a</th>
                                <th>Vencimiento</th>
                                <th>Estado</th>
                                <th class="text-center pe-4">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="tablaTareasEquipoBody">
                            <tr>
                                <td colspan="6" class="text-center py-4">
                                    Cargando tareas del equipo...
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        </div>

    </div>
`;
