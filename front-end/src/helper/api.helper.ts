import axios from "axios";
import { API_CONFIG } from "../config";
import { LOCAL_STORAGE } from "./storage.helper";

export const axiosInstance = () => {
   const accessToken = LOCAL_STORAGE.getAccessToken();

   const instance = axios.create({
      baseURL: API_CONFIG.API_URL,
      withCredentials: true,
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
      },
   });

   instance.interceptors.response.use(
      (response) => {
         return response.data ? response.data : response;
      },
      async (error) => {
         const originalRequest: any = error.config;
         const REFRESH_URL = "auth/refresh";
         const LOGIN_URL = "auth/login";

         // refresh token
         if (
            error?.response?.status === 401 &&
            error?.config?.url !== REFRESH_URL &&
            error?.config?.url !== LOGIN_URL &&
            (!error?.config?.retryCount || error?.config?.retryCount < 2)
         ) {
            const refreshToken = LOCAL_STORAGE.getRefreshToken();
            if (!error.config?.retryCount) error.config.retryCount = 0;
            error.config.retryCount++;

            try {
               const res: any = await instance.get(REFRESH_URL, {
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${refreshToken}`,
                  },
               });
               const accessToken = res?.data?.accessToken;
               LOCAL_STORAGE.setAccessToken(accessToken);

               originalRequest.headers = {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
               };
               originalRequest._retry = true;

               return instance(originalRequest);
            } catch (err) {
               originalRequest._retry = false;
               LOCAL_STORAGE.removeAccessToken();
               LOCAL_STORAGE.removeRefreshToken();
               LOCAL_STORAGE.removeUser();
            }
         }
         const getMessage: any = {
            500: "Internal Server Error",
            404: "Sorry! the data you are looking for could not be found",
         };
         const message =
            error?.response?.data?.message || // error from data response
            error?.message || // error message
            getMessage[error?.response?.status || error?.status] || // default message with status
            error; // error
         return Promise.reject({
            status: error?.response?.status || error?.status || 500,
            message,
         });
      }
   );
   return instance;
};
