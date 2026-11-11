import { renderDashboardLayout } from "../layout/dashboardLayout.js";
import { tareasDashboardTemplate } from "../templates/tareasDashboardTemplete.js";
import { initCreateTarea } from "./tareas/createTarea.js";
import { getTareas } from "./tareas/getTareas.js";
import { initFilterTarea } from "./tareas/filterTareas.js";
import { initUpdateTarea } from "./tareas/updateTarea.js";
import { initDeleteTarea } from "./tareas/deleteTarea.js";


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
   
        //Cargar listado de tareas
=======

        // Cargar listado de tareas
>>>>>>> origin/main
        await getTareas();

    } catch (error) {
        console.error("Error al cargar el Dashboard:", error);
    }
};
