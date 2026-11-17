import { dashboardMenu } from "../ui/dashboardMenu.js";
import { dashboardLayoutTemplate } from "../templates/layout/dashboardLayoutTemplate.js";
import { authService } from "../services/authService.js";
import { RUTA_AVATAR } from "../config.js";

export const renderDashboardLayout = async (container, contenido) => {

    // Comprobar sesión
    const response = await authService.checkSession();

    if (!response.success || !response.user) {
        window.location.href = "/Grupo1-ProyectoTareas/login";
        return false;
    }

    const usuario = response.user;
    const rolId = Number(usuario.rol_id);

    if (![1, 2, 3].includes(rolId)) {
        console.error("Rol no válido:", rolId);
        return false;
    }

    // Renderizar dashboard
    container.innerHTML = dashboardLayoutTemplate(contenido);

    // Renderizar menú lateral
    const menuContainer = container.querySelector("#dashboardMenu");

    if (menuContainer) {
        menuContainer.innerHTML = dashboardMenu(rolId);
    }

    // Abrir y cerrar menú
    const sidebarToggle = container.querySelector("#sidebarToggleTop");
    const sidebarClose = container.querySelector("#sidebarClose");

    if (sidebarToggle && sidebarClose && menuContainer) {

        const actualizarMenu = (abierto) => {
            menuContainer.classList.toggle("menu-cerrado", !abierto);
            sidebarToggle.classList.toggle("d-none", abierto);
            sidebarToggle.setAttribute("aria-expanded", String(abierto));
        };

        actualizarMenu(true);

        sidebarToggle.addEventListener("click", () => {
            actualizarMenu(true);
        });

        sidebarClose.addEventListener("click", () => {
            actualizarMenu(false);
        });
    }

    // Datos del usuario
    const userName = container.querySelector("#dashboardUserName");
    const userAvatar = container.querySelector("#dashboardUserAvatar");
    const btnCerrarSesion = container.querySelector("#btnCerrarSesion");

    if (userName) {
        userName.textContent = usuario.nombre;
    }

    if (userAvatar) {
        userAvatar.src = usuario.avatar
            ? RUTA_AVATAR + usuario.avatar
            : RUTA_AVATAR + "img_default.png";
    }

    // Cerrar sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", async () => {
            try {
                const logoutResponse = await authService.logout();

                if (logoutResponse.success) {
                    window.location.href =
                        "/Grupo1-ProyectoTareas/login";
                }

            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            }
        });
    }

    // Devolver los datos del usuario
    return usuario;
};