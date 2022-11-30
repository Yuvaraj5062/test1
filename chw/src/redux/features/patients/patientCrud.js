
import axios from "axios";
import config from '../../../config/config'
import { encrypt } from "../../../config/crypto/CryptoAES";
export function addPatient(payload, header) {
  //const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
 
  return axios.post(config.default.addPatient, {data:encrypt(payload)}, header);
}

export function getAllSymptoms(id) {

  return axios.get(config.default.getSymptoms, { params: { SymptomId: id } });
}

export function getSearchFirstNames(name) {
  return axios.get(config.default.getSearchFirstName, { params: { FirstName:name } });
}

export function getSearchLastNames(name) {
  return axios.get(config.default.getSearchLastName, { params: { FirstName:name } });
}
