import { fork, takeEvery, call, put, all } from 'redux-saga/effects';

import * as api from './patientCrud';
import * as actions from './actions';
import {
    GET_SYMPTOMS_LIST_REQUEST,
    ADD_PATIENT,
    GET_FIRSTNAMES_LIST_REQUEST,
    GET_LASTNAMES_LIST_REQUEST
} from './constants'


function* getSymptomsList(action) {
    try {
        const response = yield call(api.getAllSymptoms, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.getSymptoms(response.data));
            }
        }
        else {
            yield put(actions.getSymptoms([]));
        }
    } catch (error) {
        console.log(error);
    }
}

function* getFirstNamesList(action) {
    try {
        const response = yield call(api.getSearchFirstNames, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                // console.log("why",response.data.data)
                yield put(actions.getFirstNames(response.data));

            }
            else {
                yield put(actions.getFirstNames([]));
            }
        }
        else {
            yield put(actions.getFirstNames([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.getFirstNames([]));
    }
}

function* getLastNamesList(action) {
    try {
        const response = yield call(api.getSearchLastNames, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.getLastNames(response.data));
                //console.log(response.data, "Require saga working")
            }
        }
        else {
            yield put(actions.getLastNames([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.getLastNames([]));
    }
}

function* setPatient(action) {
    try {
        const result = yield call(api.addPatient, action.payload);
        if (result) {
            yield put(actions.setPatientRequest(result));
        }
    } catch (error) {
        console.log(error);
    }
}
function* watchgetSymptomsRequest() {
    yield takeEvery(GET_SYMPTOMS_LIST_REQUEST, getSymptomsList);
}
function* watchgetFirstNamesRequest() {
    yield takeEvery(GET_FIRSTNAMES_LIST_REQUEST, getFirstNamesList);
}
function* watchgetLastNamesRequest() {
    yield takeEvery(GET_LASTNAMES_LIST_REQUEST, getLastNamesList);
}
function* watchsetPatientRequest() {
    yield takeEvery(ADD_PATIENT, setPatient);
}
function* patientSagas() {
    yield all([
        fork(watchgetSymptomsRequest),
        fork(watchsetPatientRequest),
        fork(watchgetFirstNamesRequest),
        fork(watchgetLastNamesRequest)
    ]);
}

export default patientSagas;
