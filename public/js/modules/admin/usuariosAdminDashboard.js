import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { usuariosAdminDashboardTemplate } from "../../templates/admin/usuariosAdminDashboardTemplate.js";

export const renderUsuariosAdminDashBoard = async (container) => {
    try {
        const cargado = await renderDashboardLayout(
            container,
            usuariosAdminDashboardTemplate()
        );

        if (!cargado) return;

        console.log("Vista de usuarios cargada");

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
};