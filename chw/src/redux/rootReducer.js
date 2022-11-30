
import { combineReducers } from "redux";
import * as auth from './features/auth/authRedux'
import Patient from './features/patients/reducers';
import Appointments from './features/appointments/reducers'
import Common from './features/common/reducers'
import Dashboard from './features/dashboard/reducers'
import Physicians from './features/physicians/reducers'
export const rootReducer = combineReducers({
    auth: auth.reducer,
    Patient,
    Appointments,
    Common,
    Dashboard,
    Physicians

});


