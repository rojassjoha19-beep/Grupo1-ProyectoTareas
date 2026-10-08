
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";

export const deleteTarea = async (id) => {
    if (!confirm("¿Desea eliminar esta tarea?")) {
        return;
    }

    try {
        const response = await tareaService.delete(id);

        if (!response.ok) {
            throw new Error(
                response.mensaje ||
                "No se pudo eliminar la tarea."
            );
        }

        const selectFiltro =
            document.getElementById("selectFiltroEstado");

        await getTareas(
            selectFiltro
                ? Number(selectFiltro.value)
                : 0
        );

    } catch (error) {
        console.error(
            "Error al eliminar tarea:",
            error
        );
    }
};

export const initDeleteTarea = () => {
    const tablaBody =
        document.getElementById("tablaTareasBody");

    if (!tablaBody) return;

    tablaBody.addEventListener(
        "click",
        async (e) => {

            const btnEliminar =
                e.target.closest(".btn-eliminar-tarea");

            if (!btnEliminar) return;

            const id =
                btnEliminar.dataset.id;

            if (!id) return;

            await deleteTarea(id);
        },
    );
};

