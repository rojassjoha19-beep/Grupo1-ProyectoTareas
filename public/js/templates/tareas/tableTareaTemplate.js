
// Convierte fechas de MySQL (YYYY-MM-DD o YYYY-MM-DD HH:mm:ss)
// a formato argentino para mostrarlas en la interfaz.
const formatearFecha = (valor, incluirHora = false) => {
    if (!valor) return "";

    const coincidencia = String(valor).trim().match(
        /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::\d{2})?)?$/
    );

    // Si llega un formato inesperado, conservamos el valor original.
    if (!coincidencia) return String(valor);

    const [, anio, mes, dia, hora, minutos] = coincidencia;
    const fecha = `${dia}/${mes}/${anio}`;

    if (incluirHora && hora && minutos) {
        return `${fecha} ${hora}:${minutos}`;
    }

    return fecha;
};


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
                            ${formatearFecha(tarea.created_at, true) || "-"}
                        </small>
                    </td>

                    <td>
                        <small class="text-muted">
                            ${formatearFecha(tarea.expired_at) || "Sin fecha"}
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
