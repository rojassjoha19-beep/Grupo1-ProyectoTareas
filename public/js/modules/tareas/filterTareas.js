
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";

export const initFilterTarea = async () => {
    const selectFiltro = document.getElementById("selectFiltroEstado");
    const fechaFiltro = document.getElementById("filtroFechaVencimiento");
    const btnLimpiar = document.getElementById("btnLimpiarFiltros");

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

        const aplicarFiltros = () => {
            return getTareas(
                Number(selectFiltro.value),
                fechaFiltro?.value || ""
            );
        };

        selectFiltro.addEventListener("change", aplicarFiltros);
        fechaFiltro?.addEventListener("change", aplicarFiltros);

        btnLimpiar?.addEventListener("click", () => {
            selectFiltro.value = "0";
            if (fechaFiltro) fechaFiltro.value = "";
            aplicarFiltros();
        });
    } catch (error) {
        console.error(
            "Error al cargar el filtro de estados:",
            error,
        );
    }
};

