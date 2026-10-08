import { homeTemplate } from "../templates/homeTemplate.js";

export function renderHome(container) {
  container.innerHTML = homeTemplate();
}
