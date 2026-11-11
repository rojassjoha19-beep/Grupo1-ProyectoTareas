import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { tareasAdminTemplate } from "../../templates/admin/tareasAdminDashboardTemplate.js";
import { getTareas } from "../tareas/getTareas.js";
import { initCreateTarea } from "../tareas/createTarea.js";
import { initUpdateTarea } from "../tareas/updateTarea.js";
import { initDeleteTarea } from "../tareas/deleteTarea.js";
import { initFilterTarea } from "../tareas/filterTareas.js";

export const renderTareasAdminDashboard = async (container) => {

    const usuario = await renderDashboardLayout(
        container,
        tareasAdminTemplate()
    );

    if (!usuario) return;

    const permisos = Array.isArray(usuario.permisos)
        ? usuario.permisos
        : [];

    // Crear tareas
    if (permisos.includes("tareas.crear")) {
        initCreateTarea();
    } else {
        container.querySelector("#btnNuevaTarea")?.remove();
    }

    // Inicializar funciones existentes
    // Los permisos de editar y eliminar deben
    // validarse también en cada acción.
    initUpdateTarea();
    initDeleteTarea();
    initFilterTarea();

    // Consultar tareas
    if (permisos.includes("tareas.ver")) {
        await getTareas();
    }
};