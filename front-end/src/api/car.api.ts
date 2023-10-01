import { axiosInstance } from "helper/axios.helper";

export const carAPI = {
   getList,
};

function getList(query: any) {
   const url = "cars/get-list";
   return axiosInstance().get(url, { params: query });
}
