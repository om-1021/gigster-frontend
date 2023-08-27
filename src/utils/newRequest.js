import axios from "axios";
import { BASE_URL } from "../helper";
import { config, parse } from "dotenv";
const url = BASE_URL;

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(user);
    const token = parsedUser.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
