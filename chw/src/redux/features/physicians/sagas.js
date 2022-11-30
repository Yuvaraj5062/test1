import { fork, takeEvery, call, put, all } from "redux-saga/effects";

import * as api from "./physiciansCrud";
import * as actions from "./actions";
import {
  GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
  POST_INPROGRESS_PROBLEM_DIAGNOSIS,
  ADD_UPDATE_MEDICATION,
  GET_MEDICATION_DETAIL_LIST_REQUEST,
  GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  GET_DIAGNOSIS_LIST_REQUEST,
  DELETE_MEDICATION
} from "./constants";

function* getInprogressDataById(action) {
  try {
    const response = yield call(api.getInprogressDataByName, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.setInprogressData(response.data));
      } else {
        yield put(actions.setInprogressData([]));
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}

function* getAllProblemDiagnosisData(action) {
  try {
    const response = yield call(api.getAllProblemDiagnosisInfo, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.getAllProblemDiagnosis(response.data));
      } else {
        yield put(actions.getAllProblemDiagnosis([]));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* postInprogressproblemdiagnosis(action) {
  try {
    const result = yield call(
      api.postInprogressProblemdiagnosis,
      action.payload
    );
    console.log("result", result)
    if (result) {
      yield put(actions.setInprogressProblemDiagnosisMessage(result && result));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.setInprogressProblemDiagnosisMessage("Something went wrong"));
  }
}

function* setMedication(action) {
  try {
    const response = yield call(api.setMedication, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.setaddUpadteMedication(response));
        //response.data.data
      } else {
        yield put(actions.setaddUpadteMedication(response));
      }
    }
  } catch (error) {
    console.log(error);
  }
}



function* getMedicationDetail(action) {
  try {
    const response = yield call(api.getMedicationDetail, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.setMedicationDetail(response.data));
      } else {
        yield put(actions.setMedicationDetail([]));
        yield put(actions.setMedictionMessages(response && response.message));
      }
    }
  } catch (error) {
    yield put(actions.setMedictionMessages("something went wrong"));
    console.log(error);
  }
}

function* getPhysiciansDescriptionList(action) {
  try {
    const response = yield call(api.getAllPhysiciansDetail, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.setPhysiciansDescriptionList(response.data));
      }
    }
    else {
      yield put(actions.setPhysiciansDescriptionList([]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getDiagnosisDescriptionList(action) {
  try {
    const response = yield call(api.getAllDiagnosisDetail, action.payload);
    if (response) {
      if (response.data && response.statusCode === 200) {
        yield put(actions.setDiagnosisList(response.data));
      }
    }
    else {
      yield put(actions.setDiagnosisList([]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteMedication(action) {
  try {
    const response = yield call(api.deleteMedication, action.payload);
    if (response) {

      // yield put(actions.setDashboardMessages(response?response.data.message:'Something went wrong'))

    }
  } catch (error) {
    console.log(error);
  }
}




function* watchpostProblemDiagnosis() {
  yield takeEvery(
    POST_INPROGRESS_PROBLEM_DIAGNOSIS,
    postInprogressproblemdiagnosis
  );
}

function* watchgetInprogressDataRequest() {
  yield takeEvery(
    GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
    getInprogressDataById
  );
}

function* watchgetMedicationDataRequest() {
  yield takeEvery(GET_MEDICATION_DETAIL_LIST_REQUEST, getMedicationDetail);
}

function* watchaddUpdateMedication() {
  yield takeEvery(ADD_UPDATE_MEDICATION, setMedication);
}
function* watchgetInprogressProblemDiagnosis() {
  yield takeEvery(
    GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
    getAllProblemDiagnosisData
  );
}

function* watchgetPhysiciansRequest() {
  yield takeEvery(GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST, getPhysiciansDescriptionList);
}
function* watchgetDiagnosisRequest() {
  yield takeEvery(GET_DIAGNOSIS_LIST_REQUEST, getDiagnosisDescriptionList);
}
function* watchDeleteMedicationRequest() {
  yield takeEvery(DELETE_MEDICATION, handleDeleteMedication);
}
function* physiciansSagas() {
  yield all([
    fork(watchgetInprogressDataRequest),
    fork(watchgetMedicationDataRequest),
    fork(watchpostProblemDiagnosis),
    fork(watchaddUpdateMedication),
    fork(watchgetInprogressProblemDiagnosis),
    fork(watchgetPhysiciansRequest),
    fork(watchgetDiagnosisRequest),
    fork(watchDeleteMedicationRequest)
  ]);
}

export default physiciansSagas;
