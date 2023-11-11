import { ENDPOINT, TOKEN } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    toast.error(err.response.data.msg, { autoClose: 1000 });

    return Promise.reject(err);
  }
);

export default request;
