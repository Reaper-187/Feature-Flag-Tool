import axios from "axios";

// eigene axios-instanz für deine api
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_STATIC,
  withCredentials: true,
});

// der interceptor setzt den Auth-Header automatisch hinzu beim Abfragen
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  // Wenn Token existiert => füge ihn in den Auth-Header ein
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// wird bei JEDEM Response ob nun ok oder nok ausgeführt
api.interceptors.response.use(
  (response) => response, // wenn ok dann einfach weiter
  async (error) => {
    // der gecallte req wird gespeichert
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // markiert den req als wiederholt an damit kein loop entsteht
      originalRequest._retry = true;

      // call muss mit axios passiere weil wenn api.get mache => interceptor wird immer wieder neu gecallt === loop
      const res = await axios.get("/refresh-token", {
        baseURL: import.meta.env.VITE_API_STATIC,
        withCredentials: true,
      });

      const newToken = res.data.accessToken;

      localStorage.setItem("accessToken", newToken);

      // Setzt den neuen Token in den req der gespeichert wurde
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      // callt den gespeicherten Request erneut (nur jetzt mit neuem Token)
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);
