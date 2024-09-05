import { PayloadData, createKotType } from "@/types";
import axiosInterceptorInstance from "./instance";

const createKot = (payload: createKotType) => {
  return axiosInterceptorInstance.post("/kot", payload);
};

const fetchKots = () => {
  return axiosInterceptorInstance.get("/kot");
};
const fetchAllKots = () => {
  return axiosInterceptorInstance.get("/kot/all").then((res) => res.data);
};

const fetchKotList = (tableCode: string) => {
  return axiosInterceptorInstance
    .get(`/kot/table/${tableCode}`)
    .then((res) => res.data);
};
const fetchKotListByTableCode = (tableCode: string) => {
  return axiosInterceptorInstance
    .get(`/kot/table-kot/${tableCode}`)
    .then((res) => res.data);
};

const cancelKotItem = (payload: PayloadData) => {
  return axiosInterceptorInstance.post("/kot/cancel-kot-item", payload);
};
const reprintKot = (payload: any) => {
  return axiosInterceptorInstance.post("/kot/rePrintKot", payload);
};

export {
  createKot,
  fetchKots,
  fetchKotList,
  cancelKotItem,
  fetchAllKots,
  fetchKotListByTableCode,
  reprintKot,
};
