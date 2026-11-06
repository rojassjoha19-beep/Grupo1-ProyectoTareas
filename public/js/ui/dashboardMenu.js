
export const dashboardMenu = (permisos = []) => `
    <div class="menu">

        <div class="menu-header">
            <h2 class="menu-title">Gestor de Tareas</h2>

            <button
                id="sidebarClose"
                class="menu-close"
                type="button"
                aria-label="Cerrar menú"
            >
                <i class="bi bi-x-lg"></i>
            </button>
        </div>

        <nav class="menu-nav">

            <a href="/dashboard" data-link>
                <i class="bi bi-speedometer2"></i>
                Dashboard
            </a>

            ${permisos.includes("tareas.ver") ? `
                <a href="/tareas" data-link>
                    <i class="bi bi-list-task"></i>
                    Tareas
                </a>
            ` : ""}

            ${permisos.includes("usuarios.ver") ? `
                <a href="/admin/usuarios" data-link>
                    <i class="bi bi-people"></i>
                    Gestión de usuarios
                </a>
            ` : ""}

            ${permisos.includes("equipos.ver") ? `
                <a href="/equipos" data-link>
                    <i class="bi bi-diagram-3"></i>
                    Equipos
                </a>
            ` : ""}

            ${permisos.includes("roles.ver") ? `
                <a href="/roles" data-link>
                    <i class="bi bi-person-badge"></i>
                    Roles
                </a>
            ` : ""}

            ${permisos.includes("permisos.ver") ? `
                <a href="/permisos" data-link>
                    <i class="bi bi-shield-lock"></i>
                    Permisos
                </a>
            ` : ""}

        </nav>
    </div>
`;
