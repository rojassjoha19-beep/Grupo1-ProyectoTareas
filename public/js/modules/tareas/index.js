import { getTareas } from "./getTareas.js";
import { initFilterTarea } from "./filterTareas.js";
import { initCreateTarea } from "./createTarea.js";
import { initUpdateTarea, prepareEditTarea } from "./updateTarea.js";
import { deleteTarea } from "./deleteTarea.js";

export const initTareaModule = () => {
  const tablaBody = document.getElementById("tablaTareasBody");
  if (!tablaBody) return; // Si la vista actual no tiene la tabla, no arranca nada

  // Carga inicial
  getTareas();

  // Inicializar escuchadores de eventos
  initFilterTarea();
  initCreateTarea();
  initUpdateTarea();

  // Eventos delegados de la tabla (Editar / Eliminar)
  tablaBody.addEventListener("click", (e) => {
    const btnEdit = e.target.closest(".btn-editar-tarea");
    const btnDelete = e.target.closest(".btn-eliminar-tarea");

    if (btnEdit) prepareEditTarea(btnEdit.dataset.id);
    if (btnDelete) deleteTarea(btnDelete.dataset.id);
  });
};
