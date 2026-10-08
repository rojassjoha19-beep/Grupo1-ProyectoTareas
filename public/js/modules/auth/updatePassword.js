import { updatePasswordTemplate } from "../../templates/authTemplates.js";
import { initPasswordToggle } from "../../ui/togglePassword.js";
import { authService } from "../../services/authService.js";
import { router } from "../../router.js";

export const renderUpdatePassword = (container) => {
  container.innerHTML = updatePasswordTemplate();

  const form = container.querySelector("#formUpdatePassword");
  initPasswordToggle(form);

  setupUpdatePasswordForm(form);
};

const setupUpdatePasswordForm = (form) => {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.pass_nueva !== data.pass_nueva2) {
      toastr.error("Las nuevas contraseñas no coinciden");
      return;
    }

    try {
      const response = await authService.updatePassword(data);
      if (response.success) {
        toastr.success("Contraseña actualizada correctamente");
        router.navigateTo("/login");
      } else {
        toastr.error(response.message || "Error al actualizar la contraseña");
      }
    } catch (error) {
      toastr.error("Error de comunicación con el servidor");
    }
  });
};
