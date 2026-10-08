
import { dashboardTemplate } from "../templates/dashboardTemplate.js";
import { authService } from "../services/authService.js";
import { RUTA_AVATAR } from "../config.js";
import { initCreateTarea } from "./tareas/createTarea.js";
import { getTareas } from "./tareas/getTareas.js";
import { initFilterTarea } from "./tareas/filterTareas.js";
import { initUpdateTarea } from "./tareas/updateTarea.js";
import { initDeleteTarea } from "./tareas/deleteTarea.js";
export const renderDashboard = async (container) => {
    container.innerHTML = dashboardTemplate();

    try {
        const response = await authService.checkSession();

        if (!response.success || !response.user) {
            window.location.href = "/proyecto-tareas/login";
            return;
        }

        const userName =
            document.getElementById("dashboardUserName");

        const userAvatar =
            document.getElementById("dashboardUserAvatar");

        const btnCerrarSesion =
            document.getElementById("btnCerrarSesion");

        // Nombre del usuario
        if (userName) {
            userName.textContent = response.user.nombre;
        }

        // Avatar
        if (userAvatar) {
            userAvatar.src = response.user.avatar
                ? RUTA_AVATAR + response.user.avatar
                : RUTA_AVATAR + "img_default.png";
        }

        // Logout
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener("click", async () => {
                try {
                    const logoutResponse =
                        await authService.logout();

                    if (logoutResponse.success) {
                        window.location.href =
                            "/proyecto-tareas/login";
                    }
                } catch (error) {
                    console.error(
                        "Error al cerrar sesión:",
                        error,
                    );
                }
            });
        }

        // Inicializar creación de tareas
        initCreateTarea();
        initUpdateTarea();
        initDeleteTarea();
        initFilterTarea();

        // Cargar listado de tareas
        await getTareas();

    } catch (error) {
        console.error(
            "Error al cargar la sesión:",
            error,
        );
    }
};

