import { authService } from "../../services/authService.js";
// Importo el service 
import { equiposService } from "../../services/equiposService.js";
// Importa el template que dibuja el formulario de crear equipo
import { createEquipoTemplate } from "../../templates/equipos/createEquipoTemplate.js";

// Esta función saca las mayúsculas y los acentos.
const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Evita que el formulario se abra dos veces si se hace clic rápido
let abriendo = false;

// Lo llama el dashboard al cargar.
// Si la persona tiene permiso para crear equipos, agrega el botón "Nuevo equipo"
export async function renderCrearEquipo(container) {
  try {
        const sesion = await authService.checkSession();

        console.log("Respuesta de sesión:", sesion);

    } catch (error) {
        console.error("Error al consultar la sesión:", error);
    }
}
async function abrirFormulario(usuario) {
    if (abriendo || document.querySelector("#vistaEquipo")) return;
    
     // Busca la zona del contenido y la vista de tareas del dashboard
    const content = document.querySelector("#content");
    const vistaTareas = content?.querySelector(".dashboard-container");
    if (!content || !vistaTareas) return;

    abriendo = true;

    try {
        const usuarios = await obtenerUsuarios(usuario);
         // Se arma el formulario con la lista de usuarios y se agrega al contenido

        const vistaEquipo = document.createElement("div");
        vistaEquipo.id = "vistaEquipo";
        vistaEquipo.innerHTML = createEquipoTemplate({ usuario, usuarios });

        vistaTareas.classList.add("d-none");
        content.append(vistaEquipo);
        
        // Esta función cierra el formulario y vuelve a mostrar las tareas
        const cerrar = () => {
            vistaEquipo.remove();
            vistaTareas.classList.remove("d-none");
        };
        // Se activan las partes del formulario como el buscador, las etiquetas y el envío
        iniciarBuscador(vistaEquipo);
        iniciarChips(vistaEquipo);
        iniciarEnvio(vistaEquipo, cerrar);
        // El botón Cancelar también cierra el formulario
        vistaEquipo
            .querySelector("#btnCancelarEquipo")
            .addEventListener("click", cerrar);
    } finally {
        // Esto se ejecuta siempre, aunque haya un error, así se puede volver a intentar
        abriendo = false;
    }
}

// Trae la lista de usuarios del backend y saca a quien inició sesión (ya es el líder).
// Si falla, por ejemplo por falta de permisos, la lista queda vacía
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
// Buscad el usuario y mientras se escribe, escondo a los que no coinciden
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
        // Me quedo solo con los checkboxes que están marcados
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
// 1) crea el equipo y recibe su id
// 2) agrega a cada integrante usando ese id
// Cuando termina, vuelve a mostrar las tareas

function iniciarEnvio(container, alTerminar) {
    const form = container.querySelector("#formCreateEquipo");
    const boton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Se lee completó al usuario
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
       // Bloquea el botón para que no se pueda apretar dos veces
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
             // Avisa cómo salió todo: bien, o a quiénes no se pudo agregar
            if (noAgregados.length === 0) {
                alert("Equipo creado correctamente.");
            } else {
                const nombres = noAgregados.map((id) =>
                    container.querySelector(`#integrante-${id}`)?.dataset.nombre ?? id
                );
                alert(`El equipo se creó, pero no se pudo agregar a: ${nombres.join(", ")}.`);
            }
         // Cierra el formulario
            alTerminar();
        } catch (error) {
            console.error("Error al crear el equipo:", error);
            alert(error.message || "No se pudo crear el equipo.");
        } finally {
            boton.disabled = false;
        }
    });
}