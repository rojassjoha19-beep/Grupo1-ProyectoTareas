import { resetPasswordTemplate } from "../../templates/authTemplates.js";
import { authService } from "../../services/authService.js";

export const renderResetPassword = (container) => {
  container.innerHTML = resetPasswordTemplate();

  const form = container.querySelector("#formForgotPassword");
  setupResetPasswordForm(form);
};

const setupResetPasswordForm = (form) => {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const { email } = Object.fromEntries(formData.entries());

    try {
      const response = await authService.resetPassword(email);

      if (response.success || response.ok) {
        toastr.success(
          response.message || "Te enviamos las instrucciones a tu correo",
        );
        form.reset();
      } else {
        toastr.error(
          response.message || "Error al solicitar el restablecimiento",
        );
      }
    } catch (error) {
      toastr.error("Error de comunicación con el servidor");
    }
  });
};
