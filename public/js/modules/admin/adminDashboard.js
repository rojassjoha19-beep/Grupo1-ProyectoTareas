import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { adminDashboardTemplate } from "../../templates/admin/adminDashboardTemplate.js";
import { equiposService } from "../../services/equiposService.js";

export const renderAdminDashboard = async (container) => {
    const cargado = await renderDashboardLayout(
        container,
        adminDashboardTemplate()
    );

    if (!cargado) return;

    const tablaBody = container.querySelector("#tablaEquiposBody");
    const filtroEquipo = container.querySelector("#filtroEquipo");

    if (!tablaBody) {
        console.error("No se encontró tablaEquiposBody");
        return;
    }

    const filaMensaje = (texto, clase = "") => `
        <tr>
            <td colspan="7" class="text-center py-4 ${clase}">${texto}</td>
        </tr>
    `;

    try {
        const response = await equiposService.listarEquipos();

        if (!Array.isArray(response?.equipos) || response.ok === false) {
            throw new Error("No se pudieron obtener los equipos");
        }

        const equipos = response.equipos;

        const num = (v) => Number(v) || 0;
        const porcentaje = (e) =>
            num(e.tareas) === 0
                ? 0
                : Math.round((num(e.tareas_finalizadas) / num(e.tareas)) * 100);

        // Contadores
        const actualizarContadores = () => {
            const totalTareas = equipos.reduce((a, e) => a + num(e.tareas), 0);
            const totalFinalizadas = equipos.reduce(
                (a, e) => a + num(e.tareas_finalizadas), 0
            );

            container.querySelector("#totalEquipos").textContent = equipos.length;
            container.querySelector("#totalTareas").textContent = totalTareas;
            container.querySelector("#porcentajeCumplimiento").textContent =
                totalTareas === 0
                    ? "0%"
                    : `${Math.round((totalFinalizadas / totalTareas) * 100)}%`;

            // El back todavía no manda tareas vencidas
            container.querySelector("#tareasVencidas").textContent =
                equipos.every(e => Object.hasOwn(e, "tareas_vencidas"))
                    ? equipos.reduce((a, e) => a + num(e.tareas_vencidas), 0)
                    : "—";
        };

        // Filtro de equipos
        equipos.forEach(e => {
            const option = document.createElement("option");
            option.value = e.id;
            option.textContent = e.nombre;
            filtroEquipo.appendChild(option);
        });

        // Tabla
        const mostrarEquipos = (lista) => {
            tablaBody.innerHTML = "";

            if (lista.length === 0) {
                tablaBody.innerHTML = filaMensaje("No hay equipos para mostrar");
                return;
            }

            lista.forEach(e => {
                const fila = document.createElement("tr");

                const datos = [
                    e.id,
                    e.nombre,
                    e.lider_nombre ?? "—",
                    num(e.integrantes),
                    num(e.tareas),
                    `${porcentaje(e)}%`,
                    "—"
                ];

                datos.forEach((dato, i) => {
                    const celda = document.createElement("td");
                    celda.textContent = dato;
                    if (i === 0) celda.className = "ps-4";
                    if (i === 6) celda.className = "text-center pe-4";
                    fila.appendChild(celda);
                });

                tablaBody.appendChild(fila);
            });
        };

        const aplicarFiltro = () => {
            const id = filtroEquipo.value;
            mostrarEquipos(
                id ? equipos.filter(e => String(e.id) === id) : equipos
            );
        };

        actualizarContadores();
        mostrarEquipos(equipos);
        filtroEquipo.addEventListener("change", aplicarFiltro);

    } catch (error) {
        console.error("Error al cargar equipos:", error);
        tablaBody.innerHTML = filaMensaje(
            "Error al cargar los equipos.",
            "text-danger"
        );
    }
};