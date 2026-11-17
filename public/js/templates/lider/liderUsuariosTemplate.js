export const liderUsuariosTemplate = () => `
    <div class="dashboard-container container-fluid px-4 py-4">

        <!-- Encabezado -->
        <div class="dashboard-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">

            <div>
                <h1 class="dashboard-title fw-bold mb-1">
                    Usuarios del <span>sistema</span>
                </h1>

                <p class="dashboard-subtitle mb-0">
                    Consultá los usuarios registrados
                </p>
            </div>

        </div>

        <!-- Buscador -->
        <div class="dashboard-filters row g-3 mb-4">

            <div class="col-12 col-md-5">
                <label
                    for="buscarUsuario"
                    class="form-label"
                >
                    Buscar usuario
                </label>

                <input
                    type="search"
                    id="buscarUsuario"
                    class="form-control"
                    placeholder="Buscar por nombre o correo"
                >
            </div>

        </div>

        <!-- Tabla de usuarios -->
        <div class="dashboard-card card border-0">

            <div class="card-body p-0">
                <div class="table-responsive">

                    <table
                        id="tablaUsuarios"
                        class="dashboard-table table table-hover align-middle mb-0"
                    >
                        <thead>
                            <tr>
                                <th class="ps-4">#</th>
                                <th>Nombre</th>
                                <th>Correo electrónico</th>
                                <th>Rol</th>
                            </tr>
                        </thead>

                        <tbody id="tablaUsuariosBody">
                            <tr>
                                <td colspan="4" class="text-center py-4">
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