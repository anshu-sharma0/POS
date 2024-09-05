import axiosInterceptorInstance from "./instance";

const userLogin = (payload: { email: string; password: string }) => {
  return axiosInterceptorInstance.post("/auth/login", payload);
};

const fetchTables = () => {
  return axiosInterceptorInstance.get("/tables");
};

const fetchCategory = () => {
  return axiosInterceptorInstance.get("/category").then((res) => res.data);
};

export { userLogin, fetchTables, fetchCategory };
