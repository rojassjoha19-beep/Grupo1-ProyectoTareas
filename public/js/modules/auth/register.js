import { registerTemplate } from "../../templates/authTemplates.js";
import { initPasswordToggle } from "../../ui/togglePassword.js";
import { authService } from "../../services/authService.js";
import { router } from "../../router.js";

export const renderRegister = (container) => {
  container.innerHTML = registerTemplate();

  const form = container.querySelector("#formRegister");
  initPasswordToggle(form);

  setupRegisterForm(form);
};

const setupRegisterForm = (form) => {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.password2) {
      toastr.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await authService.register(data);
      if (response.success) {
        toastr.success("Cuenta creada exitosamente");
        router.navigateTo("/login");
      } else {
        toastr.error(response.message || "Error al registrar el usuario");
      }
    } catch (error) {
      toastr.error("Error al conectar con el servidor");
    }
  });
};
