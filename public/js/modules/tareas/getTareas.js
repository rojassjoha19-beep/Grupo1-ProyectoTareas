import { tareaService } from "../../services/tareaService.js";
import { tableTareaTemplate } from "../../templates/tareas/tableTareaTemplate.js";

// Llena las tarjetas del dashboard del líder (si existen en la pantalla)
const actualizarContadoresEquipo = (tareas) => {
    const cuenta = (tipo) =>
        tareas.filter(t => t.tipoEstado === tipo).length;

    const poner = (id, valor) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    };

    poner("totalTareasEquipo", tareas.length);
    poner("totalToDoEquipo", cuenta("ToDo"));
    poner("totalEnCursoEquipo", cuenta("Doing"));
    poner("totalVencidasEquipo", cuenta("Expired"));
};

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

        const tareas = response.tareas || [];

        tablaBody.innerHTML = tableTareaTemplate(tareas);

        // Solo con la lista completa (sin filtros), para que las tarjetas no cambien al filtrar
        if (!idEstado && !fechaVencimiento) {
            actualizarContadoresEquipo(tareas);
        }
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