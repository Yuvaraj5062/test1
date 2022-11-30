import {
  ADD_APPOINTMENTS, GET_PATIENT_DETAIL_REQUEST,
  SET_PATIENT_DETAIL_LIST_REQUEST, ADD_APPOINTMENTS_REQUEST,
  SET_DOCTORNAMES_LIST_REQUEST, GET_DOCTORNAMES_LIST_REQUEST,
  SET_SUMMARY_LIST_REQUEST,
  GET_SUMMARY_LIST_REQUEST,
  SET_APPOINTMENT_MESSAGES_REQUEST,
  GET_PATIENT_DETAIL_BY_NAME_REQUEST, 
  SET_LASTNAMES_LIST_REQUEST,
  APPOINTMENTS_MESSAGES
} from './constants';


export const getPatientById = (id) =>
({
  type: GET_PATIENT_DETAIL_REQUEST,
  payload: id
})

export const getPatientDetail = (patientDetail) =>
({
  type: SET_PATIENT_DETAIL_LIST_REQUEST,
  payload: patientDetail
});


export const getDoctorNames = (names) =>
({
  type: SET_DOCTORNAMES_LIST_REQUEST,
  payload: names
});

export const getDoctorNamesList = () =>
({
  type: GET_DOCTORNAMES_LIST_REQUEST,
  
})

export const getLastNames = (names) =>
({
  type: SET_LASTNAMES_LIST_REQUEST,
  payload: names
});

export const getPatienByName = (name) =>
({
  type: GET_PATIENT_DETAIL_BY_NAME_REQUEST,
  payload: name
})


export const setAppointmentsMessages = (payload) => ({
  type: APPOINTMENTS_MESSAGES,
  payload:payload
});


export const setAppointments = (appointment) => ({
  type: ADD_APPOINTMENTS,
  payload: appointment
});

export const setAppointmentsRquest = (appointment) => ({
  type: ADD_APPOINTMENTS_REQUEST,
  payload: appointment
});

//summary report
export const getSummaryList = (id) =>
({
  type: GET_SUMMARY_LIST_REQUEST,
  payload: id
});

export const setSummaryList = (data) =>
({
  type: SET_SUMMARY_LIST_REQUEST,
  payload: data
  
})

export const getSummaryPdf = (id) =>
({
  type: GET_SUMMARY_LIST_REQUEST,
  payload: id
});

export const setSummaryPdf = (data) =>
({
  type: SET_SUMMARY_LIST_REQUEST,
  payload: data
  
})

export const setAppointmentMessages = (data) =>
({
  type: SET_APPOINTMENT_MESSAGES_REQUEST,
  payload: data
  
})