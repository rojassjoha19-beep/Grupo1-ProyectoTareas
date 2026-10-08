
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";

export const initFilterTarea = async () => {
    const selectFiltro =
        document.getElementById("selectFiltroEstado");

    if (!selectFiltro) return;

    try {
        const response = await tareaService.getEstados();

        if (!response.ok || !response.estados) {
            throw new Error(
                "No se pudieron obtener los estados.",
            );
        }

        selectFiltro.innerHTML = `
            <option value="0">
                Todos los estados
            </option>

            ${response.estados
                .map(
                    (estado) => `
                        <option
                            value="${estado.id_estado}"
                            style="
                                color: ${estado.color};
                                font-weight: 600;
                            "
                        >
                            ${estado.tipoEstado}
                        </option>
                    `,
                )
                .join("")}
        `;

        selectFiltro.addEventListener("change", async (e) => {
            await getTareas(Number(e.target.value));
        });
    } catch (error) {
        console.error(
            "Error al cargar el filtro de estados:",
            error,
        );
    }
};

