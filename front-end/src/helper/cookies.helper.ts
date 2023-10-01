import Cookies from "universal-cookie";
const cookies = new Cookies({ path: "/" });

const STORAGE_KEY = {
   ACCESS_TOKEN: "access_token",
   REFRESH_TOKEN: "refresh_token",
};

export const _cookies = {
   getAccessToken: () => cookies.get(STORAGE_KEY.ACCESS_TOKEN),
   setAccessToken: (token: string) =>
      cookies.set(STORAGE_KEY.ACCESS_TOKEN, token, {
         path: "/",
         expires: new Date(Date.now() + 2592000),
      }),
   removeAccessToken: () => cookies.remove(STORAGE_KEY.ACCESS_TOKEN),

   getRefreshToken: () => cookies.get(STORAGE_KEY.REFRESH_TOKEN),
   setRefreshToken: (token: string) =>
      cookies.set(STORAGE_KEY.REFRESH_TOKEN, token, {
         path: "/",
         expires: new Date(Date.now() + 2592000),
      }),
   removeRefreshToken: () => cookies.remove(STORAGE_KEY.REFRESH_TOKEN),
};
