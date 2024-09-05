import { host } from "@/types";
import axiosInterceptorInstance from "./instance";

const createHost = (payload: host) => {
  return axiosInterceptorInstance.post("/host/create", payload);
};
const fetchHost = (phone: string) => {
  return axiosInterceptorInstance.get(`/host/${phone}`).then((res) => res.data);
};

const fetchHostTable = (tableCode: string) => {
  return axiosInterceptorInstance
    .get(`/host/table/${tableCode}`)
    .then((res) => res.data);
};

const updateHost = (payload: host) => {
  const { id, ...rest } = payload;
  return axiosInterceptorInstance.patch(`/host/${id}`, rest);
};

export { createHost, fetchHost, updateHost, fetchHostTable };
