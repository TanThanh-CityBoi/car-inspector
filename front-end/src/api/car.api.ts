import { axiosInstance } from "helper/axios.helper";

export const carAPI = {
   getList,
   getOne,
   getCriteria,
   createInspection,
};

function getList(query: any) {
   const url = "cars/get-list";
   return axiosInstance().get(url, { params: query });
}

function getOne(sku: string) {
   const url = `cars/detail/${sku}`;
   return axiosInstance().get(url);
}

function getCriteria() {
   const url = "cars/get-criteria";
   return axiosInstance().get(url);
}

function createInspection(data: any) {
   const url = "cars/create-inspection";
   return axiosInstance().post(url, data);
}
