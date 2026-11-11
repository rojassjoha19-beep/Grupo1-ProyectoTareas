import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderEquiposTemplate } from "../../templates/lider/liderEquiposTemplate.js";
import { initCreateEquipo } from "../equipos/createEquipo.js";

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
};