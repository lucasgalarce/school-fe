import axios from "axios";
import { config } from "./config";

const instance = axios.create({
  baseURL: config.apiHost,
});

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common.Accept = "application/json";

export const setAuthHeader = (token: string) => {
  //@ts-ignore
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  //@ts-ignore
  delete instance.defaults.headers.Authorization;
};

export { instance };
