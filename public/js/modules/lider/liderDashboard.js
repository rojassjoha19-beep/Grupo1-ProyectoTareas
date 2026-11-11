import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderDashboardTemplate } from "../../templates/lider/liderDashboardTemplate.js";

import { getTareas } from "../tareas/getTareas.js";
import { initCreateTarea } from "../tareas/createTarea.js";
import { initUpdateTarea } from "../tareas/updateTarea.js";
import { initDeleteTarea } from "../tareas/deleteTarea.js";
import { initFilterTarea } from "../tareas/filterTareas.js";



export const renderLiderDashboard = async (container) => {

    const usuario = await renderDashboardLayout(
        container,
        liderDashboardTemplate()
    );

    if (!usuario) return;

    // Inicializar tareas
    initCreateTarea();
    initUpdateTarea();
    initDeleteTarea();
    initFilterTarea();


    // Cargar tareas
    await getTareas();
};