import { equiposService } from "../../services/equiposService.js";
import { renderDashboard } from "../dashboard.js";
import { authService } from "../../services/authService.js";
import { createEquipoTemplate } from "../../templates/equipos/createEquipoTemplate.js";


// Saca mayúsculas y acentos para que al buscar "sofia" aparezca "Sofía"
const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Primero arma el dashboard (menú, barra de arriba y sesión) y después
// cambia el contenido de tareas por el formulario de crear equipo
export async function renderCreateEquipo(container) {
    await renderDashboard(container);

    const content = container.querySelector("#content");
    if (!content) return;

    // La persona que inició sesión viene de la sesión real
    const respuesta = await authService.checkSession();
    const usuario = respuesta.user;
    if (!usuario) return;

    // Mirá la consola para ver qué campos trae el usuario (id, nombre, etc.). Borrar después
    console.log("Usuario de la sesión:", usuario);

     const usuarios = await obtenerUsuarios(usuario);

    // Quien crea el equipo queda como líder, por eso el select solo lo muestra a esa persona
   
   content.innerHTML = createEquipoTemplate({ usuario, usuarios });
    iniciarBuscador(content);
    iniciarChips(content);
    iniciarEnvio(content);
}
// Trae la lista de usuarios del backend y saca a quien inició sesión (ya es el líder).
// Si falla, por ejemplo por falta de permisos, la lista queda vacía
async function obtenerUsuarios(usuario) {
    try {
        const respuesta = await equiposService.listarUsuarios();

        // Mirá la consola para ver qué campos trae cada usuario. Borrar después
        console.log("Usuarios del backend:", respuesta.usuarios);

        if (!respuesta.ok) return [];

        return respuesta.usuarios.filter((u) => String(u.id) !== String(usuario.id));
    } catch (error) {
        console.error("No se pudo traer la lista de usuarios:", error);
        return [];
    }
}

// Mientras se escribe, oculta a las personas que no coinciden con la búsqueda
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

// Cada vez que se marca o desmarca a alguien, actualiza el contador
// y vuelve a armar las etiquetas de "Seleccionados"
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
            chip.className = "badge rounded-pill";
            chip.textContent = check.dataset.nombre;
            chips.appendChild(chip);
        });
    };

    checks.forEach((check) => check.addEventListener("change", actualizar));
}

// Al crear el equipo hace dos cosas, en este orden:
// 1) crea el equipo y recibe su id
// 2) agrega a cada integrante usando su id
function iniciarEnvio(container) {
    const form = container.querySelector("#formCreateEquipo");
    const boton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = new FormData(form);
        const nombre = datos.get("nombre").trim();
        const descripcion = datos.get("descripcion").trim();
        const integrantes = datos.getAll("integrantes");

        if (!nombre) {
            alert("Ingresá un nombre para el equipo.");
            return;
        }

        if (nombre.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
            return;
        }

        // Se bloquea el botón para que no se mande dos veces
        boton.disabled = true;

        try {
            const respuesta = await equiposService.crearEquipo({ nombre, descripcion });

            if (!respuesta.ok) {
                alert(respuesta.mensaje || "No se pudo crear el equipo.");
                return;
            }

            // Se agregan los integrantes de a uno. Si alguno falla, se anota su nombre
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

            limpiarFormulario(container, form);
        } catch (error) {
            console.error("Error al crear el equipo:", error);
            alert(error.message || "No se pudo crear el equipo.");
        } finally {
            boton.disabled = false;
        }
    });
}

// Deja el formulario vacío para poder crear otro equipo
function limpiarFormulario(container, form) {
    form.reset();
    container.querySelector("#chipsSeleccionados").innerHTML = "";
    container.querySelector("#contadorSeleccionados").textContent = "0";
    container.querySelector("#buscarUsuario").dispatchEvent(new Event("input"));
}
