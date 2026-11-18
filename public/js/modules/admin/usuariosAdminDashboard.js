
import { renderDashboardLayout } from "../../layout/dashboardLayout.js";
import { usuariosAdminDashboardTemplate } from "../../templates/admin/usuariosAdminDashboardTemplate.js";
import { equiposService } from "../../services/equiposService.js";

export const renderUsuariosAdminDashBoard = async (container) => {

    // Renderizar dashboard
    const cargado = await renderDashboardLayout(
        container,
        usuariosAdminDashboardTemplate()
    );

    if (!cargado) return;

    const tablaBody = container.querySelector("#tablaUsuariosBody");
    const filtroRol = container.querySelector("#filtroRol");
    const filtroEquipo = container.querySelector("#filtroEquipo");

    if (!tablaBody) {
        console.error("No se encontró tablaUsuariosBody");
        return;
    }

    // Verificar permisos
    const usuario = typeof cargado === "object" ? cargado : null;

    if (usuario && !usuario.permisos?.includes("usuarios.ver")) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-danger">
                    No tenés permiso para ver usuarios.
                </td>
            </tr>
        `;
        return;
    }

    const puedeEditar = usuario?.permisos?.includes("usuarios.editar") ?? false;

    try {
        // Obtener usuarios (con equipos y tareas activas)
        const response = await equiposService.listarUsuariosAdmin();

        console.log("Respuesta usuarios ADMIN:", response);

        if (
            !Array.isArray(response?.usuarios) ||
            response.ok === false ||
            response.success === false
        ) {
            throw new Error("No se pudieron obtener los usuarios");
        }

        const usuarios = response.usuarios;

        // Obtener rol
        const obtenerRol = (u) => {
            const rol = String(
                u.rol_id ?? u.rol_nombre ?? u.rol ?? ""
            ).toUpperCase();

            if (rol === "1" || rol === "ADMIN") return "ADMIN";

            if (
                rol === "2" ||
                rol === "LEADER" ||
                rol === "LIDER" ||
                rol === "LÍDER"
            ) return "LEADER";

            if (
                rol === "3" ||
                rol === "USER" ||
                rol === "USUARIO"
            ) return "USER";

            return rol || "Sin rol";
        };

        const nombreRol = (rol) => ({
            ADMIN: "Administrador",
            LEADER: "Líder",
            USER: "Miembro"
        }[rol] ?? rol);

        // Equipos que vienen del back (id -> nombre)
        const listaEquipos = response.equipos ?? [];
        const nombreEquipoPorId = Object.fromEntries(
            listaEquipos.map(e => [String(e.id), e.nombre])
        );

        // "4,5,6" -> ["4","5","6"]
        const idsEquipos = (u) =>
            u.equipos_ids ? String(u.equipos_ids).split(",") : [];

        // Texto de la columna Equipo
        const obtenerEquipo = (u) =>
            idsEquipos(u)
                .map(id => nombreEquipoPorId[id])
                .filter(Boolean)
                .join(", ");

        // Actualizar estadísticas
        const actualizarEstadisticas = () => {

            container.querySelector("#totalUsuarios").textContent =
                usuarios.filter(u => obtenerRol(u) !== "ADMIN").length;

            container.querySelector("#totalLideres").textContent =
                usuarios.filter(u => obtenerRol(u) === "LEADER").length;

            container.querySelector("#totalMiembros").textContent =
                usuarios.filter(u => obtenerRol(u) === "USER").length;

            container.querySelector("#totalSinAsignar").textContent =
                usuarios.filter(u =>
                    obtenerRol(u) !== "ADMIN" && Number(u.total_equipos) === 0
                ).length;
        };

        // Cargar filtro de equipos
        listaEquipos.forEach(e => {
            const option = document.createElement("option");
            option.value = e.id;
            option.textContent = e.nombre;
            filtroEquipo.appendChild(option);
        });

        // Cambiar rol de usuario
        const cambiarRolUsuario = async (usuarioSeleccionado) => {

            if (!puedeEditar) return;

            const rolActual = obtenerRol(usuarioSeleccionado);

            // No modificar administradores
            if (rolActual === "ADMIN") return;

            // Alternar entre líder y miembro
            const nuevoRol = rolActual === "LEADER" ? 3 : 2;
            const nombreNuevoRol = nuevoRol === 2 ? "Líder" : "Miembro";

            const confirmar = confirm(
                `¿Querés cambiar el rol de ${usuarioSeleccionado.nombre} a ${nombreNuevoRol}?`
            );

            if (!confirmar) return;

            try {
                const respuesta = await equiposService.cambiarRol(
                    usuarioSeleccionado.id,
                    nuevoRol
                );

                if (!(respuesta.ok || respuesta.success)) {
                    throw new Error(
                        respuesta.mensaje || "No se pudo cambiar el rol"
                    );
                }

                // Actualizar datos locales
                usuarioSeleccionado.rol_id = nuevoRol;
                usuarioSeleccionado.rol_nombre = nombreNuevoRol;
                usuarioSeleccionado.rol = nombreNuevoRol;

                // Actualizar interfaz
                actualizarEstadisticas();
                aplicarFiltros();

                alert("Rol actualizado correctamente.");

            } catch (error) {
                console.error("Error al cambiar rol:", error);

                alert(
                    error.message || "Error al actualizar el rol."
                );
            }
        };

        // Mostrar usuarios
        const mostrarUsuarios = (lista) => {

            tablaBody.innerHTML = "";

            if (lista.length === 0) {
                tablaBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-4">
                            No se encontraron usuarios.
                        </td>
                    </tr>
                `;
                return;
            }

            lista.forEach(u => {

                const fila = document.createElement("tr");

                const datos = [
                    u.id ?? "—",
                    u.nombre ?? "—",
                    nombreRol(obtenerRol(u)),
                    obtenerEquipo(u) || "Sin asignar",
                    u.tareas_activas ?? "—"
                ];

                datos.forEach(dato => {
                    const celda = document.createElement("td");
                    celda.textContent = dato;
                    fila.appendChild(celda);
                });

                // Columna de acciones
                const acciones = document.createElement("td");
                acciones.className = "text-center pe-4";

                const rolActual = obtenerRol(u);

                if (
                    puedeEditar &&
                    (rolActual === "LEADER" || rolActual === "USER")
                ) {
                    const boton = document.createElement("button");

                    boton.type = "button";
                    boton.className =
                        "btn btn-secondary-custom btn-sm";

                    boton.innerHTML = `
                        <i class="bi bi-pencil-square me-1"></i>
                        Cambiar rol
                    `;

                    boton.addEventListener("click", () => {
                        cambiarRolUsuario(u);
                    });

                    acciones.appendChild(boton);

                } else {
                    acciones.textContent = "—";
                }

                fila.appendChild(acciones);
                tablaBody.appendChild(fila);
            });
        };

        // Aplicar filtros
        const aplicarFiltros = () => {

            const rol = filtroRol.value;
            const equipo = filtroEquipo.value;

            const filtrados = usuarios.filter(u => {

                const coincideRol =
                    !rol || obtenerRol(u) === rol;

                const coincideEquipo =
                    !equipo || idsEquipos(u).includes(equipo);

                return coincideRol && coincideEquipo;
            });

            mostrarUsuarios(filtrados);
        };

        // Inicializar
        actualizarEstadisticas();
        mostrarUsuarios(usuarios);

        // Eventos de filtros
        filtroRol.addEventListener("change", aplicarFiltros);
        filtroEquipo.addEventListener("change", aplicarFiltros);

    } catch (error) {
        console.error("Error al cargar usuarios:", error);

        tablaBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-danger">
                    Error al cargar los usuarios.
                </td>
            </tr>
        `;
    }
};