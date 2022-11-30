import axios from "axios";
import { store } from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.199:8854/",
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  console.log(state);
  config.params = config.params || {};
  config.params["auth"] = "sjdjweh";
  console.log(config);
  return config;
});

export default axiosInstance;