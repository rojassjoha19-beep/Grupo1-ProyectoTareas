

/**
 * Notificación rápida estilo Toastr (no interactiva, desaparece sola)
 * @param {string} message
 * @param {'success'|'error'|'info'|'warning'} type
 */
export const showToast = (message, type = "success") => {
  if (typeof toastr !== "undefined") {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-right",
      timeOut: "3000",
    };
    toastr[type](message);
  } else {
    console.warn("Toastr no está cargado.");
  }
};

/**
 * Alerta modal/importante estilo SweetAlert2
 * @param {string} title
 * @param {string} text
 * @param {'success'|'error'|'warning'|'info'} icon
 */
export const showAlert = (title, text, icon = "info") => {
  if (typeof Swal !== "undefined") {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  } else {
    alert(`${title}: ${text}`);
  }
};

/**
 * Modal de confirmación para acciones destructivas (Ej: Borrar tarea)
 */
export const showConfirm = async (title, text) => {
  if (typeof Swal !== "undefined") {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });
    return result.isConfirmed;
  }
  return confirm(text);
};
