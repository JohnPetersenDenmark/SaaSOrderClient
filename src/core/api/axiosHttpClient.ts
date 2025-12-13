import axios from "axios";
import type { AxiosInstance } from "axios"; // ✅ imported as a type

import { useConfig } from "../../config";

let axiosHttpClient: AxiosInstance | null = null;

/**
 * Initialize Axios instance based on current tenant config.
 * Must be called after config is loaded (e.g., from useConfig).
 */
export const initAxiosClient = () => {
  
  const { config } = useConfig();

  if (!config?.apiBaseUrl) {
    throw new Error("Tenant is not set. API base URL is missing in config.");
  }

  // Create Axios instance once
  axiosHttpClient = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(config.id + 'authToken') ? `Bearer ${localStorage.getItem(config.id + 'authToken')}` : undefined,
    },
  });

  // Request interceptor
  axiosHttpClient.interceptors.request.use(
    (request) => {
      // You can dynamically add/update headers here if needed
      const token = localStorage.getItem(config.id + 'authToken') // or from localStorage if needed
      if (token) request.headers.Authorization = `Bearer ${token}`;

      // Optional logging
      console.log(`[Request] ${request.method?.toUpperCase()} ${request.url}`);
      return request;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosHttpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        console.error(
          `[API Error] Status: ${error.response.status}`,
          error.response.data
        );
        if (error.response.status === 401) {
          console.warn("Unauthorized! Redirect or refresh token.");
        }
      } else {
        console.error("[Network Error]", error);
      }
      return Promise.reject(error);
    }
  );
};

/**
 * Get the Axios instance
 */
const getClient = (): AxiosInstance => {
  if (!axiosHttpClient) {
    throw new Error("Axios client not initialized. Call initAxiosClient first.");
  }
  return axiosHttpClient;
};

/**
 * CRUD helper methods
 */
export const get = (url: string, params?: any) => getClient().get(url, { params });
export const post = (url: string, data?: any) => getClient().post(url, data);
export const put = (url: string, data?: any) => getClient().put(url, data);
export const remove = (url: string) => getClient().delete(url);
