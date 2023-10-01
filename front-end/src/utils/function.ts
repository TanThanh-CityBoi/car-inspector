import jwtDecode from "jwt-decode";
import { _cookies } from "helper/cookies.helper";

export const toSlug = (str: string) => {
   // Chuyển hết sang chữ thường
   str = str.toLowerCase();

   // xóa dấu
   str = str
      .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

   // Thay ký tự đĐ
   str = str.replace(/[đĐ]/g, "d");

   // Xóa ký tự đặc biệt
   str = str.replace(/([^0-9a-z-\s])/g, "");

   // Xóa khoảng trắng thay bằng ký tự -
   str = str.replace(/(\s+)/g, "-");

   // Xóa ký tự - liên tiếp
   str = str.replace(/-+/g, "-");

   // xóa phần dư - ở đầu & cuối
   str = str.replace(/^-+|-+$/g, "");

   // return
   return str;
};

export const validateJson = (text: string) => {
   return /^[\],:{}\s]*$/.test(
      text
         .replace(/\\["\\\/bfnrtu]/g, "@")
         .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
   );
};

export const checkAuth = () => {
   const accessToken = _cookies.getAccessToken();
   if (!accessToken) return null;

   const decodedToken: any = jwtDecode(accessToken);
   const expirationTime = decodedToken.exp;
   const currentTime = Math.floor(Date.now() / 1000);

   if (expirationTime < currentTime) {
      _cookies.removeAccessToken();
      return null;
   }
   //
   return decodedToken;
};
