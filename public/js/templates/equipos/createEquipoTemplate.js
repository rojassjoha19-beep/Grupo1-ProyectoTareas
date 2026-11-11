// Si un nombre trae símbolos raros
const esc = (valor) =>
    String(valor ?? '').replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
// Junta nombre y apellido. Si alguien no tiene apellido, deja solo el nombre
const nombreCompleto = (u = {}) =>
    [u.nombre, u.apellido].filter(Boolean).join(' ');
/*
  Devuelve solo el formulario, porque se muestra dentro del dashboard
  - usuario: la persona que inició sesión
  - usuarios: la gente que se puede elegir como integrante
*/
export const createEquipoTemplate = ({ usuario = {}, usuarios = [] } = {}) => {
    // El líder es quien crea el equipo, por eso el select muestra solo a esa persona
    const opcionLider = `<option value="${esc(usuario.id)}" selected>${esc(nombreCompleto(usuario) || 'Tú')} (tú)</option>`;
    
     // Lista de integrantes: cada checkbox guarda el id de la persona
    const itemsUsuarios = usuarios.length
        ? usuarios.map((u) => `
                            <li class="list-group-item px-0" data-nombre="${esc(nombreCompleto(u))}">
                                <div class="form-check mb-0">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="integrantes"
                                        value="${esc(u.id)}"
                                        id="integrante-${esc(u.id)}"
                                        data-nombre="${esc(nombreCompleto(u))}"
                                    >
                                    <label class="form-check-label" for="integrante-${esc(u.id)}">
                                        ${esc(nombreCompleto(u))}
                                    </label>
                                </div>
                            </li>`).join('')
        : '<li class="list-group-item px-0 text-muted">No hay usuarios disponibles.</li>';

    return `

<div class="equipo-page dashboard-container container-fluid px-4 py-4">
    <div class="row justify-content-center">
        <div class="col-xl-10">

            <div class="text-center mb-4">
                <h1 class="dashboard-title mb-0 fw-bold">
                    Crear <span>equipo</span>
                </h1>
                <p class="dashboard-subtitle small mb-0">
                    Definí el equipo y quiénes lo integran
                </p>
            </div>

            <form id="formCreateEquipo" novalidate>
                <div class="row g-4">

                    <div class="col-md-6">
                        <div class="dashboard-card card border-0 h-100">
                            <div class="card-body p-4">
                                <h2 class="h5 fw-bold mb-4">Datos del equipo</h2>

                                <div class="mb-3">
                                    <label for="equipoNombre" class="form-label small">Nombre del equipo</label>
                                    <input type="text" name="nombre" class="form-control" id="equipoNombre" maxlength="50" required>
                                </div>

                                <div class="mb-0">
                                    <label for="equipoLider" class="form-label small">Líder del equipo</label>
                                    <select name="id_lider" class="form-select" id="equipoLider" disabled>
                                        ${opcionLider}
                                    </select>
                                    <div class="form-text">Quien crea el equipo queda como líder.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="dashboard-card card border-0 h-100">
                            <div class="card-body p-4">
                                <h2 class="h5 fw-bold mb-4">Integrantes</h2>

                                <div class="mb-3">
                                    <label for="buscarUsuario" class="form-label small">Buscar usuario</label>
                                    <input type="text" class="form-control" id="buscarUsuario" autocomplete="off">
                                </div>

                                <ul class="list-group list-group-flush mb-3" id="listaUsuarios">
                                    ${itemsUsuarios}
                                </ul>

                                <p class="small mb-2">
                                    Seleccionados (<span id="contadorSeleccionados">0</span>)
                                </p>
                                <div class="d-flex flex-wrap gap-2" id="chipsSeleccionados"></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="d-flex justify-content-center gap-3 mt-4">
                    <button type="button" id="btnCancelarEquipo" class="btn btn-outline-secondary">Cancelar</button>
                    <button type="submit" class="btn btn-main">Crear equipo</button>
                </div>
            </form>

        </div>
    </div>
</div>
`;
};