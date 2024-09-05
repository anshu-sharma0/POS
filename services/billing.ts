import { BillPrintPayloadType, createBillingType } from "../types";
import axiosInterceptorInstance from "./instance";

const createBilling = (payload: createBillingType) => {
  return axiosInterceptorInstance.post("/billing", payload);
};

const fetchBillings = () => {
  return axiosInterceptorInstance.get("/billing").then((res) => res.data);
};

const sales = () => {
  return axiosInterceptorInstance.get("/billing/sale").then((res) => res.data);
};
const fetchUnsettledBills = () => {
  return axiosInterceptorInstance
    .get("/billing?status=UNSETTLED")
    .then((res) => res.data);
};
const fetchSettledBills = () => {
  return axiosInterceptorInstance
    .get("/billing?status=SETTLED")
    .then((res) => res.data);
};

const getBillingForTableCode = (tableCode: string, type = "UNSETTLED") => {
  return axiosInterceptorInstance
    .get(`/billing/table-code/${tableCode}?status=${type}`)
    .then((res) => res.data);
};

const updateBilling = (payload: {
  id: string;
  subTotal: number;
  billReason: string;
  billClosedBy: string;
  status: string;
}) => {
  const { id, ...rest } = payload;
  return axiosInterceptorInstance.patch(`/billing/${id}`, rest);
};

const generateBillReciept = (payload: BillPrintPayloadType) => {
  const { id, ...rest } = payload;
  return axiosInterceptorInstance.post(`/billing/print/${id}`, rest);
};

const generateBillSettlement = (payload: BillPrintPayloadType) => {
  const { id, ...rest } = payload;
  return axiosInterceptorInstance.patch(`/billing/${id}`, rest);
};
const reprintBill = (payload: any) => {
  return axiosInterceptorInstance.post("/billing/rePrintBill", payload);
};

const tableShift = (payload: any) => {
  return axiosInterceptorInstance.post("/billing/shift", payload);
};
const shiftTableItem = (payload: any) => {
  return axiosInterceptorInstance.post("/billing/shiftItem", payload);
};
export {
  createBilling,
  fetchBillings,
  getBillingForTableCode,
  generateBillReciept,
  updateBilling,
  generateBillSettlement,
  fetchUnsettledBills,
  fetchSettledBills,
  reprintBill,
  tableShift,
  shiftTableItem,
  sales,
};
