import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderDashboardTemplate } from "../../templates/lider/liderDashboardTemplate.js";

export const renderLiderDashboard = async (container) => {
    try {
        const cargado = await renderDashboardLayout(
            container,
            liderDashboardTemplate()
        );

        if (!cargado) return;

    } catch (error) {
        console.error("Error al cargar Dashboard del líder:", error);
    }
};