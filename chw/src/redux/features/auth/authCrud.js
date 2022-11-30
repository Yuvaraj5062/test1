import axios from "axios";
import config from "../../../config/config";


export function login( payload,header) {
   return axios.post (config.default.login, {data:payload},header)
   //return axios.post (config.default.login, payload,header)
}

