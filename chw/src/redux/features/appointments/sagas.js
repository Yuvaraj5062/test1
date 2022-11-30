import { fork, takeEvery, call, put, all } from 'redux-saga/effects';

import * as api from './appointmentsCrud';
import * as actions from './actions';
import {
    GET_PATIENT_DETAIL_REQUEST,
    ADD_APPOINTMENTS,
    GET_DOCTORNAMES_LIST_REQUEST,
    GET_PATIENT_DETAIL_BY_NAME_REQUEST,
    GET_SUMMARY_LIST_REQUEST
} from './constants'


function* getPatientDetail(action) {
    try {
        const response = yield call(api.getPatientDetailById, action.payload);
        if (response.data && response.statusCode===200) {
            yield put(actions.getPatientDetail(response.data));
            //console.log(response.data, "Require saga working")
        }
        else {
            yield put(actions.getPatientDetail([]));
        }
    } catch (error) {
        console.log(error);
    }
}


function* getDoctorNamesList() {
    try {
        const response = yield call(api.getDoctors);
        if (response.data && response.statusCode===200 ) {
            yield put(actions.getDoctorNames(response.data));
            //console.log(response.data, "Require saga working")
        }
        else {
            yield put(actions.getDoctorNames([]));
        }
    } catch (error) {
        console.log(error);
    }
}

function* getPatientDetailPatientId(action) {

    try {
        const response = yield call(api.getPatientDetailByName, action.payload);
        if (response.data && response.statusCode===200 ) {
            yield put(actions.getPatientDetail(response.data));
            //console.log(response.data, "Require saga working")
        }
        else {
            yield put(actions.getPatientDetail([]));
        }
    } catch (error) {
        console.log(error);
    }
}

function* setAppointments(action) {
    try {
        const result = yield call(api.addAppointments, action.payload);
        if(result){
        yield put(actions.setAppointmentsRquest(result));
        }
        else{
            yield put(actions.setAppointmentsMessages());
        }
    } catch (error) {
        console.log("error",error);
        yield put(actions.setAppointmentsMessages());
    }
}

function* getSummaryDetail(action) {
    try {
        const response = yield call(api.getSummaryList, action.payload);
        if (response.data && response.statusCode===200) {
            yield put(actions.setSummaryList(response.data));
        }
        else {
            yield put(actions.setSummaryList(null));
            yield put(actions.setAppointmentMessages(response&&response.message));
      
        }
    } catch (error) {
        console.log(error);
        yield put(actions.setAppointmentMessages("something went wrong"));
      
    }
}




function* watchgetPatientDetailRequest() {
    yield takeEvery(GET_PATIENT_DETAIL_REQUEST, getPatientDetail);
}

function* watchgetDoctorNamesRequest() {
    yield takeEvery(GET_DOCTORNAMES_LIST_REQUEST, getDoctorNamesList);
} 
function* watchgetPatientDetailByNameRequest() {
    yield takeEvery(GET_PATIENT_DETAIL_BY_NAME_REQUEST, getPatientDetailPatientId);
}
function* watchsetAppointmentsRequest() {
    yield takeEvery(ADD_APPOINTMENTS, setAppointments);
}
function* watchgetSummaryDetailRequest() {
    yield takeEvery(GET_SUMMARY_LIST_REQUEST, getSummaryDetail);
}
function* appointmentsSagas() {
    yield all([
        fork(watchgetPatientDetailRequest),
        fork(watchsetAppointmentsRequest),
        fork(watchgetDoctorNamesRequest),
        fork(watchgetPatientDetailByNameRequest),
        fork(watchgetSummaryDetailRequest)
    ]);
}

export default appointmentsSagas;
