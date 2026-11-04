
import { httpClient } from "../utils/httpClient.js";

export const tareaService = {
    async getEstados() {
        return await httpClient("/api/estados");
    },

    async getAll(statusId = 0, fechaVencimiento = "") {
        const endpoint = statusId > 0
            ? `/api/tareas/estado/${statusId}`
            : "/api/tareas";

        const params = new URLSearchParams();
        if (fechaVencimiento) {
            params.set("fecha_vencimiento", fechaVencimiento);
        }

        const query = params.toString();
        return await httpClient(query ? `${endpoint}?${query}` : endpoint);
    },

    async getById(id) {
        return await httpClient(`/api/tareas/${id}`);
    },

    async create(data) {
        return await httpClient("/api/tareas", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async update(id, data) {
        return await httpClient(`/api/tareas/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async delete(id) {
        return await httpClient(`/api/tareas/${id}`, {
            method: "DELETE",
        });
    },
};

