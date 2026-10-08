
export const editTareaTemplate = () => {
    return `
        <div class="modal fade" id="modalTarea" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="modalTareaTitulo">
                            <i class="bi bi-pencil-square me-2"></i>
                            Editar Tarea
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                        ></button>
                    </div>

                    <form id="formTarea">

                        <input
                            type="hidden"
                            id="id_tarea"
                            name="id_tarea"
                        >

                        <div class="modal-body">

                            <div class="mb-3">
                                <label
                                    for="tareaTitulo"
                                    class="form-label fw-semibold"
                                >
                                    Título
                                </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="tareaTitulo"
                                    name="titulo"
                                    placeholder="Ingrese el título de la tarea"
                                    maxlength="150"
                                    required
                                >
                            </div>

                            <div class="mb-3">
                                <label
                                    for="tareaDescripcion"
                                    class="form-label fw-semibold"
                                >
                                    Descripción
                                </label>

                                <textarea
                                    class="form-control"
                                    id="tareaDescripcion"
                                    name="descripcion"
                                    rows="4"
                                    placeholder="Ingrese una descripción"
                                ></textarea>
                            </div>

                            <div class="mb-3">
                                <label
                                    for="tareaExpiredAt"
                                    class="form-label fw-semibold"
                                >
                                    Fecha de vencimiento
                                </label>

                                <input
                                    type="date"
                                    class="form-control"
                                    id="tareaExpiredAt"
                                    name="expired_at"
                                >
                            </div>

                            <div class="mb-3">
                                <label
                                    for="tareaIdEstado"
                                    class="form-label fw-semibold"
                                >
                                    Estado
                                </label>

                                <select
                                    class="form-select"
                                    id="tareaIdEstado"
                                    name="id_estado"
                                    required
                                >
                                    <option value="">
                                        Seleccione un estado
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div class="modal-footer">

                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                class="btn btn-primary"
                            >
                                <i class="bi bi-check-circle me-1"></i>
                                Guardar cambios
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    `;
};

