import { renderDashboard } from "../dashboard.js";
import { authService } from "../../services/authService.js";
import { createEquipoTemplate } from "../../templates/equipos/createEquipoTemplate.js";

// Datos de prueba para ver la pantalla sin backend.
// Cuando esté lista la parte de PHP, esto se borra y los datos se piden con un service.
// Los ids empiezan en 101 para que no se confundan con el id de quien inició sesión
const usuariosFalsos = [
    { id: 101, nombre: "Lucía", apellido: "Gómez" },
    { id: 102, nombre: "Martín", apellido: "Pérez" },
    { id: 103, nombre: "Sofía", apellido: "Ruiz" },
    { id: 104, nombre: "Diego", apellido: "Fernández" },
    { id: 105, nombre: "Camila", apellido: "Torres" },
    { id: 106, nombre: "Nicolás", apellido: "Vega" }
];

// Los que pueden ser líder además de quien inició sesión (jefes o administradores)
const lideresFalsos = [
    { id: 102, nombre: "Martín", apellido: "Pérez" }
];

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

    content.innerHTML = createEquipoTemplate({
        usuario,
        usuarios: usuariosFalsos,
        lideres: [usuario, ...lideresFalsos]
    });

    iniciarBuscador(content);
    iniciarChips(content);
    iniciarEnvio(content);
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

// Al crear el equipo, junta los datos usando ids y no nombres.
// Por ahora solo los muestra en la consola; después acá va el fetch a PHP
function iniciarEnvio(container) {
    const form = container.querySelector("#formCreateEquipo");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = new FormData(form);

        const equipo = {
            nombre: datos.get("nombre").trim(),
            descripcion: datos.get("descripcion").trim(),
            id_lider: datos.get("id_lider"),
            integrantes: datos.getAll("integrantes")
        };

        if (!equipo.nombre) {
            alert("Ingresá un nombre para el equipo.");
            return;
        }

        console.log("Equipo a crear (por id):", equipo);
        alert("Equipo de prueba listo. Mirá la consola (F12) para ver los datos.");
    });
}