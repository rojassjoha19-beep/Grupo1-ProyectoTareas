import { loginTemplate } from "../../templates/auth/authTemplates.js";
import { initPasswordToggle } from "../../ui/togglePassword.js";
import { authService } from "../../services/authService.js";
import { router } from "../../router.js";

export const renderLogin = (container) => {
  container.innerHTML = loginTemplate();

  const form = container.querySelector("#formLogin");
  initPasswordToggle(form);

  setupLoginForm(form);
};

const setupLoginForm = (form) => {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData.entries());

    try {
      const response = await authService.login(credentials);
      console.log("Respuesta del login:", response);

      if (response.success) {

        toastr.success("Sesión iniciada correctamente");

        const session = await authService.checkSession();

        console.log("Sesión del usuario:", session);

        router.navigateTo("/dashboard");

        /* toastr.success("Sesión iniciada correctamente");
        router.navigateTo("/dashboard"); */
        
      } else {
        toastr.error(response.message || "Credenciales inválidas");
      }
    } catch (error) {
      toastr.error(error.message || "Error al conectar con el servidor");
    }
  });
};
