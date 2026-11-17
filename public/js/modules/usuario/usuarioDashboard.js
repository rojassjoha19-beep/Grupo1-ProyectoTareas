import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { usuarioDashboardTemplate } from "../../templates/usuario/usuarioDashboardTemplate.js";

import { getTareas } from "../tareas/getTareas.js";
import { initCreateTarea } from "../tareas/createTarea.js";
import { initUpdateTarea } from "../tareas/updateTarea.js";
import { initDeleteTarea } from "../tareas/deleteTarea.js";
import { initFilterTarea } from "../tareas/filterTareas.js";

export const renderUsuarioDashboard = async (container) => {

    // Renderizar layout y obtener usuario
    const usuario = await renderDashboardLayout(
        container,
        usuarioDashboardTemplate()
    );

    if (!usuario) return;

    // Obtener permisos
    const permisos = Array.isArray(usuario.permisos)
        ? usuario.permisos
        : [];

    // Mostrar u ocultar botón según permisos
    const btnNuevaTarea = container.querySelector("#btnNuevaTarea");

    if (permisos.includes("tareas.crear")) {
        initCreateTarea();
    } else {
        btnNuevaTarea?.remove();
    }

    // Inicializar funcionalidades existentes
    initUpdateTarea();
    initDeleteTarea();
    initFilterTarea();

    // Cargar tareas si tiene permiso
    if (permisos.includes("tareas.ver")) {
        await getTareas();
    }
};