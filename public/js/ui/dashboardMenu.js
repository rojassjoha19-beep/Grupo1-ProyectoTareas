export const dashboardMenu = (rolId) => {

    const rutasDashboard = {
        1: "/dashboard/admin",
        2: "/dashboard/lider",
        3: "/dashboard/usuario"
    };

    const rutaDashboard = rutasDashboard[rolId] || "/dashboard";

    return `
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

                <a href="${rutaDashboard}" data-link>
                    <i class="bi bi-speedometer2"></i>
                    Dashboard
                </a>

                ${rolId === 1 ? `
                    <a href="/admin/usuarios" data-link>
                        <i class="bi bi-people"></i>
                        Gestión de usuarios
                    </a>

                    <a href="/admin/proyectos" data-link>
                        <i class="bi bi-folder"></i>
                        Proyectos
                    </a>
                ` : ""}

                ${rolId === 2 ? `
                    <a href="/dashboard/lider" data-link>
                        <i class="bi bi-list-task"></i>
                        Tareas del equipo
                    </a>
                ` : ""}

                ${rolId === 3 ? `
                    <a href="/dashboard/usuario" data-link>
                        <i class="bi bi-list-task"></i>
                        Mis tareas
                    </a>
                ` : ""}

            </nav>
        </div>
    `;
};