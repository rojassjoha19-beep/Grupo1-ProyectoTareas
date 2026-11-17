import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderEquiposTemplate } from "../../templates/lider/liderEquiposTemplate.js";
import { initCreateEquipo } from "../equipos/createEquipo.js";
import { equiposService } from "../../services/equiposService.js";

const mostrarMensaje = (tbody, texto) => {
    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-4">${texto}</td>
        </tr>`;
};


export const renderLiderEquipos = async (container) => {

    const usuario = await renderDashboardLayout(
        container,
        liderEquiposTemplate()
    );

    if (!usuario) return;

    const permisos = usuario.permisos ?? [];

    if (permisos.includes("equipos.crear")) {
        initCreateEquipo(usuario);
    } else {
        container.querySelector("#btnNuevoEquipo")?.remove();
    }

     const tbody = container.querySelector("#tablaEquiposBody");
    if (!tbody) return;

    try {
        const respuesta = await equiposService.listarEquipos();

        if (!respuesta.ok) {
            mostrarMensaje(tbody, respuesta.mensaje || "No se pudieron cargar los equipos");
            return;
        }

        const equipos = respuesta.equipos ?? [];

        if (equipos.length === 0) {
            mostrarMensaje(tbody, "No hay equipos");
            return;
        }

        tbody.innerHTML = equipos.map((equipo, i) => `
            <tr>
                <td class="ps-4">${i + 1}</td>
                <td>${(equipo.nombre)}</td>
                <td>-</td>
                <td class="text-center pe-4">-</td>
            </tr>`).join("");

    } catch (error) {
        console.error("Error al cargar los equipos:", error);
        mostrarMensaje(tbody, "Error al cargar los equipos");};
};