
import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { usuarioDashboardTemplate } from "../../templates/usuario/usuarioDashboardTemplate.js";

import { getTareas } from "../tareas/getTareas.js";
import { initCreateTarea } from "../tareas/createTarea.js";
import { initUpdateTarea } from "../tareas/updateTarea.js";
import { initDeleteTarea } from "../tareas/deleteTarea.js";
import { initFilterTarea } from "../tareas/filterTareas.js";

export const renderUsuarioDashboard = async (container) => {
    const cargado = await renderDashboardLayout(
        container,
        usuarioDashboardTemplate()
    );

    if (!cargado) return;

    // Inicializar funcionalidades
    initCreateTarea();
    initUpdateTarea();
    initDeleteTarea();
    initFilterTarea();

    // Cargar tareas desde el backend
    await getTareas();
};
