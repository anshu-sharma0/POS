import { stockMasterPayloadType } from "@/types";
import axiosInterceptorInstance from "./instance";

const createProduct = (payload: stockMasterPayloadType) => {
  return axiosInterceptorInstance.post("/products", payload);
};

const fetchProducts = () => {
  return axiosInterceptorInstance.get("/products");
};

const updateProduct = (payload: stockMasterPayloadType) => {
  const { productId, ...data } = payload;
  return axiosInterceptorInstance.patch(`/products/${productId}`, data);
};

const createBulkProduct = (payload: stockMasterPayloadType) => {
  return axiosInterceptorInstance.post("/products/bulk-upload", payload);
};

const deleteProduct = (id: string) => {
  return axiosInterceptorInstance.patch(`/products/delete/${id}`);
};

export {
  createBulkProduct,
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
};
