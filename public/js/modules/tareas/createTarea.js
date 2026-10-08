
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";
import { createTareaTemplate } from "../../templates/tareas/createTareaTemplate.js";

export const initCreateTarea = () => {
    const btnNueva = document.getElementById("btnNuevaTarea");

    if (!btnNueva) return;

    btnNueva.addEventListener("click", async () => {
        const components = document.getElementById("dashboardComponents");

        if (!components) return;

        // Renderizar el componente del modal
        components.innerHTML = createTareaTemplate();

        const modalEl = document.getElementById("modalNuevaTarea");
        const formTarea = document.getElementById("formNuevaTarea");
        const selectEstado = document.getElementById("estadoTarea");

        if (!modalEl || !formTarea || !selectEstado) return;

        try {
            // Obtener estados desde el backend
            const response = await tareaService.getEstados();

      if (response.ok && response.estados) {
        selectEstado.innerHTML = `
        <option value="">
            Seleccione un estado
        </option>

        ${response.estados
          .map(
            (estado) => `
                    <option
                        value="${estado.id_estado}"
                        style="color: ${estado.color};"
                    >
                        ${estado.tipoEstado}
                    </option>
                `,
          )
          .join("")}
    `;
      }

            const modalInstance =
                bootstrap.Modal.getOrCreateInstance(modalEl);

            modalInstance.show();

            formTarea.addEventListener("submit", async (e) => {
                e.preventDefault();

                const formData = new FormData(formTarea);
                const data = Object.fromEntries(formData.entries());

                try {
                    await tareaService.create(data);

                    modalInstance.hide();
                    formTarea.reset();

                    const selectFiltro =
                        document.getElementById("selectFiltroEstado");

                    await getTareas(
                        selectFiltro ? selectFiltro.value : 0,
                    );
                } catch (error) {
                    console.error(
                        "Error al crear tarea:",
                        error,
                    );
                }
            });
        } catch (error) {
            console.error(
                "Error al cargar los estados:",
                error,
            );
        }
    });
};

