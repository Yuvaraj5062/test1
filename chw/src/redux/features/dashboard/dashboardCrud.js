import config from '../../../config/config'

import axios from "axios";
import { encrypt } from '../../../config/crypto/CryptoAES';


export function getAppointments(parameters) {
  return axios.get(config.default.getDashboardDataURl, { params: { DoctorId: parameters.DoctorId, AppointmentStatus: parameters.AppointmentStatus, PageNumber: parameters.PageNumber, PageSize: parameters.PageSize, IsAscending: parameters.IsAscending } });
}
//change status

export function changeStatus(payload, header) {
  //const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  // return axios.post(config.default.addPatient, payload, header);

  return axios.post(config.default.changePatientStatus, { data: encrypt(payload) });
}


export function deleteAppointment(payload, header) {
  return axios.post(`${config.default.deleteAppointment}?AppointmentId=${payload.AppointmentId}&UpdatedBy${payload.UpdatedBy}`)
}

export function pdfRequest(payload, header) {
  return axios.get(`${config.default.openpdfurl}?AilmentId=${payload}`)
}

