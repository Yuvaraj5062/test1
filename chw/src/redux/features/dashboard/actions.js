import {
  GET_INPROGRESS_LIST_REQUEST,
  GET_SCHEDULED_LIST_REQUEST,
  SET_INPROGRESS_LIST_REQUEST,
  SET_SCHEDULED_LIST_REQUEST,
  GET_COMPLETED_LIST_REQUEST,
  SET_COMPLETED_LIST_REQUEST,
  GET_PAST_LIST_REQUEST,
  SET_PAST_LIST_REQUEST,
  SET_DASHBOARD_MESSAGES,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS,
  DELETE_APPOINTMENT,
  OPEN_PDF,
  SET_PDF
  

} from "./constants";

// Scheduled
export const getScheduled = (parameters) =>
({
  type: GET_SCHEDULED_LIST_REQUEST,
  payload: parameters
})

export const setScheduled = (data) =>
({
  type: SET_SCHEDULED_LIST_REQUEST,
  payload: data
});


//InProgressList

export const getInProgressList = (parameters) =>
({
  type: GET_INPROGRESS_LIST_REQUEST,
  payload: parameters
})

export const setInProgressList = (data) =>
({
  type: SET_INPROGRESS_LIST_REQUEST,
  payload: data
});

//completed 

export const getCompletedList = (parameters) =>
({
  type: GET_COMPLETED_LIST_REQUEST,
  payload: parameters
})

export const setCompletedList = (data) =>
({
  type: SET_COMPLETED_LIST_REQUEST,
  payload: data
});

//past 

export const getPastList = (parameters) =>
({
  type: GET_PAST_LIST_REQUEST,
  payload: parameters
})

export const setPastList = (data) =>
({
  type: SET_PAST_LIST_REQUEST,
  payload: data
});

//messages
export const setDashboardMessages = (messages) => ({
  type: SET_DASHBOARD_MESSAGES,
  payload: messages
});

//Status Change

export const setStatus = (status) => ({
  type: CHANGE_STATUS,
  payload: status
});

export const setStatusRequest = (data) => ({
  type: CHANGE_STATUS_REQUEST,
  payload: data
});

// delete Appointment
export const deleteAppointment = (id) => ({
  type: DELETE_APPOINTMENT,
  payload: id
});


//pdf 
export const openPdf=(id)=>({
  type:OPEN_PDF,
  payload:id
})

export const setPdf=(data)=>({
  type:SET_PDF,
  payload:data
})
