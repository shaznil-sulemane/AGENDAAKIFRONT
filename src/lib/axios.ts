// src/lib/aalibaxios.ts
import axios from "axios";
import SecureLS from "secure-ls";

// const API_BASE_URL = "https://api.krypthon.com";

const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = "http://172.16.1.100:4000/";
// const API_BASE_URL = "http://localhost:4000";

const ls = new SecureLS({ encodingType: "aes" });

// Cria instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição: adiciona token seguro
api.interceptors.request.use(
  (config) => {
    const user = ls.get("auth");
    if (user && config.headers) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: trata erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Logout seguro
        ls.remove("token");
        ls.remove("auth");
        window.location.href = "/login";
      }

      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export { api };
export { ls };