import patientSagas from './features/patients/sagas'
import appointmentsSagas from './features/appointments/sagas'
import {all} from "redux-saga/effects";
import * as auth from './features/auth/authRedux'
import commonSagas from './features/common/sagas';
import dashboardSagas from './features/dashboard/sagas';
import physiciansSagas from './features/physicians/sagas'
export function* rootSaga(){
    //for auth
   yield all([auth.saga(),
            patientSagas(),
            commonSagas(),
            appointmentsSagas(),
            dashboardSagas(),
            physiciansSagas()
        ]); 

}