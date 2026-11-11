import { homeTemplate } from "../../templates/home/homeTemplate.js";

export function renderHome(container) {
  container.innerHTML = homeTemplate();
}
