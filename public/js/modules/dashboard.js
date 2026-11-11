import { renderDashboardLayout } from "../layout/dashboardLayout.js";
import { tareasDashboardTemplate } from "../templates/tareasDashboardTemplete.js";
import { initCreateTarea } from "./tareas/createTarea.js";
import { getTareas } from "./tareas/getTareas.js";
import { initFilterTarea } from "./tareas/filterTareas.js";
import { initUpdateTarea } from "./tareas/updateTarea.js";
import { initDeleteTarea } from "./tareas/deleteTarea.js";
import { initCreateEquipo } from "./equipos/createEquipo.js"; 

export const renderDashboard = async (container) => {
    try {
        // Renderizar estructura general y contenido de tareas
        const cargado = await renderDashboardLayout(
            container,
            tareasDashboardTemplate()
        );

        if (!cargado) return;

        // Inicializar funcionalidades de tareas
        initCreateTarea();
        initUpdateTarea();
        initDeleteTarea();
        initFilterTarea();
<<<<<<< HEAD

        // Cargar listado de tareas
=======
        initCreateEquipo(response.user);
        //Cargar listado de tareas
>>>>>>> 54df5dc1cd768582fac15e7d90773062687d86e4
        await getTareas();

    } catch (error) {
        console.error("Error al cargar el Dashboard:", error);
    }
};
