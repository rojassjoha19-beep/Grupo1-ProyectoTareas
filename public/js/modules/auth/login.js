
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

            if (response.success) {
                const session = await authService.checkSession();

                if (!session.success || !session.user) {
                    toastr.error("No se pudo obtener la sesión");
                    return;
                }

                const rolId = Number(session.user.rol_id);

                const rutasDashboard = {
                    1: "/dashboard/admin",
                    2: "/dashboard/lider",
                    3: "/dashboard/usuario"
                };

                const ruta = rutasDashboard[rolId];

                if (!ruta) {
                    toastr.error("El usuario no tiene un rol válido");
                    return;
                }

                toastr.success("Sesión iniciada correctamente");

                router.navigateTo(ruta);

            } else {
                toastr.error(response.message || "Credenciales inválidas");
            }

        } catch (error) {
            console.error("Error en el login:", error);
            toastr.error(error.message || "Error al conectar con el servidor");
        }
    });
};
