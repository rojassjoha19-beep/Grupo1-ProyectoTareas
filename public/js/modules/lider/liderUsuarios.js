import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderUsuariosTemplate } from "../../templates/lider/liderUsuariosTemplate.js";

export const renderLiderUsuarios = async (container) => {
    const usuario = await renderDashboardLayout(
        container,
        liderUsuariosTemplate()
    );

    if (!usuario) return;

    if (!usuario.permisos?.includes("usuarios.ver")) {
        container.querySelector("#tablaUsuariosBody").innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4">
                    No tenés permiso para ver usuarios.
                </td>
            </tr>
        `;
        return;
    }

    // Acá conectaremos el servicio que obtiene los usuarios.
};