import { httpClient } from "../utils/httpClient.js";

export const equiposService = {
  listarUsuarios: async () => {
    return await httpClient("/api/usuarios");
  },

  crearEquipo: async (datos) => {
    return await httpClient("/api/equipos", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },

  agregarMiembro: async (idEquipo, idUsuario) => {
    return await httpClient(`/api/equipos/${idEquipo}/miembros`, {
      method: "POST",
      body: JSON.stringify({ usuario_id: Number(idUsuario) }),
    });
  },
};