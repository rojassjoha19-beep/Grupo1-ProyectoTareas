import { renderHome } from "./modules/home/homeDashboard.js";
import { authService } from "./services/authService.js";

import {
    renderLogin,
    renderResetPassword,
    renderRegister,
    renderUpdatePassword,
} from "./modules/auth/index.js";

import { renderAdminDashboard } from "./modules/admin/adminDashboard.js";
import { renderUsuarioDashboard } from "./modules/usuario/usuarioDashboard.js";
import { renderUsuariosAdminDashBoard } from "./modules/admin/usuariosAdminDashboard.js";
import { renderLiderDashboard } from "./modules/lider/liderDashboard.js";
import { renderTareasAdminDashboard } from "./modules/admin/tareasAdminDashboard.js";

const basePath = "/Grupo1-ProyectoTareas";

// Rutas de la aplicación
const routes = {
    "/": renderHome,
    "/login": renderLogin,
    "/register": renderRegister,
    "/reset-password": renderResetPassword,
    "/update-password": renderUpdatePassword,

    "/dashboard/admin": renderAdminDashboard,
    "/dashboard/admin/tareas": renderTareasAdminDashboard,
    "/dashboard/admin/usuarios": renderUsuariosAdminDashBoard,
    "/dashboard/lider": renderLiderDashboard,
    "/dashboard/usuario": renderUsuarioDashboard,
};

// Dashboard correspondiente a cada rol
const rutasPorRol = {
    1: "/dashboard/admin",
    2: "/dashboard/lider",
    3: "/dashboard/usuario",
};

// Roles autorizados para cada ruta
const rolesPermitidos = {
    "/dashboard/admin": [1],
    "/dashboard/admin/tareas": [1],
    "/dashboard/admin/usuarios": [1],
    "/dashboard/lider": [2],
    "/dashboard/usuario": [3],
};

// Obtener la ruta sin el basePath
const getNormalizedPath = () => {
    const path = window.location.pathname;

    if (path === basePath || path === `${basePath}/`) {
        return "/";
    }

    if (path.startsWith(`${basePath}/`)) {
        return path.slice(basePath.length);
    }

    return path;
};

let navegacionActual = 0;

export const router = {

    handleRoute: async () => {
        const navegacion = ++navegacionActual;
        const path = getNormalizedPath();
        const container = document.getElementById("app");

        if (!container) {
            console.error("No se encontró el contenedor #app");
            return;
        }

        // Limpiar contenido anterior
        container.innerHTML = "";

        // Comprobar si es una ruta protegida
        const esRutaProtegida =
            path === "/dashboard" ||
            path.startsWith("/dashboard/");

        if (esRutaProtegida) {
            try {
                const response = await authService.checkSession();

                if (navegacion !== navegacionActual) return;

                // Verificar sesión
                if (!response.success || !response.user) {
                    router.navigateTo("/login");
                    return;
                }

                const rolId = Number(response.user.rol_id);
                const rutaUsuario = rutasPorRol[rolId];

                // Validar rol
                if (!rutaUsuario) {
                    console.error("Rol no válido:", rolId);
                    router.navigateTo("/login");
                    return;
                }

                // Redirigir al dashboard correspondiente
                if (path === "/dashboard") {
                    router.navigateTo(rutaUsuario);
                    return;
                }

                // Verificar permisos
                const roles = rolesPermitidos[path];

                if (!roles || !roles.includes(rolId)) {
                    console.warn(
                        `Acceso denegado: rol ${rolId}, ruta ${path}`
                    );

                    router.navigateTo(rutaUsuario);
                    return;
                }

            } catch (error) {
                if (navegacion !== navegacionActual) return;

                console.error("Error al verificar la sesión:", error);
                router.navigateTo("/login");
                return;
            }
        }

        if (navegacion !== navegacionActual) return;

        // Obtener función correspondiente a la ruta
        const renderFn = routes[path];

        if (typeof renderFn !== "function") {
            console.error("Ruta no encontrada:", path);
            container.textContent = "Página no encontrada";
            return;
        }

        // Renderizar página
        try {
            await renderFn(container);
        } catch (error) {
            console.error("Error al renderizar la página:", error);

            if (navegacion === navegacionActual) {
                container.textContent = "Error al cargar la página";
            }
        }
    },

    navigateTo: (url) => {
        const targetUrl = url.startsWith(basePath)
            ? url
            : `${basePath}${url.startsWith("/") ? url : `/${url}`}`;

        window.history.pushState({}, "", targetUrl);

        return router.handleRoute();
    },

    init: () => {
        // Navegación sin recargar la página
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a[data-link]");

            if (link) {
                e.preventDefault();

                const targetUrl = link.getAttribute("href");

                if (targetUrl) {
                    router.navigateTo(targetUrl);
                }
            }
        });

        // Navegación con botones del navegador
        window.addEventListener("popstate", () => {
            router.handleRoute();
        });

        router.handleRoute();
    },
};