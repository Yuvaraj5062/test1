import {
  GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
  POST_INPROGRESS_PROBLEM_DIAGNOSIS,
  SET_INPROGRESS_DATA_LIST_REQUEST,
  ADD_UPDATE_MEDICATION,
  ADD_UPDATE_MEDICATION_REQUEST,
  MEDICATION_MESSAGES,
  GET_MEDICATION_DETAIL_LIST_REQUEST,
  SET_MEDICATION_DETAIL_LIST_REQUEST,
  GET_ALL_PROBLEM_DIAGNOSIS,
  GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  SET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  GET_DIAGNOSIS_LIST_REQUEST,
  SET_DIAGNOSIS_LIST_REQUEST,
  SET_INPROGRESS_PROBLEM_DIAGNOSIS,CLEAR_MESSAGES,
  DELETE_MEDICATION
} from "./constants";

export const setInprogressData = (data) => ({
  type: SET_INPROGRESS_DATA_LIST_REQUEST,
  payload: data,
});

export const getInprogressDataByName = (ailmentId) => ({
  type: GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
  payload: ailmentId,
});

export const getAllProblemDiagnosis = (diagnosis) => ({
  type: GET_ALL_PROBLEM_DIAGNOSIS,
  payload: diagnosis,
});
export const postInprogressProblemDiagnosis = (name) => ({
  type: POST_INPROGRESS_PROBLEM_DIAGNOSIS,
  payload: name,
});
export const setInprogressProblemDiagnosisMessage = (name) => ({
  type: SET_INPROGRESS_PROBLEM_DIAGNOSIS,
  payload: name,
});

export const addUpadteMedication = (data) => ({
  type: ADD_UPDATE_MEDICATION,
  payload: data,
});

export const setaddUpadteMedication = (appointment) => ({
  type: ADD_UPDATE_MEDICATION_REQUEST,
  payload: appointment,
});

export const setMedictionMessages = (message) => ({
  type: MEDICATION_MESSAGES,
  payload: message,
});

export const setMedicationDetail = (data) => ({
  type: SET_MEDICATION_DETAIL_LIST_REQUEST,
  payload: data,
});

export const getMedicationDetail = (ailmentId) => ({
  type: GET_MEDICATION_DETAIL_LIST_REQUEST,
  payload: ailmentId,
});



export const getPhysiciansDescriptionList = (id) =>
({
  type: GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  payload: id
})

export const setPhysiciansDescriptionList = (data) =>
({
  type: SET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  payload: data
});

export const getDiagnosisList = (id) =>
({
  type: GET_DIAGNOSIS_LIST_REQUEST,
  payload: id
})

export const setDiagnosisList = (data) =>
({
  type: SET_DIAGNOSIS_LIST_REQUEST,
  payload: data
});

export const clearPhysicansMessages = (data) =>
({
  type: CLEAR_MESSAGES,
  payload: data
});


// delete Appointment
export const deleteMedicationRequest = (id) => ({
  type: DELETE_MEDICATION,
  payload: id
});