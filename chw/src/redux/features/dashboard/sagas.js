import { fork, takeEvery, call, put, all } from 'redux-saga/effects';

import * as api from './dashboardCrud';
import * as actions from './actions';
import {
    GET_SCHEDULED_LIST_REQUEST,
    GET_INPROGRESS_LIST_REQUEST,
    GET_COMPLETED_LIST_REQUEST,
    GET_PAST_LIST_REQUEST,
    CHANGE_STATUS,
    DELETE_APPOINTMENT,
    OPEN_PDF
} from './constants';

function* getScheduleList(action) {
    try {
        const response = yield call(api.getAppointments, action.payload);
        if (response) {
            if (response.data && response.statusCode===200) {
                yield put(actions.setScheduled(response.data));
            }
        }
        else {
            yield put(actions.setScheduled(null));
        }
        
        yield put(actions.setDashboardMessages(response ? response.message : 'Something went wrong'))
    } catch (error) {
        // console.log("catch", error);
        yield put(actions.setDashboardMessages('Something went wrong'))
    }
}

function* getInProgressList(action) {
    try {
        const response = yield call(api.getAppointments, action.payload);
        if (response) {
            if (response.data && response.statusCode===200) {
                yield put(actions.setInProgressList(response.data));
            }
        }
        else {
            yield put(actions.setInProgressList([]));
        }
        yield put(actions.setDashboardMessages(response ? response.message : 'Something went wrong'))
    } catch (error) {
        console.log(error);
    }
}

function* getCompletedList(action) {
    try {
        const response = yield call(api.getAppointments, action.payload);
        if (response) {
            if (response.data && response.statusCode===200) {
                yield put(actions.setCompletedList(response.data));
            }
        }
        else {
            yield put(actions.setCompletedList([]));
        }
        yield put(actions.setDashboardMessages(response ? response.message : 'Something went wrong'))

    } catch (error) {
        console.log(error);
    }
}

function* getPastList(action) {
    try {
        const response = yield call(api.getAppointments, action.payload);
        if (response) {
            if (response.data && response.statusCode===200) {
                yield put(actions.setPastList(response.data));
            }
        }
        else {
            yield put(actions.setPastList([]));
        }
        yield put(actions.setDashboardMessages(response ? response.message : 'Something went wrong'))

    } catch (error) {
        console.log(error);
    }
}

function* setChangeStatus(action) {
    try {
        const result = yield call(api.changeStatus, action.payload);
        if (result) {
            // yield put(actions.setPatientRequest(result.data));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleDeleteAppointment(action) {
    try {
        const response = yield call(api.deleteAppointment, action.payload);
        if (response) {
            yield put(actions.setDashboardMessages(response ? response.message : 'Something went wrong'))

        }
    } catch (error) {
        console.log(error);

    }
}

function* handlePdf(action) {

    try {
        const response = yield call(api.pdfRequest, action.payload);
        if (response) {
            if(response.data && response.statusCode===200){
             yield put(actions.setPdf(response.data ))
            }

        }
    } catch (error) {
        console.log(error);

    }
}


function* watchgetScheduledRequest() {
    yield takeEvery(GET_SCHEDULED_LIST_REQUEST, getScheduleList);
}

function* watchgetInProgressRequest() {
    yield takeEvery(GET_INPROGRESS_LIST_REQUEST, getInProgressList);
}

function* watchgetCompletedRequest() {
    yield takeEvery(GET_COMPLETED_LIST_REQUEST, getCompletedList);
}

function* watchgetPastRequest() {
    yield takeEvery(GET_PAST_LIST_REQUEST, getPastList);
}

function* watchchangeStatusRequest() {
    yield takeEvery(CHANGE_STATUS, setChangeStatus);
}
function* watchDeleteRequest() {
    yield takeEvery(DELETE_APPOINTMENT, handleDeleteAppointment);
}
function* watchPdfRequest() {
    yield takeEvery(OPEN_PDF, handlePdf);
}

function* dashboardSagas() {
    yield all([
        fork(watchgetScheduledRequest),
        fork(watchgetInProgressRequest),
        fork(watchgetCompletedRequest),
        fork(watchgetPastRequest),
        fork(watchchangeStatusRequest),
        fork(watchDeleteRequest),
        fork(watchPdfRequest)


    ]);
}

export default dashboardSagas;
