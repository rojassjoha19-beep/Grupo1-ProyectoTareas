import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { adminDashboardTemplate } from "../../templates/admin/adminDashboardTemplate.js";

export const renderAdminDashboard = async (container) => {
    const cargado = await renderDashboardLayout(
        container,
        adminDashboardTemplate()
    );

    if (!cargado) return;
};