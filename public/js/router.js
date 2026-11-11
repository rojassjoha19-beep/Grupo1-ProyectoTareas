
import { renderHome } from "./modules/home/homeDashboard.js";
import { authService } from "./services/authService.js";
import { authService } from "./services/authService.js";

import {
    renderLogin,
    renderResetPassword,
    renderRegister,
    renderUpdatePassword,
} from "./modules/auth/index.js";

import { renderDashboard } from "./modules/dashboard.js";
import { renderAdminDashboard } from "./modules/admin/adminDashboard.js";
import { renderUsuarioDashboard } from "./modules/usuario/usuarioDashboard.js";
import { renderUsuariosAdminDashBoard } from "./modules/admin/usuariosAdminDashboard.js";
import { renderLiderDashboard } from "./modules/lider/liderDashboard.js";

const basePath = "/Grupo1-ProyectoTareas";

const routes = {
    "/": renderHome,
    "/login": renderLogin,
    "/register": renderRegister,
    "/reset-password": renderResetPassword,
    "/update-password": renderUpdatePassword,
    "/dashboard": renderDashboard,
    "/dashboard/admin": renderAdminDashboard,
    "/dashboard/admin/usuarios": renderUsuariosAdminDashBoard,
    "/dashboard/lider": renderLiderDashboard,
    "/dashboard/usuario": renderUsuarioDashboard,
};

const rutasPorRol = {
    1: "/dashboard/admin",
    2: "/dashboard/lider",
    3: "/dashboard/usuario",
};

const rolesPermitidos = {
    "/dashboard/admin": [1],
    "/dashboard/admin/usuarios": [1],
    "/dashboard/lider": [2],
    "/dashboard/usuario": [3],
};

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

        // Limpiar la vista anterior antes de validar el acceso
        container.innerHTML = "";

        const esRutaProtegida =
            path === "/dashboard" ||
            path.startsWith("/dashboard/");

        if (esRutaProtegida) {
            try {
                const response = await authService.checkSession();

                // Evitar renderizar una navegación anterior
                if (navegacion !== navegacionActual) return;

                if (!response.success || !response.user) {
                    router.navigateTo("/login");
                    return;
                }

                const rolId = Number(response.user.rol_id);
                const rutaUsuario = rutasPorRol[rolId];

                if (!rutaUsuario) {
                    console.error("Rol no válido:", rolId);
                    router.navigateTo("/login");
                    return;
                }

                // Redirigir /dashboard según el rol
                if (path === "/dashboard") {
                    router.navigateTo(rutaUsuario);
                    return;
                }

                // Comprobar autorización
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

        const renderFn = routes[path];

        if (typeof renderFn !== "function") {
            console.error("Ruta no encontrada:", path);
            container.textContent = "Página no encontrada";
            return;
        }

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

        window.addEventListener("popstate", () => {
            router.handleRoute();
        });

        router.handleRoute();
    },
};
