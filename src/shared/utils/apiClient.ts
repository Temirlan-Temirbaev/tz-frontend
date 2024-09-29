import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const apiClient = () => {
  const headerConfig = {
    Accept: "application/json",
  };

  const instance: AxiosInstance = axios.create({
    baseURL: process.env.api_url,
    headers: {
      post: headerConfig,
      get: headerConfig,
      delete: headerConfig,
    },
  });

  instance.interceptors.request.use(
    function (config) {
      const t = localStorage.getItem("tz-token");
      if (t) {
        config.headers.Authorization = `Bearer ${t}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Ваш период сессии завершился.");
        setTimeout(() => {
          location.href = "/auth/login"
        }, 1000);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const client = apiClient();
