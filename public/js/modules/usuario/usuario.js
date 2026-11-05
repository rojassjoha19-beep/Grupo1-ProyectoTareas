import { usuarioDashboardTemple } from "../../templates/usuario/usuarioDashboardTemple.js"

export const renderUsuarioDashboard = ( container) => {
    return container.innerHTML = usuarioDashboardTemple();
}