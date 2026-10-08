import { httpClient } from "../utils/httpClient.js";

export const authService = {
  checkSession: async () => {
    return await httpClient("/api/auth/check-session");
  },

  login: async (credentials) => {
    return await httpClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (data) => {
    return await httpClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resetPassword: async (email) => {
    return await httpClient("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  updatePassword: async (data) => {
    return await httpClient("/api/auth/update-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    return await httpClient("/api/auth/logout", {
      method: "POST",
    });
  },
};
