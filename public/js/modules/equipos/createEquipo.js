import { equiposService } from "../../services/equiposService.js";
import { createEquipoTemplate } from "../../templates/equipos/createEquipoTemplate.js";

const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

let abriendo = false;

export function initCreateEquipo(usuario) {
    const permisos = Array.isArray(usuario.permisos) ? usuario.permisos : [];

    if (!permisos.includes("equipos.crear")) return;

    const btnNuevaTarea = document.querySelector("#btnNuevaTarea");
    if (!btnNuevaTarea) return;

    const btnNuevoEquipo = document.createElement("button");
    btnNuevoEquipo.id = "btnNuevoEquipo";
    btnNuevoEquipo.type = "button";
    btnNuevoEquipo.className = "btn btn-outline-secondary";
    btnNuevoEquipo.innerHTML = '<i class="bi bi-people me-1"></i>Nuevo equipo';

    const grupo = document.createElement("div");
    grupo.className = "d-flex gap-2";
    btnNuevaTarea.replaceWith(grupo);
    grupo.append(btnNuevoEquipo, btnNuevaTarea);

    btnNuevoEquipo.addEventListener("click", () => abrirFormulario(usuario));
}

async function abrirFormulario(usuario) {
    if (abriendo || document.querySelector("#vistaEquipo")) return;

    const content = document.querySelector("#content");
    const vistaTareas = content?.querySelector(".dashboard-container");
    if (!content || !vistaTareas) return;

    abriendo = true;

    try {
        const usuarios = await obtenerUsuarios(usuario);

        const vistaEquipo = document.createElement("div");
        vistaEquipo.id = "vistaEquipo";
        vistaEquipo.innerHTML = createEquipoTemplate({ usuario, usuarios });

        vistaTareas.classList.add("d-none");
        content.append(vistaEquipo);

        const cerrar = () => {
            vistaEquipo.remove();
            vistaTareas.classList.remove("d-none");
        };

        iniciarBuscador(vistaEquipo);
        iniciarChips(vistaEquipo);
        iniciarEnvio(vistaEquipo, cerrar);

        vistaEquipo
            .querySelector("#btnCancelarEquipo")
            .addEventListener("click", cerrar);
    } finally {
        abriendo = false;
    }
}

async function obtenerUsuarios(usuario) {
    try {
        const respuesta = await equiposService.listarUsuarios();

        if (!respuesta.ok) return [];

        return respuesta.usuarios.filter((u) => String(u.id) !== String(usuario.id));
    } catch (error) {
        console.error("No se pudo traer la lista de usuarios:", error);
        return [];
    }
}

function iniciarBuscador(container) {
    const buscador = container.querySelector("#buscarUsuario");
    const items = container.querySelectorAll("#listaUsuarios li[data-nombre]");

    buscador.addEventListener("input", () => {
        const texto = normalizar(buscador.value.trim());

        items.forEach((li) => {
            const coincide = normalizar(li.dataset.nombre).includes(texto);
            li.classList.toggle("d-none", !coincide);
        });
    });
}

function iniciarChips(container) {
    const checks = container.querySelectorAll('input[name="integrantes"]');
    const chips = container.querySelector("#chipsSeleccionados");
    const contador = container.querySelector("#contadorSeleccionados");

    const actualizar = () => {
        const marcados = [...checks].filter((check) => check.checked);

        contador.textContent = marcados.length;
        chips.innerHTML = "";

        marcados.forEach((check) => {
            const chip = document.createElement("span");
            chip.className = "badge rounded-pill text-nowrap";
            chip.textContent = check.dataset.nombre;
            chips.appendChild(chip);
        });
    };

    checks.forEach((check) => check.addEventListener("change", actualizar));
}

function iniciarEnvio(container, alTerminar) {
    const form = container.querySelector("#formCreateEquipo");
    const boton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = new FormData(form);
        const nombre = (datos.get("nombre") ?? "").trim();
        const integrantes = datos.getAll("integrantes");

        if (!nombre) {
            alert("Ingresá un nombre para el equipo.");
            return;
        }

        if (nombre.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
            return;
        }

        boton.disabled = true;

        try {
            const respuesta = await equiposService.crearEquipo({ nombre });

            if (!respuesta.ok || !respuesta.id) {
                alert(respuesta.mensaje || "No se pudo crear el equipo.");
                return;
            }

            const noAgregados = [];

            for (const idUsuario of integrantes) {
                try {
                    const resultado = await equiposService.agregarMiembro(respuesta.id, idUsuario);
                    if (!resultado.ok) noAgregados.push(idUsuario);
                } catch (error) {
                    noAgregados.push(idUsuario);
                }
            }

            if (noAgregados.length === 0) {
                alert("Equipo creado correctamente.");
            } else {
                const nombres = noAgregados.map((id) =>
                    container.querySelector(`#integrante-${id}`)?.dataset.nombre ?? id
                );
                alert(`El equipo se creó, pero no se pudo agregar a: ${nombres.join(", ")}.`);
            }

            alTerminar();
        } catch (error) {
            console.error("Error al crear el equipo:", error);
            alert(error.message || "No se pudo crear el equipo.");
        } finally {
            boton.disabled = false;
        }
    });
}