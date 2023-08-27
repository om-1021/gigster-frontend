import axios from "axios";
import { BASE_URL } from "../helper";
import { config } from "dotenv";
const url = BASE_URL;

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("currentUser");
    let flag = true;
    if (user == "null") flag = false;

    // const token = localStorage.getItem("acessToken");
    if (flag) {
      // const user = localStorage.getItem("currentUser");
      const parsedUser = JSON.parse(user);
      const token = parsedUser.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
