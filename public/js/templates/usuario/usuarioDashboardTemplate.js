
export const usuarioDashboardTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">

            <div>
                <h1 class="dashboard-title mb-1 fw-bold">
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
                Nueva tarea
            </button>

        </div>

        <!-- Filtros -->
        <div class="dashboard-filters row g-3 align-items-end mb-4">

            <!-- Estado -->
            <div class="col-12 col-md-4 col-lg-3">
                <label
                    for="selectFiltroEstado"
                    class="form-label small fw-semibold"
                >
                    Filtrar por estado
                </label>

                <select
                    id="selectFiltroEstado"
                    class="form-select"
                >
                    <option value="0">Todos los estados</option>
                </select>
            </div>

            <!-- Vencimiento -->
            <div class="col-12 col-md-4 col-lg-3">
                <label
                    for="filtroFechaVencimiento"
                    class="form-label small fw-semibold"
                >
                    Filtrar por vencimiento
                </label>

                <input
                    type="date"
                    id="filtroFechaVencimiento"
                    class="form-control"
                >
            </div>

            <!-- Limpiar filtros -->
            <div class="col-12 col-md-auto d-flex align-items-end">
                <button
                    type="button"
                    id="btnLimpiarFiltros"
                    class="btn btn-secondary-custom"
                >
                    <i class="bi bi-arrow-counterclockwise"></i>
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
`;
