
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";
import { editTareaTemplate } from "../../templates/tareas/editTareaTemplate.js";

export const prepareEditTarea = async (id) => {
    const components =
        document.getElementById("dashboardComponents");

    if (!components) return;

    components.innerHTML = editTareaTemplate();

    const modalEl =
        document.getElementById("modalTarea");

    const selectEstado =
        document.getElementById("tareaIdEstado");

    if (!modalEl || !selectEstado) return;

    const modalInstance =
        bootstrap.Modal.getOrCreateInstance(modalEl);

    try {
        const estadosResponse =
            await tareaService.getEstados();

        if (
            !estadosResponse.ok ||
            !estadosResponse.estados
        ) {
            throw new Error(
                "No se pudieron obtener los estados."
            );
        }

        selectEstado.innerHTML = `
            <option value="">
                Seleccione un estado
            </option>

            ${estadosResponse.estados
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

        const response =
            await tareaService.getById(id);

        if (!response.ok || !response.tarea) {
            throw new Error(
                "No se pudo obtener la tarea."
            );
        }

        const tarea = response.tarea;

        document.getElementById("id_tarea").value =
            tarea.id;

        document.getElementById("tareaTitulo").value =
            tarea.titulo || "";

        document.getElementById("tareaDescripcion").value =
            tarea.descripcion || "";

        document.getElementById("tareaExpiredAt").value =
            tarea.expired_at
                ? tarea.expired_at.substring(0, 10)
                : "";

        document.getElementById("tareaIdEstado").value =
            tarea.fk_id_estado;

        // Ahora que el formulario existe,
        // conectamos el submit.
        initSubmitUpdateTarea();

        modalInstance.show();

    } catch (error) {
        console.error(
            "Error al cargar datos para editar:",
            error
        );
    }
};

export const initUpdateTarea = () => {
    const tablaBody =
        document.getElementById("tablaTareasBody");

    if (!tablaBody) return;

    tablaBody.addEventListener(
        "click",
        async (e) => {

            const btnEditar =
                e.target.closest(".btn-editar-tarea");

            if (!btnEditar) return;

            const id =
                btnEditar.dataset.id;

            if (!id) return;

            await prepareEditTarea(id);
        },
    );
};

export const initSubmitUpdateTarea = () => {
    const formTarea =
        document.getElementById("formTarea");

    if (!formTarea) return;

    const modalEl =
        document.getElementById("modalTarea");

    if (!modalEl) return;

    const modalInstance =
        bootstrap.Modal.getOrCreateInstance(
            modalEl
        );

    formTarea.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();

            const idTarea =
                document.getElementById("id_tarea").value;

            if (!idTarea) return;

            const formData =
                new FormData(formTarea);

            const data =
                Object.fromEntries(
                    formData.entries()
                );

            // El ID viaja por la URL.
            // No lo enviamos dentro del JSON.
            delete data.id_tarea;

            try {
                const response =
                    await tareaService.update(
                        idTarea,
                        data
                    );

                if (!response.ok) {
                    throw new Error(
                        response.mensaje ||
                        "No se pudo actualizar la tarea."
                    );
                }

                modalInstance.hide();

                formTarea.reset();

                document.getElementById(
                    "id_tarea"
                ).value = "";

                const selectFiltro =
                    document.getElementById(
                        "selectFiltroEstado"
                    );

                await getTareas(
                    selectFiltro
                        ? Number(selectFiltro.value)
                        : 0
                );

            } catch (error) {
                console.error(
                    "Error al actualizar tarea:",
                    error
                );
            }
        },
    );
};
