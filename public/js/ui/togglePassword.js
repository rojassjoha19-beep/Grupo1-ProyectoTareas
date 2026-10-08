/**
 * Inicializa el toggle de contraseña delimitado al contenedor del formulario activo.
 * @param {HTMLElement} containerElement - El contenedor (ej: #formRegister, #formLogin)
 */
export const initPasswordToggle = (containerElement) => {
  if (!containerElement) return;

  containerElement.addEventListener("click", (e) => {
    const button = e.target.closest(".btn-toggle-password");
    if (!button) return;

    e.preventDefault();

    const group = button.closest(".input-group");
    if (!group) return;

    const input = group.querySelector("input");
    const icon = button.querySelector("i");

    if (input) {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      if (icon) {
        icon.classList.toggle("bi-eye", !isPassword);
        icon.classList.toggle("bi-eye-slash", isPassword);
      }
    }
  });
};
