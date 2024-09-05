import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInterceptorInstance = axios.create({
  baseURL: "http://182.77.63.150:6800",
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    let accessToken: string | null = null;

    if (Platform.OS === "web") {
      accessToken = localStorage.getItem("accessToken");
    } else {
      try {
        accessToken = await AsyncStorage.getItem("accessToken");
      } catch (error) {
        console.error(
          "Error retrieving access token from AsyncStorage:",
          error
        );
      }
    }
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// End of Request interceptor
// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;
