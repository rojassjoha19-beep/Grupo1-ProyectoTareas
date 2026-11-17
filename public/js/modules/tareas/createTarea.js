
import { tareaService } from "../../services/tareaService.js";
import { getTareas } from "./getTareas.js";
import { createTareaTemplate } from "../../templates/tareas/createTareaTemplate.js";

// Revisa la fecha de vencimiento. Si es anterior a hoy, muestra un mensaje debajo del campo
const fechaValida = (input) => {
    let valida = true;

     // Solo se compara si la persona eligió una fecha
    if (input.value) {
        const [anio, mes, dia] = input.value.split("-").map(Number);
        const fecha = new Date(anio, mes - 1, dia);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        valida = fecha >= hoy;
    }
    
    // Se crea el cartel de error si todavía no existe (no hace falta tocar el template)
    let aviso = input.parentElement.querySelector(".invalid-feedback");
    if (!aviso) {
        aviso = document.createElement("div");
        aviso.className = "invalid-feedback";
        input.after(aviso);
    }
    
    // Bootstrap pinta el campo y el texto en rojo cuando tiene la clase "is-invalid"
    aviso.textContent = valida ? "" : "La fecha de vencimiento no puede ser anterior a hoy.";
    input.classList.toggle("is-invalid", !valida);

    return valida;
};

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

        // Ya no se exige el selector de estado: se sacó del formulario
        if (!modalEl || !formTarea) return;

        try {
            // Obtener estados desde el backend
            const response = await tareaService.getEstados();
        // "selectEstado &&" evita un error si el selector no existe en el formulario
        if (selectEstado && response.ok && response.estados)  {
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


            // Campo de fecha: cuando la persona lo cambia, se saca el cartel de error
            const inputFecha = formTarea.querySelector('input[type="date"]');
            inputFecha?.addEventListener("input", () => inputFecha.classList.remove("is-invalid"));

            formTarea.addEventListener("submit", async (e) => {
                e.preventDefault();

                // Si la fecha está mal, se muestra el cartel y no se envía la tarea
                if (inputFecha && !fechaValida(inputFecha)) return;

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

