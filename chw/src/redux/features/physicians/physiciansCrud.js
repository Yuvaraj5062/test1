import config from "../../../config/config";

import axios from "axios";
import { encrypt } from "../../../config/crypto/CryptoAES";

export function getInprogressDataByName(AilmentId) {
  return axios.get(config.default.getInprogressDataByName, {
    params: { AilmentId: AilmentId },
  });
}
export function getAllProblemDiagnosisInfo(diagnosisId) {
  return axios.get(config.default.getAllProblem, {
    params: { diagnosisId: diagnosisId },
  });
}
export function postInprogressProblemdiagnosis(payload, header) {
  return axios.post(
    config.default.postInprogressProblemDiagnosis,
    {data:encrypt(payload)},
    header
  );
}
export function setMedication(payload, header) {
  return axios.post(config.default.addUpdateMedication, {data:encrypt(payload)}, header);
}

export function getMedicationDetail(AilmentId) {
  return axios.get(config.default.getMedicationDetailById, {
    params: { AilmentId: AilmentId },
  });
}

export function getAllPhysiciansDetail(name) {
  return axios.get(config.default.getAllProblem, { params: { ProblemName: name } });
}

export function getAllDiagnosisDetail(name) {
  return axios.get(config.default.getAllDiagnosis, { params: { DiagnosisName: name } });
}

export function deleteMedication(payload, header) {
  
 return axios.post(`${config.default.deleteMedication}?PatientMedicationId=${payload.PatientMedicationId}&DeletedBy=${payload.DeletedBy}`)
}