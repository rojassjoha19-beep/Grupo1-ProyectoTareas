import { adminDashboardTemplate } from "../templates/admin/adminDashboardTemple.js";


export const renderAdminDashboard = (container) => {
    container.innerHTML = adminDashboardTemplate();
};