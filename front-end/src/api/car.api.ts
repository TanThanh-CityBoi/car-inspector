import { axiosInstance } from "helper/axios.helper";

export const carAPI = {
   getList,
   getOne,
   getCriteria,
   createInspection,
   getInspectResult,
   getInspectHistory,
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

function getInspectResult(inspectCode: string) {
   const url = `cars/inspect-result/${inspectCode}`;
   return axiosInstance().get(url);
}

function getInspectHistory(query: any) {
   const url = `cars/inspect-history`;
   return axiosInstance().get(url, { params: query });
}