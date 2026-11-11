// En este archivo están los pedidos a PHP que tienen que ver con los equipos.
// Los hago con httpClient, que es lo mismo que usa authService.
import { httpClient } from "../utils/httpClient.js";

export const equiposService = {
    // Lista de usuarios para elegir como integrantes
  listarUsuarios: async () => {
    return await httpClient("/api/usuarios");
  },

    // Crea el equipo. Devuelve el id del equipo nuevo.
  crearEquipo: async (datos) => {
    return await httpClient("/api/equipos", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },
  // Agrega un integrante a un equipo que ya existe (solo puede el líder)
  agregarMiembro: async (idEquipo, idUsuario) => {
    return await httpClient(`/api/equipos/${idEquipo}/miembros`, {
      method: "POST",
      body: JSON.stringify({ usuario_id: Number(idUsuario) }),
    });
  },
};