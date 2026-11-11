export const liderEquiposTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">

            <div>
                <h1 class="dashboard-title fw-bold mb-1">
                    Gestión de <span>equipos</span>
                </h1>

                <p class="dashboard-subtitle mb-0">
                    Creá equipos y gestioná sus integrantes
                </p>
            </div>

            <button
                id="btnNuevoEquipo"
                type="button"
                class="btn btn-main"
            >
                <i class="bi bi-plus-circle me-2"></i>
                Nuevo equipo
            </button>

        </div>

        <!-- Buscador -->
        <div class="dashboard-filters row g-3 mb-4">

            <div class="col-12 col-md-5">
                <label
                    for="buscarEquipo"
                    class="form-label"
                >
                    Buscar equipo
                </label>

                <input
                    type="search"
                    id="buscarEquipo"
                    class="form-control"
                    placeholder="Buscar por nombre"
                >
            </div>

        </div>

        <!-- Tabla de equipos -->
        <div class="dashboard-card card border-0">

            <div class="card-body p-0">
                <div class="table-responsive">

                    <table
                        id="tablaEquipos"
                        class="dashboard-table table table-hover align-middle mb-0"
                    >
                        <thead>
                            <tr>
                                <th class="ps-4">#</th>
                                <th>Nombre del equipo</th>
                                <th>Integrantes</th>
                                <th class="text-center pe-4">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="tablaEquiposBody">
                            <tr>
                                <td colspan="4" class="text-center py-4">
                                    Cargando equipos...
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>

        </div>

    </div>
`;