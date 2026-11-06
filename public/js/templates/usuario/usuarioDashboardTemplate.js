export const usuarioDashboardTemplate = () => `
            <!-- Contenido usuario -->
                <div class="dashboard-container container-fluid px-4 py-4">

                    <!-- Encabezado -->
                    <div class="dashboard-header d-flex align-items-center justify-content-between mb-4">

                        <div>
                            <h1 class="dashboard-title mb-0 fw-bold">
                                Tus <span>tareas</span>
                            </h1>

                            <p class="dashboard-subtitle small mb-0">
                                Gestión dinámica de actividades
                            </p>
                        </div>

                        <button
                            id="btnNuevaTarea"
                            type="button"
                            class="btn btn-main"
                        >
                            <i class="bi bi-plus-circle me-1"></i>
                            Nueva Tarea
                        </button>

                    </div>

                    <!-- Filtros -->
                    <div class="dashboard-filters row mb-4">
                        <div class="col-md-4">

                            <label
                                for="selectFiltroEstado"
                                class="form-label small"
                            >
                                Filtrar por estado
                            </label>

                            <select
                                id="selectFiltroEstado"
                                class="form-select form-select-sm"
                            >
                                <option value="0">
                                    Todos los estados
                                </option>
                            </select>

                        </div>

                        <div class="col-md-4">
                            <label
                                for="filtroFechaVencimiento"
                                class="form-label small"
                            >
                                Filtrar por vencimiento
                            </label>
                            <input
                                type="date"
                                id="filtroFechaVencimiento"
                                class="form-control form-control-sm"
                            >
                        </div>

                        <div class="col-md-2 d-flex align-items-end">
                            <button
                                type="button"
                                id="btnLimpiarFiltros"
                                class="btn btn-outline-secondary btn-sm w-100"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>

                    <!-- Tabla -->
                    <div class="dashboard-card card border-0">

                        <div class="card-body p-0">
                            <div class="table-responsive">

                                <table
                                    id="tablaTareas"
                                    class="dashboard-table table table-hover align-middle mb-0"
                                >
                                    <thead>
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
                                        <!-- Tareas dinámicas -->
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
    <!-- Contenedor de componentes -->
    <div id="dashboardComponents"></div>
`;