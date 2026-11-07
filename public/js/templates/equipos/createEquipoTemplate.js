// Si un nombre trae símbolos raros (< > & "), esto evita que rompa el HTML
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
  Recibe los datos y devuelve la pantalla ya armada:
  - usuario: la persona que inició sesión (id, nombre, apellido y rol)
  - usuarios: la gente que se puede elegir como integrante
  - lideres: los jefes o administradores que pueden ser líder.
    Si no llega, en el select solo aparece el usuario que inició sesión
*/
export const createEquipoTemplate = ({ usuario = {}, usuarios = [], lideres = null } = {}) => {
    const listaLideres = lideres ?? [usuario];
    // Opciones del líder: el value es el id y el texto es el nombre.
    // La persona que inició sesión queda elegida y aparece con "(tú)"
    const opcionesLider = listaLideres.map((l) => {
        const esYo = String(l.id) === String(usuario.id);
        return `<option value="${esc(l.id)}" ${esYo ? 'selected' : ''}>${esc(nombreCompleto(l))}${esYo ? ' (tú)' : ''}</option>`;
    }).join('');

    // Lista de integrantes: cada checkbox guarda el id de la persona.
    // El nombre está solo para que se vea en pantalla
    const itemsUsuarios = usuarios.length
        ? usuarios.map((u) => `
                            <li class="list-group-item px-0" data-nombre="${esc(nombreCompleto(u).toLowerCase())}">
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
<link rel="stylesheet" href="/Grupo1-ProyectoTareas/public/css/equipos.css">
<div class="equipo-page">

<!-- Barra de arriba, con el nombre de quien inició sesión -->
<nav class="navbar bg-white border-bottom">
    <div class="container">
        <span class="navbar-brand fw-bold">
            <i class="bi bi-check2-circle"></i>
            Gestor de Tareas
        </span>

        <div class="d-flex align-items-center gap-2">
            ${usuario.rol ? `<span class="badge rounded-pill">${esc(usuario.rol)}</span>` : ''}
            <span>${esc(nombreCompleto(usuario))}</span>
        </div>
    </div>
</nav>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9">

            <!-- Título centrado -->
            <div class="text-center mb-4">
                <p class="small mb-2">
                    <a href="/equipos" data-link>Mis equipos</a> / Nuevo equipo
                </p>
                <h1 class="fw-bold">Crear equipo</h1>
                <p class="small mb-0">Definí el equipo, su líder y quiénes lo integran</p>
            </div>

            <form id="formCreateEquipo" novalidate>
                <div class="row g-4">

                    <!-- Tarjeta de la izquierda: nombre, descripción y líder -->
                    <div class="col-md-6">
                        <div class="card h-100 rounded-4">
                            <div class="card-body p-4">
                                <h2 class="h5 fw-bold mb-4">Datos del equipo</h2>

                                <div class="mb-3">
                                    <label for="equipoNombre" class="form-label small">Nombre del equipo</label>
                                    <input type="text" name="nombre" class="form-control" id="equipoNombre" required>
                                </div>

                                <div class="mb-3">
                                    <label for="equipoDescripcion" class="form-label small">Descripción</label>
                                    <textarea name="descripcion" class="form-control" id="equipoDescripcion" rows="4"></textarea>
                                </div>

                                <div class="mb-0">
                                    <label for="equipoLider" class="form-label small">Líder del equipo</label>
                                    <select name="id_lider" class="form-select" id="equipoLider" required>
                                        ${opcionesLider}
                                    </select>
                                    <div class="form-text">El líder debe ser un jefe o un administrador.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tarjeta de la derecha: buscador, lista y etiquetas de los elegidos -->
                    <div class="col-md-6">
                        <div class="card h-100 rounded-4">
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

                <!-- Botones al centro -->
                <div class="d-flex justify-content-center gap-3 mt-4">
                    <a href="/equipos" class="btn btn-outline-success" data-link>Cancelar</a>
                    <button type="submit" class="btn btn-success fw-bold">Crear equipo</button>
                </div>
            </form>

        </div>
    </div>
</div>

</div>
`;
};