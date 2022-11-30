
import axios from "axios";
import config from '../../../config/config'
import { encrypt } from "../../../config/crypto/CryptoAES";
export function addAppointments(payload, header) {
  //const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  return axios.post(config.default.addAppointment, {data:encrypt(payload)}, header);
}

export function getPatientDetailById(id) {
  
  return axios.get(config.default.getPatientDetailById, { params: {AilmentId: id } });
}

export function getDoctors(name) {
  return axios.get(config.default.getAllDoctors, { params: { FirstName:name } });
}

export function getPatientDetailByName(patientId) {
  return axios.get(config.default.getPatientByFirstName, { params: { patientId:patientId } });
}

export function getSummaryList(id) {
  
  return axios.get(config.default.getSummaryReprot, { params: {AilmentId: id } });
}