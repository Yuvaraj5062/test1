import {
  ADD_PATIENT,
   GET_SYMPTOMS_LIST_REQUEST,
  SET_SYMPTOMS_LIST_REQUEST, 
  ADD_PATIENT_REQUEST,
  SET_FIRSTNAMES_LIST_REQUEST,
  GET_FIRSTNAMES_LIST_REQUEST,
  GET_LASTNAMES_LIST_REQUEST,
  SET_LASTNAMES_LIST_REQUEST,
  SET_PATIENTS_MESSAGES
} from './constants';


export const getSymptomsList = (id) =>
({
  type: GET_SYMPTOMS_LIST_REQUEST,
  payload: id
})

export const getSymptoms = (symptoms) =>
({
  type: SET_SYMPTOMS_LIST_REQUEST,
  payload: symptoms
});


export const getFirstNames = (names) =>
({
  type: SET_FIRSTNAMES_LIST_REQUEST,
  payload: names
});

export const getFirstNamesList = (name) =>
({
  type: GET_FIRSTNAMES_LIST_REQUEST,
  payload: name
})

export const getLastNames = (names) =>
({
  type: SET_LASTNAMES_LIST_REQUEST,
  payload: names
});

export const getLastNamesList = (name) =>
({
  type: GET_LASTNAMES_LIST_REQUEST,
  payload: name
})

export const setPatient = (patient) => ({
  type: ADD_PATIENT,
  payload: patient
});

export const setPatientRequest = (patient) => ({
  type: ADD_PATIENT_REQUEST,
  payload: patient
});

export const setPatientsMessages = () => ({
  type: SET_PATIENTS_MESSAGES,
});