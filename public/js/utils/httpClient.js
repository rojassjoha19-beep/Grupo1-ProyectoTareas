import { API_BASE_URL } from "../config.js";

export const httpClient = async (endpoint, options = {}) => {
  const defaultHeaders = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };

  // Construcción de URL limpia
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Leer respuesta bruta como texto
    const rawText = await response.text();
    console.log("Respuesta RAW del Servidor:", rawText);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Intentar convertir el texto a JSON
    return JSON.parse(rawText);
  } catch (error) {
    console.error("HTTP Client Error:", error);
    throw error;
  }
};
