import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import { API_BASE_URL } from "../constants/api";

// Discriminated union for automatic type narrowing
export type CustomAxiosResponse<TSuccess = unknown, TError = unknown> =
  | (AxiosResponse<TSuccess> & { success: true })
  | (AxiosResponse<TError> & { success: false });

// Long interface so all methods are strongly typed
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

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => status <= 500,
}) as CustomAxiosInstance;

api.interceptors.response.use(
  (response): CustomAxiosResponse<unknown, unknown> => {
    const status = response.status;
    const success = status >= 200 && status < 400;
    return { ...response, success };
  },
  (error) => Promise.reject(error)
);
