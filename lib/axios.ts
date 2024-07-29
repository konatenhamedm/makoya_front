import axios from "axios";

/* export const BASE_URL = "http://makoya.youskil.com/api";
export const BASE_SITE = "http://makoya.youskil.com/uploads/";
export const BASE_URL_AUTH = "http://makoya.youskil.com/api";
const BASE_URL1 = "http://makoya.youskil.com/api"; */
export const BASE_URL = "http://127.0.0.1:8000/api";
export const BASE_URL_AUTH = "http://makoya.youskil.com/api";
export const BASE_SITE = "http://127.0.0.1:8000/uploads/";
const BASE_URL1 = "http://127.0.0.1:8000/api";

export default axios.create({
  baseURL: BASE_URL,
  //headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  //headers: { "Content-Type": "application/json" },
});
export const axiosAuthapi = axios.create({
  baseURL: BASE_URL1,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuthapiFormdata = axios.create({
  baseURL: BASE_URL1,
  headers: {
    'Content-Type': 'multipart/form-data',
    //'Access-Control-Allow-Origin':'*'
}
});
