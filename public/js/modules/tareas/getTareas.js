
import { tareaService } from "../../services/tareaService.js";
import { tableTareaTemplate } from "../../templates/tareas/tableTareaTemplate.js";

export const getTareas = async (idEstado = 0) => {
    const tablaBody = document.getElementById("tablaTareasBody");

    if (!tablaBody) return;

    try {
      const response = await tareaService.getAll(idEstado);
      
      console.log("ID ESTADO:", idEstado);
      console.log("RESPUESTA TAREAS:", response);


        if (!response.ok) {
            throw new Error("No se pudieron obtener las tareas.");
        }

        tablaBody.innerHTML = tableTareaTemplate(
            response.tareas || [],
        );
    } catch (error) {
        console.error("Error al obtener tareas:", error);

        tablaBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4 text-danger">
                    Error al cargar las tareas.
                </td>
            </tr>
        `;
    }
};

