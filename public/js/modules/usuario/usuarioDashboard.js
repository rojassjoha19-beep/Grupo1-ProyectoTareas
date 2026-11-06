import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { usuarioDashboardTemplate } from "../../templates/usuario/usuarioDashboardTemplate.js";

export const renderUsuarioDashboard = async (container) => {
    const cargado = await renderDashboardLayout(
        container,
        usuarioDashboardTemplate()
    );

    if (!cargado) return;
};