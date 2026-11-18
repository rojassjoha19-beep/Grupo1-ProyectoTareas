
import { tareaService } from "../../services/tareaService.js";
import { tableTareaTemplate } from "../../templates/tareas/tableTareaTemplate.js";

export const getTareas = async (idEstado = 0, fechaVencimiento = "") => {
    const tablaBody = document.getElementById("tablaTareasBody");

    if (!tablaBody) return;

    try {
      const response = await tareaService.getAll(idEstado, fechaVencimiento);
      
      console.log("FILTROS - ESTADO:", idEstado, "VENCIMIENTO:", fechaVencimiento);
      console.log("RESPUESTA TAREAS:", response);


        if (!response.ok) {
            throw new Error("No se pudieron obtener las tareas.");
        }

         let tareas = response.tareas || [];

         //Mostrar solo para el lider
        const idEmpleado = document.getElementById("filtroEmpleado")?.value;
        if (idEmpleado) {
            tareas = tareas.filter(
                (t) => String(t.id_asignado) === idEmpleado,
            );
        }

        tablaBody.innerHTML = tableTareaTemplate(tareas);

    } catch (error) {
        console.error("Error al obtener tareas:", error);

        tablaBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4 text-danger">
                    Error al cargar las tareas.
                </td>
            </tr>
        `;
    }
};

