import {
    ADD_APPOINTMENTS_REQUEST, GET_PATIENT_DETAIL_REQUEST, ADD_APPOINTMENTS, SET_PATIENT_DETAIL_LIST_REQUEST,
    SET_DOCTORNAMES_LIST_REQUEST, GET_DOCTORNAMES_LIST_REQUEST
    , GET_PATIENT_DETAIL_BY_NAME_REQUEST, SET_LASTNAMES_LIST_REQUEST,
    APPOINTMENTS_MESSAGES,
    SET_SUMMARY_LIST_REQUEST,
    GET_SUMMARY_LIST_REQUEST,
    SET_APPOINTMENT_MESSAGES_REQUEST
} from './constants'

const INIT_STATE = {
    patientDetail: [],
    appointments: [],
    doctorNames: [],
    patientLastNames:[],
    summaryReport:null,
    loading: false,
    message: '',
    status:''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PATIENT_DETAIL_REQUEST:
            return {
                ...state,
                message:''
               // loading: true
            };
        case SET_PATIENT_DETAIL_LIST_REQUEST:
        
            return {
                ...state,
                patientDetail: action.payload,
                status:action.payload.statusCode,
                loading: false
            };
        case GET_DOCTORNAMES_LIST_REQUEST:
            return {
                ...state,
                message:''
               // loading: true
            };
        case SET_DOCTORNAMES_LIST_REQUEST:
            
            return {
                ...state,
                doctorNames: action.payload,
               // loading: false
            };
        case GET_PATIENT_DETAIL_BY_NAME_REQUEST:
            return {
                ...state,
               // loading: true
            };
        case SET_LASTNAMES_LIST_REQUEST:
            return {
                ...state,
                patientLastNames: action.payload,
               // loading: false
            };
        case ADD_APPOINTMENTS:
            return {
                ...state,
                loading: true,
                status:''
            }
        case ADD_APPOINTMENTS_REQUEST:
            console.log("action payload",action.payload)
            return {
                ...state,
                appointments: action.payload.data,
                message: action.payload.message,
                status:action.payload.statusCode,
                loading: false
            };

            case GET_SUMMARY_LIST_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
            case SET_SUMMARY_LIST_REQUEST:
                
                return {
                    ...state,
                    summaryReport:action.payload,
                    status:action.payload.statusCode,
                    //message:action.payload.message,
                    loading: false
                };

        case APPOINTMENTS_MESSAGES:
    
            return{
                ...state,
                message: '',
                status:'',
                loading: false

            }
        
      case SET_APPOINTMENT_MESSAGES_REQUEST:

        return {
          ...state,
          loading: false,
          message:action.payload
        };
        default:
            return state;
    }
};