import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";

// Discriminated union for automatic type narrowing
export type CustomAxiosResponse<TSuccess = unknown, TError = unknown> =
  | (AxiosResponse<TSuccess> & { success: true })
  | (AxiosResponse<TError> & { success: false });

// Extend AxiosRequestConfig to track retries
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Strongly typed Axios instance
type CustomAxiosInstance = {
  get<TSuccess = unknown, TError = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  delete<TSuccess = unknown, TError = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  head<TSuccess = unknown, TError = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  options<TSuccess = unknown, TError = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  post<TSuccess = unknown, TError = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  put<TSuccess = unknown, TError = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
  patch<TSuccess = unknown, TError = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<CustomAxiosResponse<TSuccess, TError>>;
} & AxiosInstance;

// Refresh token function (cookie-based, no token handling needed on FE)
async function refreshToken() {
  return api.post(API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);
}

// Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // Treat 401 as error so it hits the interceptor
  validateStatus: (status) => status <= 500 && status !== 401,
}) as CustomAxiosInstance;

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const success = response.status >= 200 && response.status < 400;
    return { ...response, success };
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken(); // cookies updated automatically
        return api(originalRequest); // retry original request
      } catch (err) {
        return Promise.reject(err); // refresh failed → log out
      }
    }

    return Promise.reject(error);
  }
);
