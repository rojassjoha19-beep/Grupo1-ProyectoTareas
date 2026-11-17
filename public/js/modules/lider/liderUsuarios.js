import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { liderUsuariosTemplate } from "../../templates/lider/liderUsuariosTemplate.js";
import { equiposService } from "../../services/equiposService.js";

export const renderLiderUsuarios = async (container) => {

    const usuario = await renderDashboardLayout(
        container,
        liderUsuariosTemplate()
    );

    if (!usuario) return;

    const tablaBody = container.querySelector("#tablaUsuariosBody");
    const buscador = container.querySelector("#buscarUsuario");

    // Verificar permisos
    if (!usuario.permisos?.includes("usuarios.ver")) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4">
                    No tenés permiso para ver usuarios.
                </td>
            </tr>
        `;
        return;
    }

    try {
        // Obtener usuarios del backend
        const response = await equiposService.listarUsuarios();

        console.log("Usuarios:", response);

        if (!response.ok || !Array.isArray(response.usuarios)) {
            throw new Error("No se pudieron obtener los usuarios");
        }

        const usuarios = response.usuarios;

        // Renderizar usuarios
        const mostrarUsuarios = (lista) => {
            tablaBody.innerHTML = "";

            if (lista.length === 0) {
                tablaBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center py-4">
                            No se encontraron usuarios.
                        </td>
                    </tr>
                `;
                return;
            }

            lista.forEach((u) => {
                const fila = document.createElement("tr");

                const datos = [
                    u.id,
                    u.nombre,
                    u.email,
                    u.rol_nombre ?? u.rol_id ?? "Sin rol"
                ];

                datos.forEach((dato) => {
                    const celda = document.createElement("td");
                    celda.textContent = dato ?? "";
                    fila.appendChild(celda);
                });

                tablaBody.appendChild(fila);
            });
        };

        // Mostrar todos los usuarios
        mostrarUsuarios(usuarios);

        // Buscar por nombre o correo
        if (buscador) {
            buscador.addEventListener("input", () => {

                const texto = buscador.value.toLowerCase().trim();

                const filtrados = usuarios.filter((u) =>
                    (u.nombre ?? "").toLowerCase().includes(texto) ||
                    (u.email ?? "").toLowerCase().includes(texto)
                );

                mostrarUsuarios(filtrados);
            });
        }

    } catch (error) {
        console.error("Error al cargar usuarios:", error);

        tablaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4 text-danger">
                    Error al cargar los usuarios.
                </td>
            </tr>
        `;
    }
};