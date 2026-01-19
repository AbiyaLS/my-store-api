import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6001",
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    // ❌ Ignore auth-check endpoint
    const isAuthCheck = requestUrl?.includes("/auth/me");

    if ((status === 401 || status === 403) && !isAuthCheck) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
