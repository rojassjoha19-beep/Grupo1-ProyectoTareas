
import { dashboardMenu } from "../ui/dashboardMenu.js";
import { dashboardTemplate } from "../templates/dashboardTemplate.js";
import { authService } from "../services/authService.js";
import { RUTA_AVATAR } from "../config.js";
import { initCreateTarea } from "./tareas/createTarea.js";
import { getTareas } from "./tareas/getTareas.js";
import { initFilterTarea } from "./tareas/filterTareas.js";
import { initUpdateTarea } from "./tareas/updateTarea.js";
import { initDeleteTarea } from "./tareas/deleteTarea.js";
import { initCreateEquipo } from "./equipos/createEquipo.js"; 

export const renderDashboard = async (container) => {
    try {
        //Comprobar sesión
        const response = await authService.checkSession();

        if (!response.success || !response.user) {
            window.location.href = "/Grupo1-ProyectoTareas/login";
            return;
        }

        //Obtener permisos del usuario
        const permisos = Array.isArray(response.user.permisos)
            ? response.user.permisos
            : [];

        //Renderizar Dashboard
        container.innerHTML = dashboardTemplate();

        //Renderizar menú lateral
        const menuContainer = container.querySelector("#dashboardMenu");

        if (menuContainer) {
            menuContainer.innerHTML = dashboardMenu(permisos);
        }

        // Botones para abrir y cerrar el menú
        const sidebarToggle = container.querySelector("#sidebarToggleTop");
        const sidebarClose = container.querySelector("#sidebarClose");

        if (sidebarToggle && sidebarClose && menuContainer) {

            // Función que controla el estado del menú
            const actualizarMenu = (abierto) => {
                menuContainer.classList.toggle("menu-cerrado", !abierto);

                // Mostrar hamburguesa solamente cuando esté cerrado
                sidebarToggle.classList.toggle("d-none", abierto);

                sidebarToggle.setAttribute("aria-expanded", String(abierto));
            };

            // Estado inicial: menú abierto
            actualizarMenu(true);

            // Abrir menú
            sidebarToggle.addEventListener("click", () => {
                actualizarMenu(true);
            });

            // Cerrar menú
            sidebarClose.addEventListener("click", () => {
                actualizarMenu(false);
            });
        }
        

        //Obtener elementos del usuario
        const userName = container.querySelector("#dashboardUserName");
        const userAvatar = container.querySelector("#dashboardUserAvatar");
        const btnCerrarSesion = container.querySelector("#btnCerrarSesion");

        //Nombre del usuario
        if (userName) {
            userName.textContent = response.user.nombre;
        }

        //Avatar
        if (userAvatar) {
            userAvatar.src = response.user.avatar
                ? RUTA_AVATAR + response.user.avatar
                : RUTA_AVATAR + "img_default.png";
        }

        //Cerrar sesión
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener("click", async () => {
                try {
                    const logoutResponse = await authService.logout();

                    if (logoutResponse.success) {
                        window.location.href =
                            "/Grupo1-ProyectoTareas/login";
                    }
                } catch (error) {
                    console.error(
                        "Error al cerrar sesión:",
                        error
                    );
                }
            });
        }

        //Inicializar funcionalidades de tareas
        initCreateTarea();
        initUpdateTarea();
        initDeleteTarea();
        initFilterTarea();
        initCreateEquipo(response.user);
        //Cargar listado de tareas
        await getTareas();

    } catch (error) {
        console.error(
            "Error al cargar el Dashboard:",
            error
        );
    }
};
