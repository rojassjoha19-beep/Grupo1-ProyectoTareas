
import { httpClient } from "../utils/httpClient.js";

export const tareaService = {
    async getEstados() {
        return await httpClient("/api/estados");
    },

    async getAll(statusId = 0) {
        if (statusId > 0) {
            return await httpClient(`/api/tareas/estado/${statusId}`);
        }

        return await httpClient("/api/tareas");
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

