
export const tableTareaTemplate = (tareas) => {
    if (!tareas || tareas.length === 0) {
        return `
            <tr>
                <td colspan="7" class="text-center py-4 text-muted">
                    <i class="fas fa-inbox fa-2x mb-2 d-block text-gray-300"></i>
                    No se encontraron tareas registradas
                </td>
            </tr>
        `;
    }

    return tareas
        .map(
            (tarea, index) => `
                <tr>
                    <td class="ps-4 fw-bold text-muted">
                        ${index + 1}
                    </td>

                    <td class="fw-bold text-dark">
                        ${tarea.titulo}
                    </td>

                    <td class="text-muted small">
                        ${
                            tarea.descripcion ||
                            '<em class="text-black-50">Sin descripción</em>'
                        }
                    </td>

                    <td>
                        <small class="text-muted">
                            ${tarea.created_at || "-"}
                        </small>
                    </td>

                    <td>
                        <small class="text-muted">
                            ${tarea.expired_at || "Sin fecha"}
                        </small>
                    </td>

                    <td>
                        <span
                            class="badge rounded-pill px-2 py-1"
                            style="background-color: ${
                                tarea.color || "#6c757d"
                            }"
                        >
                            ${tarea.tipoEstado || "Pendiente"}
                        </span>
                    </td>

                    <td class="text-center pe-4">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary me-1 btn-editar-tarea"
                            data-id="${tarea.id_tarea}"
                            title="Editar Tarea"
                        >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger btn-eliminar-tarea"
                            data-id="${tarea.id_tarea}"
                            title="Eliminar Tarea"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `,
        )
        .join("");
};

