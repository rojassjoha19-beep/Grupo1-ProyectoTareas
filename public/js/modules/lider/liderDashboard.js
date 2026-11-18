import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderDashboardTemplate } from "../../templates/lider/liderDashboardTemplate.js";

import { getTareas } from "../tareas/getTareas.js";
import { initCreateTarea } from "../tareas/createTarea.js";
import { initUpdateTarea } from "../tareas/updateTarea.js";
import { initDeleteTarea } from "../tareas/deleteTarea.js";
import { initFilterTarea } from "../tareas/filterTareas.js";
import { tareaService } from "../../services/tareaService.js";

// Llena el filtro con los miembros de los equipos que lidera
const cargarEmpleados = async () => {
    const select = document.getElementById("filtroEmpleado");
    if (!select) return;

    try {
        const respEquipos = await tareaService.getMisEquipos();
        if (!respEquipos.ok) return;

        const empleados = new Map();

        for (const equipo of respEquipos.equipos) {
            const resp = await tareaService.getMiembrosEquipo(equipo.id);
            if (resp.ok) {
                resp.miembros.forEach((m) =>
                    empleados.set(m.id, `${m.nombre} ${m.apellido}`),
                );
            }
        }

        select.innerHTML =
            `<option value="">Todos los empleados</option>` +
            [...empleados]
                .map(([id, nombre]) => `<option value="${id}">${nombre}</option>`)
                .join("");

        select.addEventListener("change", () => {
            const estado = document.getElementById("selectFiltroEstado");
            getTareas(estado ? estado.value : 0);
        });
    } catch (error) {
        console.error("Error al cargar los empleados:", error);
    }
};
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


    // Cargar tareas y selector de empleados 
    await getTareas();
    await cargarEmpleados();
};