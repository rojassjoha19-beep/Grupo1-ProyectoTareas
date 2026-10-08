export const createTareaTemplate = () => {
  return `
        <div class="modal fade" id="modalNuevaTarea" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-plus-circle me-2"></i>
                            Nueva Tarea
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                        ></button>
                    </div>

                    <form id="formNuevaTarea">

                        <div class="modal-body">

                            <div class="mb-3">
                                <label
                                    for="tituloTarea"
                                    class="form-label fw-semibold"
                                >
                                    Título
                                </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="tituloTarea"
                                    name="titulo"
                                    placeholder="Ingrese el título de la tarea"
                                    required
                                    maxlength="150"
                                >
                            </div>

                            <div class="mb-3">
                                <label
                                    for="descripcionTarea"
                                    class="form-label fw-semibold"
                                >
                                    Descripción
                                </label>

                                <textarea
                                    class="form-control"
                                    id="descripcionTarea"
                                    name="descripcion"
                                    rows="4"
                                    placeholder="Ingrese una descripción"
                                ></textarea>
                            </div>

                            <div class="mb-3">
                                <label
                                    for="fechaVencimientoTarea"
                                    class="form-label fw-semibold"
                                >
                                    Fecha de vencimiento
                                </label>

                                <input
                                    type="date"
                                    class="form-control"
                                    id="fechaVencimientoTarea"
                                    name="expired_at"
                                >
                            </div>

                            <div class="mb-3">
                                <label
                                    for="estadoTarea"
                                    class="form-label fw-semibold"
                                >
                                    Estado
                                </label>

                                <select
                                    class="form-select"
                                    id="estadoTarea"
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
                                Crear tarea
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    `;
};
