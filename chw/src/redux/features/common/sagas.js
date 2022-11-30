import { fork, takeEvery, call, put, all } from 'redux-saga/effects';

import * as api from './commonCrud';
import * as actions from './actions';
import {
    GET_CITY_BY_NAME_LIST_REQUEST,
    GET_CITY_LIST_REQUEST,
    GET_STATE_BY_NAME_LIST_REQUEST,
    GET_STATE_LIST_REQUEST,
    GET_MEDICATION_LIST_REQUEST,
    GET_COUNTRY_LIST_REQUEST,
    GET_COUNTRY_BY_NAME_LIST_REQUEST
} from './constants';



function* getCountryList(action) {
    try {
        const response = yield call(api.getAllCountry, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {

                yield put(actions.setCountry(response.data));
            }
        }
        else {
            yield put(actions.setCountry([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.setCountry([]));
    }
}

function* getCountryListByName(action) {
    try {
        const response = yield call(api.getCountryByName, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setCountry(response.data));
            }
            else {
                yield put(actions.setCountry([]));
            }
        }
    }
    catch (error) {
        console.log(error);
        yield put(actions.setCountry([]));
    }
}



function* getStateList(action) {
    try {
        const response = yield call(api.getAllState, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setState(response.data));
            }
        }
        else {
            yield put(actions.setState([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.setState([]));

    }
}

function* getStateListByName(action) {
    try {
        const response = yield call(api.getStateByName, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setState(response.data));
            }
            else {
                yield put(actions.setState([]));
            }
        }
    }
    catch (error) {
        console.log(error);
        yield put(actions.setState([]));
    }
}

function* getCityList(action) {
    try {

        const response = yield call(api.getAllCity, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setCity(response.data));
            }
        }
        else {
            yield put(actions.setCity([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.setCity([]));
    }
}

function* getCityListByName(action) {
    try {
        const response = yield call(api.getCityByName, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setCity(response.data));
            }
            else {
                yield put(actions.setCity([]));
            }
        }
    }
    catch (error) {
        console.log(error);
        yield put(actions.setCity([]));
    }
}


function* getMedicationList(action) {
    try {

        const response = yield call(api.getAllMedication, action.payload);
        if (response) {
            if (response.data && response.statusCode === 200) {
                yield put(actions.setMediaction(response.data));
            }
        }
        else {
            yield put(actions.setMediaction([]));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.setMediaction([]));
    }
}




function* watchgetCountryRequest() {
    yield takeEvery(GET_COUNTRY_LIST_REQUEST, getCountryList);
}
function* watchgetCountryByNameRequest() {
    yield takeEvery(GET_COUNTRY_BY_NAME_LIST_REQUEST, getCountryListByName);
}
function* watchgetStateRequest() {
    yield takeEvery(GET_STATE_LIST_REQUEST, getStateList);
}
function* watchgetStateByNameRequest() {
    yield takeEvery(GET_STATE_BY_NAME_LIST_REQUEST, getStateListByName);
}

function* watchgetCityRequest() {
    yield takeEvery(GET_CITY_LIST_REQUEST, getCityList);
}
function* watchgetCityByNameRequest() {
    yield takeEvery(GET_CITY_BY_NAME_LIST_REQUEST, getCityListByName);
}
function* watchgetMedicationRequest() {
    yield takeEvery(GET_MEDICATION_LIST_REQUEST, getMedicationList);
}

function* commonSagas() {
    yield all([
        fork(watchgetCountryRequest),
        fork(watchgetCountryByNameRequest),
        fork(watchgetStateRequest),
        fork(watchgetStateByNameRequest),
        fork(watchgetCityRequest),
        fork(watchgetCityByNameRequest),
        fork(watchgetMedicationRequest)

    ]);
}

export default commonSagas;
